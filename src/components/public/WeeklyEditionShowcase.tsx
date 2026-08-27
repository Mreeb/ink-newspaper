"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { WeeklyEdition, Article } from "@/lib/types";
import { EditorialImage } from "@/components/ui/EditorialImage";

export function WeeklyEditionShowcase({
  edition,
  articles,
}: {
  edition: WeeklyEdition;
  articles: Article[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="my-16 clay-card-static p-6 sm:p-10 border border-[var(--border-paper)] bg-[var(--bg-surface)] shadow-[var(--shadow-clay-md)]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-paper)] mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[var(--accent-gold)] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Curated Print & Digital Folio</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-ink)]">
              Weekly Edition • Vol. {edition.volumeNumber}, Issue {edition.issueNumber}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(edition.publicationDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <Link
              href={`/editions/${edition.id}`}
              className="text-xs font-semibold text-[var(--accent-clay)] hover:underline flex items-center gap-1 group"
            >
              <span>Explore Edition</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Perspective Hover Magazine Cover */}
          <div className="lg:col-span-4 perspective-1000">
            <motion.div
              whileHover={{ y: -6, rotateY: -4, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Link
                href={`/editions/${edition.id}`}
                className="block group overflow-hidden rounded-2xl border border-[var(--border-paper)] shadow-2xl bg-[var(--bg-subtle)]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <EditorialImage
                    src={edition.coverImage}
                    alt={edition.title}
                    fallbackCategory={`Issue ${edition.issueNumber}`}
                    fallbackIcon="newspaper"
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#D6A84B] mb-1">
                      Theme of the Week
                    </span>
                    <h4 className="font-editorial text-xl font-bold leading-tight">
                      {edition.title}
                    </h4>
                    <p className="text-xs text-stone-300 mt-2 line-clamp-2">
                      {edition.theme}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Grouped Articles Index */}
          <div className="lg:col-span-8 space-y-4">
            <h4 className="font-serif font-bold text-lg text-[var(--text-ink)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--accent-clay)]" />
              <span>Table of Contents</span>
            </h4>

            <div className="divide-y divide-[var(--border-paper)]">
              {articles.slice(0, 5).map((art, idx) => (
                <motion.div
                  key={art.id}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-baseline gap-4 group cursor-pointer"
                >
                  <span className="font-serif font-bold text-xs text-[var(--accent-clay)] w-6 shrink-0">
                    0{idx + 1}
                  </span>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-faint)]">
                        {art.category?.name}
                      </span>
                    </div>
                    <Link href={`/article/${art.slug}`} className="block">
                      <h5 className="font-editorial text-base sm:text-lg font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors leading-snug">
                        {art.title}
                      </h5>
                    </Link>
                  </div>
                  <span className="text-xs text-[var(--text-faint)] shrink-0 hidden sm:inline">
                    {art.readingTimeMinutes} min
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Link
                href={`/editions/${edition.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--border-paper)] text-[var(--text-ink)] text-xs font-semibold transition-all border border-[var(--border-paper)] shadow-sm"
              >
                <span>View All {articles.length} Stories in Issue {edition.issueNumber}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/editions"
                className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-ink)]"
              >
                Browse Edition Archive →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
