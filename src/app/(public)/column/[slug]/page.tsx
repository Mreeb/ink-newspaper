import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Feather, Clock, Calendar, ArrowLeft, Quote, Sparkles } from "lucide-react";
import { db } from "@/lib/services/db";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { ShareControls } from "@/components/public/ShareControls";
import { EditorialDivider } from "@/components/ui/Badge";

interface ColumnPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ColumnPageProps): Promise<Metadata> {
  const { slug } = await params;
  const column = db.getDexterColumnBySlug(slug);
  if (!column) return { title: "Column Not Found" };

  return {
    title: `${column.title} — Dexter's Vantage Point | INK`,
    description: column.subtitle || column.excerpt,
    authors: [{ name: "Dexter" }],
    openGraph: {
      title: `${column.title} | Dexter's Vantage Point`,
      description: column.subtitle || column.excerpt,
      images: [{ url: column.featuredImage }],
    },
  };
}

export default async function IndividualDexterColumnPage({ params }: ColumnPageProps) {
  const { slug } = await params;
  const column = db.getDexterColumnBySlug(slug);

  if (!column) {
    notFound();
  }

  const allColumns = db.getDexterColumns({ status: "published" });
  const otherColumns = allColumns.filter((c) => c.id !== column.id);

  const formattedDate = new Date(column.publishedAt).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/column/${column.slug}`;

  return (
    <>
      <ReadingProgress />

      <article className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-300">
        {/* Navigation & Masthead Tag */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link
              href="/column"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-clay)] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Dexter Columns</span>
            </Link>

            <span className="text-xs font-serif italic text-[var(--text-muted)] bg-[var(--bg-surface)] px-3 py-1 rounded-full border border-[var(--border-paper)]">
              {column.editionName || "The Weekly Folio"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[var(--accent-clay)] text-white flex items-center justify-center">
              <Feather className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[var(--accent-clay)]">
              Dexter&apos;s Vantage Point
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-ink)] leading-[1.12]">
            {column.title}
          </h1>

          {column.subtitle && (
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[var(--text-muted)] leading-relaxed">
              {column.subtitle}
            </p>
          )}

          {/* Byline & Share Bar */}
          <div className="pt-6 border-t border-[var(--border-paper)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[var(--accent-dark-clay)] text-white flex items-center justify-center font-serif font-bold text-sm shadow-md">
                D
              </div>
              <div className="text-xs">
                <p className="font-bold text-sm text-[var(--text-ink)]">Dexter</p>
                <div className="flex items-center gap-2 text-[var(--text-faint)]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formattedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {column.readingTimeMinutes} min read
                  </span>
                </div>
              </div>
            </div>

            <ShareControls title={column.title} url={canonicalUrl} />
          </div>
        </div>

        {/* Featured Artwork */}
        {column.featuredImage && (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border-2 border-[var(--accent-clay)]/30 shadow-xl bg-[var(--bg-subtle)]">
            <Image
              src={column.featuredImage}
              alt={column.title}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Signature Quote Callout */}
        {column.signatureQuote && (
          <div className="my-8 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-clay)]/30 border-l-4 border-l-[var(--accent-clay)] shadow-md">
            <p className="font-serif italic text-lg sm:text-xl text-[var(--text-ink)] leading-relaxed flex items-start gap-3">
              <Quote className="w-6 h-6 text-[var(--accent-clay)] shrink-0 mt-1" />
              <span>&ldquo;{column.signatureQuote}&rdquo;</span>
            </p>
          </div>
        )}

        {/* Rich Column Body */}
        <div
          className="prose-ink"
          dangerouslySetInnerHTML={{ __html: column.content }}
        />

        {/* Dexter Author Biography Card */}
        <div className="my-12 p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-paper)] shadow-[var(--shadow-clay-md)] flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[var(--accent-dark-clay)] text-white flex items-center justify-center font-serif font-bold text-3xl shadow-lg shrink-0">
            D
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--accent-clay)]">
              About the Author
            </span>
            <h3 className="font-editorial text-2xl font-bold text-[var(--text-ink)]">
              Dexter
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {column.authorBio || "Senior Columnist and Philosophical Editor of INK Newspaper. Dexter writes on the intersection of contemplation, craftsmanship, and modern institutional ethics."}
            </p>
          </div>
        </div>

        <EditorialDivider />

        {/* Other Columns from Dexter */}
        {otherColumns.length > 0 && (
          <section className="space-y-6">
            <h3 className="font-editorial text-2xl font-bold text-[var(--text-ink)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-clay)]" />
              <span>More Dispatches from Dexter</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherColumns.slice(0, 2).map((col) => (
                <Link
                  key={col.id}
                  href={`/column/${col.slug}`}
                  className="p-5 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-paper)] transition-all space-y-2 group shadow-[var(--shadow-clay-sm)]"
                >
                  <span className="text-[10px] uppercase font-bold text-[var(--accent-clay)] tracking-wider">
                    {col.editionName}
                  </span>
                  <h4 className="font-editorial text-base font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors line-clamp-2">
                    {col.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                    {col.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
