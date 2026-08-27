import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/services/db";
import { ArticleCard } from "@/components/public/ArticleCard";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = db.getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} — INK Newspaper`,
    description: category.description || `Investigative reporting and long-form analysis in ${category.name}.`,
    openGraph: {
      title: `${category.name} | INK Newspaper`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = db.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = db.getArticles({ categorySlug: slug, status: "published" });
  const featuredStory = articles.find((a) => a.isFeatured) || articles[0];
  const otherStories = articles.filter((a) => a.id !== featuredStory?.id);

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Category Hero / Header */}
      <div className="relative py-10 px-6 sm:px-10 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-paper)] shadow-[var(--shadow-clay-md)] space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-clay)] hover:underline mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Front Page</span>
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--accent-clay)]">
              Editorial Section
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-ink)]">
              {category.name}
            </h1>
          </div>

          <Badge variant="category" className="text-xs px-3 py-1">
            {articles.length} {articles.length === 1 ? "Story" : "Stories"}
          </Badge>
        </div>

        {category.description && (
          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl font-normal leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      {/* Featured Story in Category */}
      {featuredStory && (
        <section className="space-y-4">
          <h2 className="font-serif font-bold text-xs uppercase tracking-widest text-[var(--text-faint)] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-clay)]" />
            <span>Section Lead</span>
          </h2>
          <ArticleCard article={featuredStory} variant="lead" />
        </section>
      )}

      {/* Other Stories Grid */}
      {otherStories.length > 0 ? (
        <section className="space-y-6 pt-6 border-t border-[var(--border-paper)]">
          <h2 className="font-editorial text-2xl font-bold text-[var(--text-ink)]">
            Latest in {category.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherStories.map((art) => (
              <ArticleCard key={art.id} article={art} variant="grid" />
            ))}
          </div>
        </section>
      ) : !featuredStory ? (
        <div className="text-center py-20 clay-card-static p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-[var(--text-faint)] mx-auto" />
          <h3 className="font-editorial text-2xl font-bold text-[var(--text-ink)]">
            No Published Stories Yet
          </h3>
          <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
            Our correspondents are currently investigating and drafting reports for the {category.name} desk. Check back soon.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-clay)] text-white text-xs font-semibold hover:bg-[var(--accent-dark-clay)] transition-colors shadow-md"
          >
            Return to Front Page
          </Link>
        </div>
      ) : null}
    </div>
  );
}
