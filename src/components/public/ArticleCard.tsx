"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { Article } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { EditorialImage } from "@/components/ui/EditorialImage";

interface ArticleCardProps {
  article: Article;
  variant?: "lead" | "top-story" | "grid" | "horizontal" | "compact";
  className?: string;
  showImage?: boolean;
}

export function ArticleCard({
  article,
  variant = "grid",
  className = "",
  showImage = true,
}: ArticleCardProps) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  // LEAD STORY VARIANT (Dominant Hero Feature)
  if (variant === "lead") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`group relative clay-card p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-[var(--shadow-clay-lg)] ${className}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              {article.isBreaking && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#B63A32] text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  Breaking
                </span>
              )}
              {article.category && (
                <Link href={`/category/${article.category.slug}`}>
                  <Badge variant="category">{article.category.name}</Badge>
                </Link>
              )}
              {article.aiGenerated && (
                <span className="inline-flex items-center gap-1 text-[11px] text-[var(--accent-clay)] font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Synthesized</span>
                </span>
              )}
              <span className="text-xs text-[var(--text-faint)] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readingTimeMinutes} min read
              </span>
            </div>

            <Link href={`/article/${article.slug}`} className="block">
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors leading-[1.12]">
                {article.title}
              </h2>
            </Link>

            {article.deck && (
              <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal">
                {article.deck}
              </p>
            )}

            {/* Author & Timestamp */}
            <div className="pt-4 flex items-center gap-3 border-t border-[var(--border-paper)]/60">
              {article.authorAvatar ? (
                <div className="relative w-9 h-9 overflow-hidden rounded-full border border-[var(--border-paper)] shrink-0">
                  <EditorialImage
                    src={article.authorAvatar}
                    alt={article.authorName}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center font-serif font-bold text-xs text-[var(--accent-clay)] shrink-0">
                  {article.authorName.charAt(0)}
                </div>
              )}
              <div className="text-xs">
                <p className="font-bold text-[var(--text-ink)]">{article.authorName}</p>
                <p className="text-[var(--text-faint)]">
                  {article.authorRole ? `${article.authorRole} • ` : ""}
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Lead Image */}
          {showImage && (
            <div className="lg:col-span-5 relative">
              <Link href={`/article/${article.slug}`} className="block overflow-hidden rounded-2xl shadow-md border border-[var(--border-paper)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-subtle)]">
                  <EditorialImage
                    src={article.featuredImage || ""}
                    alt={article.imageAlt || article.title}
                    fallbackCategory={article.category?.name || "Lead Story"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </Link>
              {article.imageCaption && (
                <p className="text-[11px] text-[var(--text-faint)] mt-2 italic">
                  {article.imageCaption}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.article>
    );
  }

  // TOP STORY VARIANT (Raised Clay Card)
  if (variant === "top-story") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        whileHover={{ y: -4 }}
        className={`group clay-card p-5 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[var(--shadow-clay-md)] ${className}`}
      >
        <div className="space-y-3">
          {showImage && (
            <Link href={`/article/${article.slug}`} className="block overflow-hidden rounded-xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bg-subtle)]">
                <EditorialImage
                  src={article.featuredImage || ""}
                  alt={article.imageAlt || article.title}
                  fallbackCategory={article.category?.name || "Top Story"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Link>
          )}

          <div className="flex items-center gap-2 pt-1">
            {article.category && (
              <Link href={`/category/${article.category.slug}`}>
                <Badge variant="category">{article.category.name}</Badge>
              </Link>
            )}
            <span className="text-[11px] text-[var(--text-faint)]">
              {article.readingTimeMinutes} min
            </span>
          </div>

          <Link href={`/article/${article.slug}`} className="block">
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors leading-snug">
              {article.title}
            </h3>
          </Link>

          {article.deck && (
            <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
              {article.deck}
            </p>
          )}
        </div>

        <div className="pt-4 mt-3 border-t border-[var(--border-paper)]/40 flex items-center justify-between text-xs text-[var(--text-faint)]">
          <span className="font-medium text-[var(--text-ink)]">{article.authorName}</span>
          <span>{formattedDate}</span>
        </div>
      </motion.article>
    );
  }

  // HORIZONTAL / ROW VARIANT
  if (variant === "horizontal") {
    return (
      <article className={`group py-4 border-b border-[var(--border-paper)] last:border-0 ${className}`}>
        <div className="flex gap-4 sm:gap-6 items-start">
          {showImage && (
            <Link href={`/article/${article.slug}`} className="shrink-0 block overflow-hidden rounded-xl">
              <div className="relative w-24 h-20 sm:w-36 sm:h-24 overflow-hidden bg-[var(--bg-subtle)]">
                <EditorialImage
                  src={article.featuredImage || ""}
                  alt={article.imageAlt || article.title}
                  fallbackCategory={article.category?.name || "Dispatch"}
                  fill
                  sizes="150px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          )}

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              {article.category && (
                <Link href={`/category/${article.category.slug}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-clay)] hover:underline">
                    {article.category.name}
                  </span>
                </Link>
              )}
              <span className="text-[11px] text-[var(--text-faint)]">• {formattedDate}</span>
            </div>

            <Link href={`/article/${article.slug}`} className="block">
              <h4 className="font-editorial text-base sm:text-lg font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors leading-snug line-clamp-2">
                {article.title}
              </h4>
            </Link>

            {article.deck && (
              <p className="text-xs text-[var(--text-muted)] line-clamp-2 hidden sm:block">
                {article.deck}
              </p>
            )}
          </div>
        </div>
      </article>
    );
  }

  // STANDARD GRID VARIANT (Editorial Paper feel with subtle hover elevation)
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
      className={`group flex flex-col justify-between space-y-3 p-3 rounded-2xl transition-all duration-200 hover:bg-[var(--bg-surface)]/60 ${className}`}
    >
      <div className="space-y-3">
        {showImage && (
          <Link href={`/article/${article.slug}`} className="block overflow-hidden rounded-xl border border-[var(--border-paper)]">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bg-subtle)]">
              <EditorialImage
                src={article.featuredImage || ""}
                alt={article.imageAlt || article.title}
                fallbackCategory={article.category?.name || "Article"}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </Link>
        )}

        <div className="flex items-center gap-2">
          {article.category && (
            <Link href={`/category/${article.category.slug}`}>
              <Badge variant="category">{article.category.name}</Badge>
            </Link>
          )}
          <span className="text-[11px] text-[var(--text-faint)]">
            {article.readingTimeMinutes} min
          </span>
        </div>

        <Link href={`/article/${article.slug}`} className="block">
          <h3 className="font-editorial text-lg sm:text-xl font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors leading-snug">
            {article.title}
          </h3>
        </Link>

        {article.deck && (
          <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
            {article.deck}
          </p>
        )}
      </div>

      <div className="pt-2 flex items-center justify-between text-xs text-[var(--text-faint)] border-t border-[var(--border-paper)]/40">
        <span>{article.authorName}</span>
        <span>{formattedDate}</span>
      </div>
    </motion.article>
  );
}
