"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Feather, Plus, Eye, Edit, Trash2, Calendar, BookOpen } from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { DexterColumn } from "@/lib/types";

export default function DexterAdminListPage() {
  const [columns, setColumns] = useState<DexterColumn[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchColumns = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/dexter");
      if (res.ok) {
        const data = await res.json();
        setColumns(data.columns || []);
      }
    } catch (err) {
      console.error("Failed to fetch columns:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete Dexter's column "${title}"?`)) return;
    try {
      const res = await fetch(`/api/dexter/${id}`, { method: "DELETE" });
      if (res.ok) {
        setColumns((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-paper)]">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent-clay)] flex items-center gap-1">
            <Feather className="w-3.5 h-3.5" />
            <span>Editorial Column Studio</span>
          </span>
          <h1 className="font-editorial text-3xl font-bold text-[var(--text-ink)]">
            Dexter&apos;s Vantage Point Dispatches
          </h1>
        </div>

        <Link href="/admin/dexter/new">
          <ClayButton variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            New Weekly Column
          </ClayButton>
        </Link>
      </div>

      <div className="clay-card-static overflow-hidden border border-[var(--border-paper)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-muted)] uppercase tracking-wider font-semibold border-b border-[var(--border-paper)]">
              <tr>
                <th className="py-3.5 px-4">Title & Subtitle</th>
                <th className="py-3.5 px-4">Weekly Folio</th>
                <th className="py-3.5 px-4">Published Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-paper)]/60">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[var(--text-muted)]">
                    Loading Dexter&apos;s essays...
                  </td>
                </tr>
              ) : columns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[var(--text-muted)]">
                    No columns published yet.
                  </td>
                </tr>
              ) : (
                columns.map((col) => (
                  <tr key={col.id} className="hover:bg-[var(--bg-subtle)]/40 transition-colors">
                    <td className="py-3.5 px-4 max-w-sm">
                      <Link
                        href={`/admin/dexter/${col.id}/edit`}
                        className="font-bold text-sm text-[var(--text-ink)] hover:text-[var(--accent-clay)] block line-clamp-1"
                      >
                        {col.title}
                      </Link>
                      {col.subtitle && (
                        <p className="text-[11px] text-[var(--text-faint)] font-serif italic line-clamp-1">
                          {col.subtitle}
                        </p>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-serif italic text-[var(--accent-clay)]">
                      {col.editionName || "The Weekly Folio"}
                    </td>

                    <td className="py-3.5 px-4 text-[var(--text-faint)] whitespace-nowrap">
                      {new Date(col.publishedAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold text-[10px] capitalize">
                        {col.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/column/${col.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-subtle)]"
                          title="View public page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/dexter/${col.id}/edit`}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-clay)] hover:bg-[var(--bg-subtle)]"
                          title="Edit column"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(col.id, col.title)}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[#B63A32] hover:bg-[var(--bg-subtle)]"
                          title="Delete column"
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
