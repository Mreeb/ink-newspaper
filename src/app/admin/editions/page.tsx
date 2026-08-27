"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BookOpen, Plus, Sparkles, CheckCircle2, Calendar } from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { WeeklyEdition } from "@/lib/types";

export default function AdminEditionsPage() {
  const [editions, setEditions] = useState<WeeklyEdition[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newEditionData, setNewEditionData] = useState({
    volumeNumber: 14,
    issueNumber: 34,
    title: "",
    theme: "",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    publicationDate: new Date().toISOString().split("T")[0],
    isCurrent: false,
    description: "",
  });

  const loadEditions = async () => {
    try {
      const res = await fetch("/api/admin/editions");
      if (res.ok) {
        const data = await res.json();
        setEditions(data.editions || []);
      }
    } catch (err) {
      console.error("Failed to load editions:", err);
    }
  };

  useEffect(() => {
    loadEditions();
  }, []);

  const handleCreateEdition = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/editions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEditionData),
      });
      if (res.ok) {
        setIsCreating(false);
        setNewEditionData({
          volumeNumber: 14,
          issueNumber: newEditionData.issueNumber + 1,
          title: "",
          theme: "",
          coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
          publicationDate: new Date().toISOString().split("T")[0],
          isCurrent: false,
          description: "",
        });
        loadEditions();
      }
    } catch (err) {
      console.error("Create edition failed:", err);
    }
  };

  const handleSetCurrent = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/editions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCurrent: true }),
      });
      if (res.ok) {
        loadEditions();
      }
    } catch (err) {
      console.error("Failed to set current edition:", err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-paper)]">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent-gold)] flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Weekly Print & Digital Folios</span>
          </span>
          <h1 className="font-editorial text-3xl font-bold text-[var(--text-ink)]">
            Weekly Editions Manager
          </h1>
        </div>

        <ClayButton
          variant="primary"
          size="sm"
          onClick={() => setIsCreating(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          New Weekly Edition
        </ClayButton>
      </div>

      {/* New Edition Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form
            onSubmit={handleCreateEdition}
            className="w-full max-w-lg bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-paper)]">
              <h3 className="font-editorial text-xl font-bold text-[var(--text-ink)]">
                Create New Weekly Edition
              </h3>
              <button type="button" onClick={() => setIsCreating(false)} className="p-1 hover:bg-[var(--bg-subtle)] rounded">
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Volume Number</label>
                <input
                  type="number"
                  required
                  value={newEditionData.volumeNumber}
                  onChange={(e) => setNewEditionData({ ...newEditionData, volumeNumber: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Issue Number</label>
                <input
                  type="number"
                  required
                  value={newEditionData.issueNumber}
                  onChange={(e) => setNewEditionData({ ...newEditionData, issueNumber: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Edition Title / Theme</label>
              <input
                type="text"
                required
                placeholder="e.g. The Architecture of Resilience"
                value={newEditionData.title}
                onChange={(e) => setNewEditionData({ ...newEditionData, title: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Theme Description</label>
              <input
                type="text"
                placeholder="Brief editorial thesis..."
                value={newEditionData.theme}
                onChange={(e) => setNewEditionData({ ...newEditionData, theme: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Cover Image URL</label>
              <input
                type="text"
                value={newEditionData.coverImage}
                onChange={(e) => setNewEditionData({ ...newEditionData, coverImage: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-xl text-xs"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isCurrent"
                checked={newEditionData.isCurrent}
                onChange={(e) => setNewEditionData({ ...newEditionData, isCurrent: e.target.checked })}
              />
              <label htmlFor="isCurrent" className="text-xs font-semibold cursor-pointer">
                Set as Active Current Edition immediately
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border-paper)]">
              <ClayButton type="button" variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                Cancel
              </ClayButton>
              <ClayButton type="submit" variant="primary" size="sm">
                Create Folio
              </ClayButton>
            </div>
          </form>
        </div>
      )}

      {/* Editions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {editions.map((ed) => (
          <div
            key={ed.id}
            className={`clay-card p-6 flex flex-col justify-between space-y-4 ${
              ed.isCurrent ? "border-2 border-[var(--accent-gold)] ring-2 ring-[var(--accent-gold)]/20" : ""
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xs text-[var(--accent-clay)]">
                  Vol. {ed.volumeNumber}, Issue {ed.issueNumber}
                </span>
                {ed.isCurrent && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D6A84B]/20 text-[#916719] dark:text-[#E0B45F] font-bold text-[10px] uppercase">
                    Active on Homepage
                  </span>
                )}
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[var(--bg-subtle)]">
                <Image src={ed.coverImage} alt={ed.title} fill className="object-cover" />
              </div>

              <h3 className="font-editorial text-xl font-bold text-[var(--text-ink)]">
                {ed.title}
              </h3>

              <p className="text-xs text-[var(--text-muted)] line-clamp-2 font-serif italic">
                {ed.theme}
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border-paper)] flex items-center justify-between">
              <span className="text-[11px] text-[var(--text-faint)]">{ed.publicationDate}</span>
              {!ed.isCurrent ? (
                <ClayButton
                  variant="secondary"
                  size="sm"
                  onClick={() => handleSetCurrent(ed.id)}
                >
                  Set as Active
                </ClayButton>
              ) : (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Current Issue</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
