"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, Calendar, ArrowRight } from "lucide-react";
import { Article } from "@/lib/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.articles || []);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-paper)] bg-[var(--bg-subtle)]/40">
          <Search className="w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search investigative stories, columns, archives..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-[var(--text-ink)] placeholder-[var(--text-muted)] text-base font-medium outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[var(--text-muted)] hover:text-[var(--text-ink)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold bg-[var(--bg-paper)] text-[var(--text-muted)] border border-[var(--border-paper)] rounded-md hover:text-[var(--text-ink)]"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {isLoading ? (
            <div className="py-8 text-center text-sm text-[var(--text-muted)]">
              Searching the INK archives...
            </div>
          ) : query && results.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--text-muted)]">
              No stories found matching &ldquo;{query}&rdquo;.
            </div>
          ) : results.length > 0 ? (
            results.map((art) => (
              <Link
                key={art.id}
                href={`/article/${art.slug}`}
                onClick={onClose}
                className="group block p-3.5 rounded-xl border border-transparent hover:border-[var(--border-paper)] hover:bg-[var(--bg-subtle)]/60 transition-all"
              >
                <div className="flex items-center gap-2 text-xs text-[var(--accent-clay)] font-semibold mb-1">
                  <span>{art.category?.name || "General"}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[var(--text-muted)] font-normal">
                    <Calendar className="w-3 h-3" />
                    {art.publishedAt ? new Date(art.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors line-clamp-1">
                  {art.title}
                </h4>
                {art.deck && (
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1">
                    {art.deck}
                  </p>
                )}
              </Link>
            ))
          ) : (
            <div className="py-6 px-2 text-xs text-[var(--text-muted)] space-y-2">
              <div className="font-semibold text-[var(--text-ink)] uppercase tracking-wider text-[11px]">
                Suggested Topics
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Manufacturing", "Robotics", "Hydrogen", "Monasteries", "Typography", "Democracy"].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setQuery(topic)}
                    className="px-3 py-1 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-full text-xs hover:border-[var(--accent-clay)] hover:text-[var(--accent-clay)] transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {query && results.length > 0 && (
          <div className="p-3 border-t border-[var(--border-paper)] bg-[var(--bg-subtle)]/30 text-center">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-clay)] hover:underline"
            >
              View all results for &ldquo;{query}&rdquo; <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
