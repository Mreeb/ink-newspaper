import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, ArrowLeft, Feather } from "lucide-react";
import { db } from "@/lib/services/db";
import { ArticleCard } from "@/components/public/ArticleCard";
import { Badge, EditorialDivider } from "@/components/ui/Badge";
import { EditorialImage } from "@/components/ui/EditorialImage";

interface EditionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EditionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const edition = db.getWeeklyEditionById(slug);
  if (!edition) return { title: "Edition Not Found" };

  return {
    title: `Vol. ${edition.volumeNumber}, Issue ${edition.issueNumber}: ${edition.title} — INK Newspaper`,
    description: edition.theme || edition.description,
    openGraph: {
      title: `${edition.title} | INK Newspaper Edition`,
      description: edition.theme,
      images: [{ url: edition.coverImage }],
    },
  };
}

export default async function IndividualEditionPage({ params }: EditionPageProps) {
  const { slug } = await params;
  const edition = db.getWeeklyEditionById(slug);

  if (!edition) {
    notFound();
  }

  const articles = db.getArticles({ editionId: edition.id, status: "published" });
  const allArticles = articles.length > 0 ? articles : db.getArticles({ status: "published" });
  const dexterColumn = db.getDexterColumns({ status: "published" }).find((c) => c.editionId === edition.id) || db.getDexterColumns({ status: "published" })[0];

  const leadStory = allArticles[0];
  const supportingStories = allArticles.slice(1);

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/editions"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-clay)] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Weekly Editions</span>
        </Link>

        {edition.isCurrent && <Badge variant="edition">Current Edition</Badge>}
      </div>

      {/* Edition Hero Banner */}
      <div className="clay-card-static p-8 sm:p-12 border border-[var(--border-paper)] bg-[var(--bg-surface)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[var(--accent-gold)]">
              <span>Weekly Folio • Volume {edition.volumeNumber}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[var(--text-muted)] font-normal">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(edition.publicationDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[var(--text-ink)] leading-tight">
              Issue {edition.issueNumber}: {edition.title}
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed">
              {edition.theme}
            </p>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {edition.description}
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[var(--border-paper)] shadow-xl bg-[var(--bg-subtle)]">
              <EditorialImage
                src={edition.coverImage}
                alt={edition.title}
                fallbackCategory={`Issue ${edition.issueNumber}`}
                fallbackIcon="newspaper"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dexter's Vantage Point in this Edition */}
      {dexterColumn && (
        <section className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--accent-clay)]/30 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent-clay)]">
            <Feather className="w-4 h-4" />
            <span>Featured Column in this Issue</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <Link href={`/column/${dexterColumn.slug}`} className="block group">
                <h3 className="font-editorial text-2xl font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors">
                  {dexterColumn.title}
                </h3>
              </Link>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-serif italic line-clamp-2">
                {dexterColumn.subtitle || dexterColumn.excerpt}
              </p>
            </div>

            <Link
              href={`/column/${dexterColumn.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-clay)] text-white text-xs font-semibold hover:bg-[var(--accent-dark-clay)] transition-colors shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Essay</span>
            </Link>
          </div>
        </section>
      )}

      <EditorialDivider />

      {/* Lead Story for this Edition */}
      {leadStory && (
        <section className="space-y-4">
          <h2 className="font-serif font-bold text-xs uppercase tracking-widest text-[var(--text-faint)]">
            Edition Cover Story
          </h2>
          <ArticleCard article={leadStory} variant="lead" />
        </section>
      )}

      {/* Supporting Articles in this Edition */}
      {supportingStories.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-[var(--border-paper)]">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-ink)]">
            Stories & Dispatches in Issue {edition.issueNumber}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportingStories.map((art) => (
              <ArticleCard key={art.id} article={art} variant="grid" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
