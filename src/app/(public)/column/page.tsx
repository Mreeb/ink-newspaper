import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Feather, BookOpen, Calendar, ArrowRight, Quote, Sparkles } from "lucide-react";
import { db } from "@/lib/services/db";
import { EditorialDivider } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Dexter's Vantage Point — The Weekly Philosophical Dispatch",
  description: "Weekly contemplative dispatches, philosophical inquiries, and intellectual commentary by Dexter for INK Newspaper.",
};

export default function DexterLandingPage() {
  const columns = db.getDexterColumns({ status: "published" });
  const featuredColumn = columns[0];
  const previousColumns = columns.slice(1);

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Branded Section Masthead */}
      <div className="text-center py-12 px-6 sm:px-10 rounded-3xl border border-[var(--accent-clay)]/30 bg-gradient-to-b from-[#C96846]/10 via-[var(--bg-surface)] to-[var(--bg-surface)] shadow-[var(--shadow-clay-lg)] relative overflow-hidden">
        <div className="w-14 h-14 rounded-2xl bg-[var(--accent-clay)] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Feather className="w-7 h-7" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] font-bold text-[var(--accent-clay)]">
          The Weekly Philosophical Column
        </span>

        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-[var(--text-ink)] mt-2 mb-4 tracking-tight">
          Dexter&apos;s Vantage Point
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl mx-auto font-serif italic leading-relaxed">
          &ldquo;Examining the collision of technology, accelerated culture, and enduring human virtues through slow, uncompromising contemplation.&rdquo;
        </p>

        {/* Dexter Author Profile Capsule */}
        <div className="mt-8 pt-6 border-t border-[var(--accent-clay)]/20 max-w-xl mx-auto flex items-center justify-center gap-4 text-left">
          <div className="w-12 h-12 rounded-full bg-[var(--accent-dark-clay)] text-white flex items-center justify-center font-serif font-bold text-lg shadow-md shrink-0">
            D
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            <p className="font-bold text-sm text-[var(--text-ink)]">Dexter</p>
            <p>Senior Columnist & Philosophical Editor at INK Newspaper. Dispatches published every Thursday.</p>
          </div>
        </div>
      </div>

      {/* Featured Current Column */}
      {featuredColumn && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-paper)]">
            <h2 className="font-serif font-bold text-xs uppercase tracking-widest text-[var(--accent-clay)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Current Weekly Dispatch</span>
            </h2>
            <span className="text-xs font-serif italic text-[var(--text-muted)]">
              {featuredColumn.editionName || "Vol. XIV, Issue 33"}
            </span>
          </div>

          <article className="clay-card p-6 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <Link href={`/column/${featuredColumn.slug}`} className="block group">
                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors leading-tight">
                    {featuredColumn.title}
                  </h3>
                </Link>

                {featuredColumn.subtitle && (
                  <p className="font-serif italic text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
                    {featuredColumn.subtitle}
                  </p>
                )}

                {featuredColumn.signatureQuote && (
                  <div className="p-4 rounded-2xl bg-[var(--bg-subtle)] border-l-4 border-[var(--accent-clay)] my-4">
                    <p className="font-serif italic text-sm text-[var(--text-ink)] flex items-start gap-2">
                      <Quote className="w-4 h-4 text-[var(--accent-clay)] shrink-0 mt-0.5" />
                      <span>&ldquo;{featuredColumn.signatureQuote}&rdquo;</span>
                    </p>
                  </div>
                )}

                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {featuredColumn.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between">
                  <Link
                    href={`/column/${featuredColumn.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-clay)] text-white text-xs font-semibold hover:bg-[var(--accent-dark-clay)] transition-all shadow-md"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Full Essay ({featuredColumn.readingTimeMinutes} min)</span>
                  </Link>

                  <span className="text-xs text-[var(--text-faint)] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(featuredColumn.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Link
                  href={`/column/${featuredColumn.slug}`}
                  className="block overflow-hidden rounded-2xl border-2 border-[var(--accent-clay)]/30 shadow-xl group"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-subtle)]">
                    <Image
                      src={featuredColumn.featuredImage}
                      alt={featuredColumn.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </article>
        </section>
      )}

      <EditorialDivider />

      {/* Previous Columns Archive */}
      {previousColumns.length > 0 && (
        <section className="space-y-6">
          <h2 className="font-editorial text-3xl font-bold text-[var(--text-ink)]">
            Previous Dispatches & Essays
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {previousColumns.map((col) => (
              <article key={col.id} className="clay-card p-6 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <Link href={`/column/${col.slug}`} className="block overflow-hidden rounded-xl">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bg-subtle)]">
                      <Image
                        src={col.featuredImage}
                        alt={col.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="flex items-center justify-between text-xs text-[var(--text-faint)]">
                    <span className="font-serif italic text-[var(--accent-clay)]">
                      {col.editionName}
                    </span>
                    <span>{col.readingTimeMinutes} min read</span>
                  </div>

                  <Link href={`/column/${col.slug}`} className="block">
                    <h3 className="font-editorial text-xl font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors leading-snug">
                      {col.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                    {col.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-paper)]/60 flex items-center justify-between">
                  <Link
                    href={`/column/${col.slug}`}
                    className="text-xs font-bold text-[var(--accent-clay)] hover:underline flex items-center gap-1"
                  >
                    <span>Read Dispatch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs text-[var(--text-faint)]">
                    {new Date(col.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
