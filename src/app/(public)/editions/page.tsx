import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { db } from "@/lib/services/db";
import { Badge, EditorialDivider } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Weekly Editions Archive — INK Newspaper",
  description: "Browse the complete archive of weekly print and digital editions published by INK Newspaper.",
};

export default function EditionsArchivePage() {
  const editions = db.getWeeklyEditions();
  const currentEdition = editions.find((e) => e.isCurrent) || editions[0];
  const previousEditions = editions.filter((e) => e.id !== currentEdition?.id);

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Masthead */}
      <div className="text-center py-10 px-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-paper)] shadow-[var(--shadow-clay-md)] space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[var(--accent-gold)]">
          The Curated Folios
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-ink)]">
          Weekly Editions Archive
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          Every Thursday, the INK Editorial Board publishes a complete themed folio uniting our investigative reports, Dexter&apos;s essay, and global dispatches.
        </p>
      </div>

      {/* Featured Current Edition */}
      {currentEdition && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-paper)]">
            <h2 className="font-serif font-bold text-xs uppercase tracking-widest text-[var(--accent-gold)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Current Featured Edition</span>
            </h2>
            <Badge variant="edition">Active Issue</Badge>
          </div>

          <div className="clay-card p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <Link
                  href={`/editions/${currentEdition.id}`}
                  className="block group overflow-hidden rounded-2xl border border-[var(--border-paper)] shadow-xl bg-[var(--bg-subtle)]"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={currentEdition.coverImage}
                      alt={currentEdition.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-serif italic text-[var(--accent-clay)] font-bold">
                  <span>Vol. {currentEdition.volumeNumber}, Issue {currentEdition.issueNumber}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[var(--text-muted)] font-normal">
                    <Calendar className="w-3 h-3" />
                    {new Date(currentEdition.publicationDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <Link href={`/editions/${currentEdition.id}`} className="block group">
                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors leading-tight">
                    {currentEdition.title}
                  </h3>
                </Link>

                <p className="font-serif italic text-base text-[var(--text-muted)]">
                  {currentEdition.theme}
                </p>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {currentEdition.description}
                </p>

                <div className="pt-4">
                  <Link
                    href={`/editions/${currentEdition.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-clay)] text-white text-xs font-semibold hover:bg-[var(--accent-dark-clay)] transition-all shadow-md"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Open Issue & Browse Contents</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <EditorialDivider />

      {/* Previous Editions Gallery */}
      {previousEditions.length > 0 && (
        <section className="space-y-6">
          <h2 className="font-editorial text-3xl font-bold text-[var(--text-ink)]">
            Past Weekly Editions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {previousEditions.map((ed) => (
              <article key={ed.id} className="clay-card p-5 flex flex-col justify-between group space-y-4">
                <div className="space-y-3">
                  <Link href={`/editions/${ed.id}`} className="block overflow-hidden rounded-xl">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-subtle)]">
                      <Image
                        src={ed.coverImage}
                        alt={ed.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="flex items-center justify-between text-xs text-[var(--text-faint)]">
                    <span className="font-serif font-bold text-[var(--accent-clay)]">
                      Vol. {ed.volumeNumber}, Issue {ed.issueNumber}
                    </span>
                    <span>
                      {new Date(ed.publicationDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <Link href={`/editions/${ed.id}`} className="block">
                    <h3 className="font-editorial text-xl font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors leading-snug">
                      {ed.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {ed.theme}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-paper)] flex items-center justify-between">
                  <Link
                    href={`/editions/${ed.id}`}
                    className="text-xs font-bold text-[var(--accent-clay)] hover:underline flex items-center gap-1"
                  >
                    <span>Read Issue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
