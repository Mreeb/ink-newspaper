import { db } from "@/lib/services/db";
import { fetchNewsDataArticles } from "@/lib/services/news-data";
import { fetchGdeltArticles } from "@/lib/services/gdelt";
import { ImportedSourceItem, SourcePermission } from "@/lib/types";

// Known source permission rules
const SOURCE_PERMISSION_REGISTRY: Record<string, SourcePermission> = {
  "reuters.com": "metadata_only",
  "apnews.com": "metadata_only",
  "nature.com": "metadata_only",
  "ft.com": "metadata_only",
  "wikipedia.org": "public_domain",
  "wikimedia.org": "public_domain",
  "europa.eu": "public_domain",
  "un.org": "public_domain",
  "whitehouse.gov": "public_domain",
  "scamwire.com": "blocked",
  "clickbaitdaily.com": "blocked",
};

export async function runNewsDiscoveryPipeline(): Promise<{
  fetchedCount: number;
  addedCount: number;
  blockedCount: number;
}> {
  // 1. Fetch concurrently from NewsData.io and GDELT
  const [newsDataItems, gdeltItems] = await Promise.all([
    fetchNewsDataArticles(),
    fetchGdeltArticles(),
  ]);

  const rawCombined: ImportedSourceItem[] = [...newsDataItems, ...gdeltItems];

  let blockedCount = 0;
  const filteredAndNormalized: ImportedSourceItem[] = [];

  for (const item of rawCombined) {
    // Determine source permission
    const domain = extractDomain(item.url || item.sourceName);
    const permission = SOURCE_PERMISSION_REGISTRY[domain] || "metadata_only";

    if (permission === "blocked") {
      blockedCount++;
      continue;
    }

    // Deduplicate within batch by title similarity
    const isDuplicate = filteredAndNormalized.some(
      (existing) =>
        existing.url === item.url ||
        calculateTitleSimilarity(existing.title, item.title) > 0.8
    );

    if (!isDuplicate) {
      filteredAndNormalized.push({
        ...item,
        permission,
        clusterId: generateClusterId(item.title),
      });
    }
  }

  // Add to database pool
  const addedCount = db.addImportedSources(filteredAndNormalized);

  // Add audit entry
  db.addAuditLog({
    actorName: "News Pipeline Bot",
    actorEmail: "newsbot@inknewspaper.com",
    action: "FETCH_NEWS_PIPELINE",
    targetType: "source",
    targetId: `batch-${Date.now()}`,
    details: `Ingested ${filteredAndNormalized.length} discovered items (${addedCount} newly recorded, ${blockedCount} blocked).`,
  });

  return {
    fetchedCount: rawCombined.length,
    addedCount,
    blockedCount,
  };
}

function extractDomain(url: string): string {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

function calculateTitleSimilarity(a: string, b: string): number {
  const wordsA = new Set(a.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean));
  const wordsB = new Set(b.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean));
  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  const intersection = new Set([...wordsA].filter((x) => wordsB.has(x)));
  const union = new Set([...wordsA, ...wordsB]);
  return intersection.size / union.size;
}

function generateClusterId(title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 4)
    .join("-");
  return `cluster-${clean || Date.now().toString(36)}`;
}
