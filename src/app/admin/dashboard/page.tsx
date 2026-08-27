"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Plus,
  Globe2,
  Feather,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { Badge } from "@/components/ui/Badge";
import { Article, AiJob, WeeklyEdition, DexterColumn } from "@/lib/types";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    draftsCount: 0,
    reviewCount: 0,
    scheduledCount: 0,
    publishedCount: 0,
    failedJobsCount: 0,
  });
  const [inReviewArticles, setInReviewArticles] = useState<Article[]>([]);
  const [recentPublished, setRecentPublished] = useState<Article[]>([]);
  const [currentEdition, setCurrentEdition] = useState<WeeklyEdition | null>(null);
  const [failedJobs, setFailedJobs] = useState<AiJob[]>([]);
  const [isFetchingNews, setIsFetchingNews] = useState(false);
  const [newsFetchResult, setNewsFetchResult] = useState<string | null>(null);

  const loadDashboardData = async () => {
    try {
      const res = await fetch("/api/admin/dashboard-stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setInReviewArticles(data.inReviewArticles || []);
        setRecentPublished(data.recentPublished || []);
        setCurrentEdition(data.currentEdition || null);
        setFailedJobs(data.failedJobs || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard stats:", err);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleFetchNewsNow = async () => {
    setIsFetchingNews(true);
    setNewsFetchResult(null);
    try {
      const res = await fetch("/api/news/fetch", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setNewsFetchResult(`Discovered ${data.addedCount} new story leads.`);
        loadDashboardData();
      } else {
        setNewsFetchResult("Fetch failed: " + (data.error || "Unknown error"));
      }
    } catch {
      setNewsFetchResult("Network error triggering pipeline.");
    } finally {
      setIsFetchingNews(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-paper)]">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent-clay)]">
            Editorial Command Center
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--text-ink)]">
            Newsroom Dashboard
          </h1>
        </div>

        {/* Actionable Quick Action Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/articles/new">
            <ClayButton variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Create Article
            </ClayButton>
          </Link>

          <Link href="/admin/dexter/new">
            <ClayButton variant="secondary" size="sm" leftIcon={<Feather className="w-4 h-4" />}>
              Add Dexter Column
            </ClayButton>
          </Link>

          <ClayButton
            onClick={handleFetchNewsNow}
            variant="secondary"
            size="sm"
            isLoading={isFetchingNews}
            leftIcon={<Globe2 className="w-4 h-4 text-[var(--accent-clay)]" />}
          >
            Fetch News Now
          </ClayButton>
        </div>
      </div>

      {newsFetchResult && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
          <span>{newsFetchResult}</span>
          <button onClick={() => setNewsFetchResult(null)} className="text-emerald-600 font-bold">×</button>
        </div>
      )}

      {/* Actionable Status Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Link
          href="/admin/articles?status=in_review"
          className="clay-card p-4 space-y-1 block hover:border-[var(--accent-clay)] transition-all"
        >
          <span className="text-xs text-[var(--text-faint)] font-medium">In Review Queue</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[var(--text-ink)]">{stats.reviewCount}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">
              Action Required
            </span>
          </div>
        </Link>

        <Link
          href="/admin/articles?status=draft"
          className="clay-card p-4 space-y-1 block hover:border-[var(--accent-clay)] transition-all"
        >
          <span className="text-xs text-[var(--text-faint)] font-medium">Active Drafts</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[var(--text-ink)]">{stats.draftsCount}</span>
            <FileText className="w-4 h-4 text-[var(--text-faint)]" />
          </div>
        </Link>

        <Link
          href="/admin/articles?status=scheduled"
          className="clay-card p-4 space-y-1 block hover:border-[var(--accent-clay)] transition-all"
        >
          <span className="text-xs text-[var(--text-faint)] font-medium">Scheduled</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[var(--text-ink)]">{stats.scheduledCount}</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
        </Link>

        <Link
          href="/admin/articles?status=published"
          className="clay-card p-4 space-y-1 block hover:border-[var(--accent-clay)] transition-all"
        >
          <span className="text-xs text-[var(--text-faint)] font-medium">Published Live</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.publishedCount}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
        </Link>

        <Link
          href="/admin/ai-jobs"
          className="clay-card p-4 space-y-1 block hover:border-[var(--accent-clay)] transition-all col-span-2 lg:col-span-1"
        >
          <span className="text-xs text-[var(--text-faint)] font-medium">Failed AI Jobs</span>
          <div className="flex items-baseline justify-between">
            <span className={`text-2xl font-bold ${stats.failedJobsCount > 0 ? "text-[#B63A32]" : "text-[var(--text-ink)]"}`}>
              {stats.failedJobsCount}
            </span>
            <AlertTriangle className={`w-4 h-4 ${stats.failedJobsCount > 0 ? "text-[#B63A32]" : "text-[var(--text-faint)]"}`} />
          </div>
        </Link>
      </div>

      {/* Main Grid: Review Queue & Current Edition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Review Queue & Failed Jobs (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Review Queue */}
          <div className="clay-card-static p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-paper)]">
              <h3 className="font-editorial text-xl font-bold text-[var(--text-ink)] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--accent-clay)]" />
                <span>Drafts Awaiting Editorial Approval</span>
              </h3>
              <Link href="/admin/articles" className="text-xs font-semibold text-[var(--accent-clay)] hover:underline">
                View All
              </Link>
            </div>

            {inReviewArticles.length > 0 ? (
              <div className="divide-y divide-[var(--border-paper)]">
                {inReviewArticles.map((art) => (
                  <div key={art.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="status" status={art.status} />
                        <span className="text-[11px] text-[var(--text-faint)]">{art.category?.name}</span>
                      </div>
                      <Link href={`/admin/articles/${art.id}/edit`} className="font-semibold text-sm hover:text-[var(--accent-clay)] block line-clamp-1">
                        {art.title}
                      </Link>
                    </div>
                    <Link href={`/admin/articles/${art.id}/edit`}>
                      <ClayButton variant="primary" size="sm">
                        Review
                      </ClayButton>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--text-muted)] py-4 text-center">
                All submitted drafts have been reviewed and published.
              </p>
            )}
          </div>

          {/* Failed AI Jobs (if any) */}
          {failedJobs.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#B63A32]/10 border border-[#B63A32]/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-lg font-bold text-[#B63A32] flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Failed AI Generation Tasks ({failedJobs.length})</span>
                </h3>
                <Link href="/admin/ai-jobs" className="text-xs font-semibold text-[#B63A32] hover:underline">
                  Manage All Logs →
                </Link>
              </div>
              <div className="space-y-2">
                {failedJobs.map((job) => (
                  <div key={job.id} className="p-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-paper)] flex items-center justify-between text-xs gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-[var(--text-ink)] truncate">{job.storyClusterTitle}</p>
                      <p className="text-[#B63A32] line-clamp-1 text-[11px] font-mono">{job.errorLog}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Link href="/admin/ai-jobs">
                        <ClayButton variant="secondary" size="sm">
                          Inspect
                        </ClayButton>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recently Published Articles */}
          <div className="clay-card-static p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-paper)]">
              <h3 className="font-editorial text-xl font-bold text-[var(--text-ink)] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Recently Published Articles</span>
              </h3>
            </div>

            <div className="divide-y divide-[var(--border-paper)]">
              {recentPublished.slice(0, 5).map((art) => (
                <div key={art.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <Link href={`/article/${art.slug}`} target="_blank" className="font-medium text-[var(--text-ink)] hover:text-[var(--accent-clay)] hover:underline line-clamp-1">
                      {art.title}
                    </Link>
                    <span className="text-[var(--text-faint)]">
                      {art.authorName} • {art.publishedAt ? new Date(art.publishedAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                  <Link href={`/admin/articles/${art.id}/edit`} className="text-[var(--accent-clay)] hover:underline ml-2">
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Current Active Edition & Quick Pipeline (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Current Weekly Edition Spotlight */}
          {currentEdition && (
            <div className="clay-card p-6 space-y-4 border-2 border-[var(--accent-gold)]/30">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-gold)]">
                  Active Weekly Folio
                </span>
                <Badge variant="edition">Issue {currentEdition.issueNumber}</Badge>
              </div>

              <div>
                <h4 className="font-editorial text-2xl font-bold text-[var(--text-ink)]">
                  {currentEdition.title}
                </h4>
                <p className="text-xs text-[var(--text-muted)] font-serif italic mt-1">
                  {currentEdition.theme}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[var(--text-faint)]">
                <span>Published {currentEdition.publicationDate}</span>
                <Link href="/admin/editions" className="font-semibold text-[var(--accent-clay)] hover:underline flex items-center gap-1">
                  <span>Manage Editions</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* Quick News Discovery Widget */}
          <div className="clay-card-static p-6 space-y-4">
            <h4 className="font-editorial text-lg font-bold text-[var(--text-ink)] flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[var(--accent-clay)]" />
              <span>News Pipeline Actions</span>
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Discovers stories across NewsData.io & GDELT, enforces content licenses, and prepares structured AI generation drafts.
            </p>
            <div className="space-y-2 pt-2">
              <Link href="/admin/news-pipeline" className="w-full block">
                <ClayButton variant="secondary" size="sm" className="w-full justify-between" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Open Ingestion Wire
                </ClayButton>
              </Link>
              <Link href="/admin/ai-jobs" className="w-full block">
                <ClayButton variant="secondary" size="sm" className="w-full justify-between" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Inspect AI Drafting Engine
                </ClayButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
