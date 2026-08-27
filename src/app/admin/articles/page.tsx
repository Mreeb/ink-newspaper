"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { Badge } from "@/components/ui/Badge";
import { Article, ArticleStatus } from "@/lib/types";

export default function AdminArticlesListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (searchQuery) params.append("search", searchQuery);

      const res = await fetch(`/api/articles?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || []);
      }
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [statusFilter, searchQuery]);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & New Article Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-paper)]">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent-clay)]">
            Content Management
          </span>
          <h1 className="font-editorial text-3xl font-bold text-[var(--text-ink)]">
            All Articles & Dispatches
          </h1>
        </div>

        <Link href="/admin/articles/new">
          <ClayButton variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Draft New Article
          </ClayButton>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search by title, deck, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-xl text-xs text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)] shadow-sm"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {["all", "draft", "in_review", "approved", "scheduled", "published", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize border transition-all ${
                statusFilter === st
                  ? "bg-[var(--accent-clay)] text-white border-transparent shadow-sm"
                  : "bg-[var(--bg-surface)] border-[var(--border-paper)] text-[var(--text-muted)] hover:text-[var(--text-ink)]"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      <div className="clay-card-static overflow-hidden border border-[var(--border-paper)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-muted)] uppercase tracking-wider font-semibold border-b border-[var(--border-paper)]">
              <tr>
                <th className="py-3.5 px-4">Title & Section</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">AI / Origin</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-paper)]/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[var(--text-muted)]">
                    Loading editorial archives...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[var(--text-muted)]">
                    No articles found matching the current filters.
                  </td>
                </tr>
              ) : (
                articles.map((art) => (
                  <tr key={art.id} className="hover:bg-[var(--bg-subtle)]/40 transition-colors">
                    <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                      <div className="space-y-1">
                        <Link
                          href={`/admin/articles/${art.id}/edit`}
                          className="font-bold text-sm text-[var(--text-ink)] hover:text-[var(--accent-clay)] line-clamp-1 block"
                        >
                          {art.title}
                        </Link>
                        <div className="flex items-center gap-2 text-[10px] text-[var(--text-faint)]">
                          <span className="font-semibold text-[var(--accent-clay)] uppercase">
                            {art.category?.name || "General"}
                          </span>
                          {art.isLead && <span className="text-amber-600 font-bold">• Lead Story</span>}
                          {art.isBreaking && <span className="text-[#B63A32] font-bold">• Breaking</span>}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant="status" status={art.status} />
                    </td>

                    <td className="py-3.5 px-4 text-[var(--text-muted)]">
                      {art.authorName}
                    </td>

                    <td className="py-3.5 px-4">
                      {art.aiGenerated ? (
                        <span className="inline-flex items-center gap-1 text-[var(--accent-clay)] font-semibold text-[11px]">
                          <Sparkles className="w-3 h-3" />
                          <span>AI Assisted</span>
                        </span>
                      ) : (
                        <span className="text-[var(--text-faint)] text-[11px]">Staff Authored</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-[var(--text-faint)] whitespace-nowrap">
                      {art.publishedAt
                        ? new Date(art.publishedAt).toLocaleDateString()
                        : new Date(art.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/article/${art.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-subtle)]"
                          title="View public page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/admin/articles/${art.id}/edit`}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-clay)] hover:bg-[var(--bg-subtle)]"
                          title="Edit article"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(art.id, art.title)}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[#B63A32] hover:bg-[var(--bg-subtle)] cursor-pointer"
                          title="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
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
