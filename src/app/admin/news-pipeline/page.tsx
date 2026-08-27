"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Globe2,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Shield,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { ImportedSourceItem } from "@/lib/types";

export default function NewsPipelinePage() {
  const router = useRouter();
  const [sources, setSources] = useState<ImportedSourceItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<ImportedSourceItem | null>(null);
  const [editorialAngle, setEditorialAngle] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const loadSources = async () => {
    try {
      const res = await fetch("/api/news/sources-pool");
      if (res.ok) {
        const data = await res.json();
        setSources(data.sources || []);
      }
    } catch (err) {
      console.error("Failed to load sources pool:", err);
    }
  };

  useEffect(() => {
    loadSources();
  }, []);

  const handleFetchNewsNow = async () => {
    setIsFetching(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/news/fetch", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage(`Pipeline updated: Discovered ${data.addedCount} new leads across NewsData.io & GDELT.`);
        loadSources();
      } else {
        setStatusMessage("Pipeline error: " + (data.error || "Failed to fetch news."));
      }
    } catch {
      setStatusMessage("Failed to execute discovery pipeline.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleLaunchAiDraft = async (item: ImportedSourceItem) => {
    setIsGenerating(item.id);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/news/generate-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyTitle: item.title,
          sourceSummaries: [
            {
              title: item.title,
              source: item.sourceName,
              url: item.url,
              snippet: item.description,
            },
          ],
          editorialAngle: editorialAngle || "Investigative depth and long-term implications.",
          targetCategorySlug: item.categorySlug,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.draft?.id) {
        setSelectedCluster(null);
        router.push(`/admin/articles/${data.draft.id}/edit`);
      } else {
        setStatusMessage("Draft generation error: " + (data.error || "OpenAI failed to draft."));
      }
    } catch (err) {
      console.error("AI draft generation error:", err);
      setStatusMessage("Failed to generate AI draft.");
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Pipeline Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-paper)]">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent-clay)] flex items-center gap-1">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Automated Discovery Pool</span>
          </span>
          <h1 className="font-editorial text-3xl font-bold text-[var(--text-ink)]">
            News Pipeline & AI Drafting Desk
          </h1>
        </div>

        <ClayButton
          variant="primary"
          size="md"
          isLoading={isFetching}
          onClick={handleFetchNewsNow}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Fetch News Now (NewsData + GDELT)
        </ClayButton>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-clay)]/30 text-xs font-semibold text-[var(--text-ink)] flex items-center justify-between shadow-sm">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="text-[var(--text-muted)] font-bold">×</button>
        </div>
      )}

      {/* Discovered Stories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-paper)]">
          <h2 className="font-serif font-bold text-xs uppercase tracking-widest text-[var(--text-faint)] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[var(--accent-clay)]" />
            <span>Ingested Source Dispatches ({sources.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources.map((item) => (
            <div
              key={item.id}
              className="clay-card p-5 flex flex-col justify-between space-y-4 relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[var(--accent-clay)] uppercase">
                    {item.sourceName}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] font-mono text-[10px] text-[var(--text-muted)]">
                    {item.permission}
                  </span>
                </div>

                <h3 className="font-editorial text-lg font-bold text-[var(--text-ink)] leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-paper)]/60 flex items-center justify-between gap-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[var(--text-faint)] hover:text-[var(--text-ink)] flex items-center gap-1"
                >
                  <span>Verify Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <ClayButton
                  variant="primary"
                  size="sm"
                  isLoading={isGenerating === item.id}
                  onClick={() => setSelectedCluster(item)}
                  leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                >
                  Synthesize Draft
                </ClayButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Angle & Synthesis Dialog */}
      {selectedCluster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-paper)]">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-clay)] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>OpenAI Structured Drafting</span>
              </span>
              <button
                onClick={() => setSelectedCluster(null)}
                className="p-1 rounded-lg border border-[var(--border-paper)] hover:bg-[var(--bg-subtle)]"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="font-editorial text-xl font-bold text-[var(--text-ink)] leading-snug">
                {selectedCluster.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Source: {selectedCluster.sourceName} • Category: {selectedCluster.categorySlug}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-ink)]">
                Editorial Angle / Focus (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Focus on technological sovereignty, ethical implications, and primary stakeholder quotes..."
                value={editorialAngle}
                onChange={(e) => setEditorialAngle(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-xl text-xs text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)]"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] text-[11px] text-[var(--text-muted)] space-y-1">
              <p className="font-semibold text-[var(--text-ink)]">Enforced Journalistic Guardrails:</p>
              <p>• Zero hallucinations. Only verified factual claims.</p>
              <p>• Creates an un-published &ldquo;Draft&rdquo; requiring human editor sign-off.</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <ClayButton
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCluster(null)}
              >
                Cancel
              </ClayButton>
              <ClayButton
                type="button"
                variant="primary"
                size="sm"
                isLoading={isGenerating === selectedCluster.id}
                onClick={() => handleLaunchAiDraft(selectedCluster)}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Generate Structured Article
              </ClayButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
