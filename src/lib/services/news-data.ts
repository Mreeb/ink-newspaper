import { ImportedSourceItem } from "@/lib/types";

interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  keywords?: string[];
  creator?: string[];
  description?: string;
  content?: string;
  pubDate: string;
  image_url?: string;
  source_id: string;
  source_name?: string;
  source_url?: string;
  category?: string[];
  country?: string[];
  language?: string;
}

interface NewsDataResponse {
  status: string;
  totalResults: number;
  results?: NewsDataArticle[];
}

export async function fetchNewsDataArticles(query?: string, category?: string): Promise<ImportedSourceItem[]> {
  const apiKey = process.env.NEWSDATA_API_KEY;

  if (!apiKey) {
    console.warn("NEWSDATA_API_KEY is not set. Returning curated mock news items.");
    return getFallbackNewsDataItems();
  }

  try {
    const params = new URLSearchParams({
      apikey: apiKey,
      language: "en",
    });

    if (query) params.append("q", query);
    if (category) params.append("category", category);

    const res = await fetch(`https://newsdata.io/api/1/news?${params.toString()}`, {
      method: "GET",
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.warn(`NewsData.io request failed: ${res.status} ${res.statusText}. Using fallback items.`);
      return getFallbackNewsDataItems();
    }

    const data: NewsDataResponse = await res.json();

    if (!data.results || data.results.length === 0) {
      return getFallbackNewsDataItems();
    }

    return data.results.map((item) => ({
      id: `nd-${item.article_id || Math.random().toString(36).substring(2, 9)}`,
      title: item.title,
      description: item.description || (item.content ? item.content.slice(0, 200) + "..." : ""),
      url: item.link,
      sourceName: item.source_name || item.source_id || "NewsData Wire",
      sourceUrl: item.source_url || item.link,
      publishedAt: item.pubDate || new Date().toISOString(),
      categorySlug: mapNewsDataCategory(item.category?.[0]),
      permission: "metadata_only",
      isProcessed: false,
      clusterId: `cluster-${item.title.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 30)}`,
      imageUrl: item.image_url || undefined,
      rawJson: item as unknown as Record<string, unknown>,
    }));
  } catch (error) {
    console.error("Error in fetchNewsDataArticles:", error);
    return getFallbackNewsDataItems();
  }
}

function mapNewsDataCategory(cat?: string): string {
  if (!cat) return "current-events";
  const c = cat.toLowerCase();
  if (c.includes("world") || c.includes("top")) return "world";
  if (c.includes("politic")) return "politics";
  if (c.includes("tech") || c.includes("science")) return "technology";
  if (c.includes("business") || c.includes("economic")) return "business";
  if (c.includes("sport")) return "sports";
  if (c.includes("entertainment") || c.includes("art")) return "culture";
  return "current-events";
}

function getFallbackNewsDataItems(): ImportedSourceItem[] {
  return [
    {
      id: `nd-mock-1-${Date.now()}`,
      title: "Global Maritime Logistics Corridors Pivot Toward Modular Nuclear Propulsion",
      description: "Leading shipping conglomerates unveil prototype ultra-large container vessels equipped with molten-salt micro-reactors for zero-emission intercontinental routes.",
      url: "https://newsdata.io/wire/nuclear-maritime-propulsion",
      sourceName: "Global Maritime Review",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      categorySlug: "technology",
      permission: "metadata_only",
      isProcessed: false,
      clusterId: "cluster-nuclear-shipping",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: `nd-mock-2-${Date.now()}`,
      title: "International Renewable Energy Council Publishes 2026 Grid Flexibility Benchmark",
      description: "Comprehensive study reveals grid-scale solid-state iron-air battery installations grew 280% across European and North American interconnectors.",
      url: "https://newsdata.io/wire/grid-flexibility-2026",
      sourceName: "Energy Transition Gazette",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      categorySlug: "business",
      permission: "metadata_only",
      isProcessed: false,
      clusterId: "cluster-iron-air-batteries",
      imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: `nd-mock-3-${Date.now()}`,
      title: "Archaeologists in Peloponnese Uncover Preserved Classical Library Scriptorium",
      description: "Excavations in ancient Corinth reveal charred papyrus scrolls detailing previously unknown civic legal treatises from the fourth century BCE.",
      url: "https://newsdata.io/wire/corinth-scriptorium",
      sourceName: "Hellenic Antiquities Gazette",
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      categorySlug: "culture",
      permission: "metadata_only",
      isProcessed: false,
      clusterId: "cluster-corinth-scrolls",
      imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=80",
    },
  ];
}
