"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Feather, ArrowRight, BookOpen, Quote } from "lucide-react";
import { DexterColumn } from "@/lib/types";
import { EditorialImage } from "@/components/ui/EditorialImage";

export function DexterSpotlight({ column }: { column: DexterColumn }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="my-14 relative overflow-hidden rounded-3xl border border-[var(--accent-clay)]/30 bg-gradient-to-br from-[#C96846]/10 via-[var(--bg-surface)] to-[#D6A84B]/10 p-6 sm:p-10 shadow-[var(--shadow-clay-lg)]"
    >
      {/* Interactive Rotating Decorative Stamp / Seal */}
      <motion.div
        whileHover={{ rotate: 45, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-15 pointer-events-none select-none"
      >
        <div className="w-32 h-32 rounded-full border-4 border-dashed border-[var(--accent-clay)] flex items-center justify-center rotate-12">
          <Feather className="w-16 h-16 text-[var(--accent-clay)]" />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--accent-clay)]/20 mb-8">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="w-10 h-10 rounded-2xl bg-[var(--accent-clay)] text-white flex items-center justify-center shadow-md cursor-pointer"
            >
              <Feather className="w-5 h-5" />
            </motion.div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--accent-clay)]">
                The Weekly Dispatch
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-ink)]">
                Dexter&apos;s Vantage Point
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-serif italic text-[var(--text-muted)] bg-[var(--bg-paper)] px-3 py-1 rounded-full border border-[var(--border-paper)] shadow-sm">
              {column.editionName || "Vol. XIV, Issue 33"}
            </span>
            <Link
              href="/column"
              className="text-xs font-semibold text-[var(--accent-clay)] hover:underline flex items-center gap-1 group"
            >
              <span>View Column Archives</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <Link href={`/column/${column.slug}`} className="block group">
              <h4 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors leading-tight">
                {column.title}
              </h4>
            </Link>

            {column.subtitle && (
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-serif italic">
                {column.subtitle}
              </p>
            )}

            {/* Signature Quote Callout */}
            {column.signatureQuote && (
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-2xl bg-[var(--bg-paper)]/90 border-l-4 border-[var(--accent-clay)] shadow-sm my-4"
              >
                <p className="font-serif italic text-sm text-[var(--text-ink)] leading-relaxed flex items-start gap-2">
                  <Quote className="w-4 h-4 text-[var(--accent-clay)] shrink-0 mt-0.5" />
                  <span>&ldquo;{column.signatureQuote}&rdquo;</span>
                </p>
              </motion.div>
            )}

            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
              {column.excerpt}
            </p>

            <div className="pt-4 flex items-center justify-between">
              <Link
                href={`/column/${column.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-clay)] text-white text-xs font-semibold hover:bg-[var(--accent-dark-clay)] transition-all shadow-md active:translate-y-[1px]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full Column ({column.readingTimeMinutes} min)</span>
              </Link>
              <span className="text-xs text-[var(--text-faint)] font-serif italic">
                Written by Dexter
              </span>
            </div>
          </div>

          {/* Featured Column Image */}
          <div className="lg:col-span-5">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
              <Link
                href={`/column/${column.slug}`}
                className="block overflow-hidden rounded-2xl border-2 border-[var(--accent-clay)]/30 shadow-xl group"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-subtle)]">
                  <EditorialImage
                    src={column.featuredImage}
                    alt={column.title}
                    fallbackCategory="Dexter's Vantage"
                    fallbackIcon="feather"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-serif italic">
                    &ldquo;Silence is not the absence of thought; it is the clean slate.&rdquo;
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
