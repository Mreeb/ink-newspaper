import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Search, BookOpen, Calendar, ArrowRight } from "lucide-react";
import { db } from "@/lib/services/db";
import { ArticleCard } from "@/components/public/ArticleCard";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}" — INK Newspaper` : "Search Archives — INK Newspaper",
    description: "Search investigative reports, columns, and editorial archives across INK Newspaper.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, category } = await searchParams;
  const categories = db.getCategories();

  const articles = db.getArticles({
    status: "published",
    search: q || undefined,
    categorySlug: category || undefined,
  });

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* Search Header */}
      <div className="clay-card-static p-8 sm:p-10 space-y-6 text-center">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[var(--accent-clay)]">
          Editorial Archives
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[var(--text-ink)]">
          Search INK Newspaper
        </h1>

        {/* Search Bar Form */}
        <form action="/search" method="GET" className="max-w-xl mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              name="q"
              defaultValue={q || ""}
              placeholder="Search by topic, keyword, or author..."
              className="w-full pl-11 pr-4 py-3 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-2xl text-sm text-[var(--text-ink)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-clay)] shadow-inner transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[var(--accent-clay)] hover:bg-[var(--accent-dark-clay)] text-white text-xs font-semibold rounded-2xl transition-all shadow-md active:translate-y-[1px]"
          >
            Search
          </button>
        </form>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <Link
            href={`/search${q ? `?q=${encodeURIComponent(q)}` : ""}`}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              !category
                ? "bg-[var(--accent-clay)] text-white border-transparent"
                : "bg-[var(--bg-paper)] border-[var(--border-paper)] text-[var(--text-muted)] hover:text-[var(--text-ink)]"
            }`}
          >
            All Sections
          </Link>
          {categories.map((cat) => {
            const isSelected = category === cat.slug;
            const href = `/search?category=${cat.slug}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  isSelected
                    ? "bg-[var(--accent-clay)] text-white border-transparent"
                    : "bg-[var(--bg-paper)] border-[var(--border-paper)] text-[var(--text-muted)] hover:text-[var(--text-ink)]"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-paper)] text-xs text-[var(--text-faint)]">
        <span>
          Showing {articles.length} {articles.length === 1 ? "story" : "stories"}
          {q ? ` matching "${q}"` : ""}
          {category ? ` in ${categories.find((c) => c.slug === category)?.name || category}` : ""}
        </span>
      </div>

      {/* Results Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} variant="grid" />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center clay-card-static p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-[var(--text-faint)] mx-auto" />
          <h3 className="font-editorial text-2xl font-bold text-[var(--text-ink)]">
            No Stories Found
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto">
            We could not find any stories matching your query. Try broadening your keywords or exploring by editorial section.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-clay)] hover:underline"
            >
              <span>Return to Front Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
