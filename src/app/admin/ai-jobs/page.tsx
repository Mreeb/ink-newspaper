"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Trash2,
  Filter,
  Loader2,
} from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { AiJob } from "@/lib/types";

export default function AiJobsMonitorPage() {
  const [jobs, setJobs] = useState<AiJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isClearingFailed, setIsClearingFailed] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/ai-jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error("Failed to fetch AI jobs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteJob = async (id: string) => {
    setDeletingId(id);
    // Optimistic UI update
    setJobs((prev) => prev.filter((j) => j.id !== id));
    try {
      const res = await fetch(`/api/admin/ai-jobs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFeedbackMessage("AI drafting log removed successfully.");
        setTimeout(() => setFeedbackMessage(null), 3000);
      } else {
        fetchJobs(); // Rollback if failed
        setFeedbackMessage("Failed to delete log from server.");
      }
    } catch {
      fetchJobs();
      setFeedbackMessage("Network error deleting log.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAllFailed = async () => {
    const failedCount = jobs.filter((j) => j.status === "failed").length;
    if (failedCount === 0) return;

    setIsClearingFailed(true);
    setJobs((prev) => prev.filter((j) => j.status !== "failed"));
    try {
      const res = await fetch("/api/admin/ai-jobs?status=failed", { method: "DELETE" });
      if (res.ok) {
        setFeedbackMessage(`Successfully cleared ${failedCount} failed AI job logs.`);
        setTimeout(() => setFeedbackMessage(null), 3000);
      } else {
        fetchJobs();
      }
    } catch {
      fetchJobs();
    } finally {
      setIsClearingFailed(false);
    }
  };

  const handleRetryJob = async (job: AiJob) => {
    setRetryingId(job.id);
    try {
      const res = await fetch("/api/news/generate-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyTitle: job.storyClusterTitle,
          sourceSummaries: job.sourceUrls.map((u) => ({
            title: job.storyClusterTitle,
            source: "Verified Source",
            url: u,
          })),
          editorialAngle: job.promptText,
        }),
      });
      if (res.ok) {
        setFeedbackMessage("Draft retry successfully launched.");
        fetchJobs();
      } else {
        setFeedbackMessage("Retry failed.");
      }
    } catch {
      setFeedbackMessage("Network error retrying job.");
    } finally {
      setRetryingId(null);
    }
  };

  const failedJobsCount = jobs.filter((j) => j.status === "failed").length;

  const filteredJobs = jobs.filter((job) => {
    if (statusFilter === "all") return true;
    return job.status === statusFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-paper)]">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent-clay)] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Algorithmic Generation Monitor</span>
          </span>
          <h1 className="font-editorial text-3xl font-bold text-[var(--text-ink)]">
            AI Drafting Jobs & Error Logs
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {failedJobsCount > 0 && (
            <ClayButton
              variant="secondary"
              size="sm"
              isLoading={isClearingFailed}
              onClick={handleClearAllFailed}
              className="text-[#B63A32] hover:bg-red-50 dark:hover:bg-red-950/40 border-red-200 dark:border-red-900"
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Clear Failed ({failedJobsCount})
            </ClayButton>
          )}

          <ClayButton
            variant="secondary"
            size="sm"
            onClick={fetchJobs}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh Logs
          </ClayButton>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center justify-between animate-in fade-in">
          <span>{feedbackMessage}</span>
          <button onClick={() => setFeedbackMessage(null)} className="text-emerald-700 dark:text-emerald-300 font-bold px-1 cursor-pointer">×</button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[var(--text-faint)] flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </span>
        {[
          { id: "all", label: `All (${jobs.length})` },
          { id: "completed", label: `Completed (${jobs.filter((j) => j.status === "completed").length})` },
          { id: "failed", label: `Failed (${failedJobsCount})` },
          { id: "running", label: `Running (${jobs.filter((j) => j.status === "running").length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap border ${
              statusFilter === tab.id
                ? "bg-[var(--accent-clay)] text-white border-[var(--accent-clay)] shadow-sm"
                : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-paper)] hover:bg-[var(--bg-subtle)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="clay-card-static overflow-hidden border border-[var(--border-paper)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-muted)] uppercase tracking-wider font-semibold border-b border-[var(--border-paper)]">
              <tr>
                <th className="py-3.5 px-4">Story Cluster</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Confidence</th>
                <th className="py-3.5 px-4">Created At</th>
                <th className="py-3.5 px-4">Result / Error</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-paper)]/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[var(--text-muted)]">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[var(--accent-clay)]" />
                      <span>Loading AI generation history...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[var(--text-muted)]">
                    No AI jobs match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-[var(--bg-subtle)]/40 transition-colors">
                    <td className="py-3.5 px-4 max-w-xs sm:max-w-sm">
                      <p className="font-bold text-sm text-[var(--text-ink)] line-clamp-1">{job.storyClusterTitle}</p>
                      <p className="text-[10px] text-[var(--text-faint)] line-clamp-1">{job.promptText}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      {job.status === "completed" && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold text-[10px] flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed</span>
                        </span>
                      )}
                      {job.status === "failed" && (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 font-semibold text-[10px] flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Failed</span>
                        </span>
                      )}
                      {job.status === "running" && (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-semibold text-[10px] flex items-center gap-1 w-fit animate-pulse">
                          <Clock className="w-3 h-3" />
                          <span>Running</span>
                        </span>
                      )}
                      {job.status === "pending" && (
                        <span className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-[10px] w-fit">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-xs text-[var(--text-ink)]">
                      {job.confidenceScore ? `${Math.round(job.confidenceScore * 100)}%` : "—"}
                    </td>

                    <td className="py-3.5 px-4 text-[var(--text-faint)] whitespace-nowrap">
                      {new Date(job.createdAt).toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      {job.errorLog ? (
                        <p className="text-xs text-[#B63A32] font-mono line-clamp-1" title={job.errorLog}>{job.errorLog}</p>
                      ) : job.resultArticleId ? (
                        <Link
                          href={`/admin/articles/${job.resultArticleId}/edit`}
                          className="font-semibold text-[var(--accent-clay)] hover:underline flex items-center gap-1"
                        >
                          <span>View Generated Draft</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-[var(--text-faint)]">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {job.status === "failed" && (
                          <ClayButton
                            size="sm"
                            variant="secondary"
                            isLoading={retryingId === job.id}
                            onClick={() => handleRetryJob(job)}
                            leftIcon={<RefreshCw className="w-3 h-3" />}
                          >
                            Retry
                          </ClayButton>
                        )}
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          disabled={deletingId === job.id}
                          className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[#B63A32] hover:bg-red-50 dark:hover:bg-red-950/40 border border-transparent hover:border-red-200 dark:hover:border-red-900 transition-colors cursor-pointer flex items-center justify-center"
                          title="Delete AI job log"
                        >
                          {deletingId === job.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B63A32]" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
