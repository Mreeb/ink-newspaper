import React from "react";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { db } from "@/lib/services/db";
import { ArticleCard } from "@/components/public/ArticleCard";
import { DexterSpotlight } from "@/components/public/DexterSpotlight";
import { WeeklyEditionShowcase } from "@/components/public/WeeklyEditionShowcase";
import { NewsletterBox } from "@/components/public/NewsletterBox";
import { EditorialDivider } from "@/components/ui/Badge";

export const revalidate = 60; // ISR revalidation every 60s

export default function HomePage() {
  const settings = db.getSiteSettings();
  const allArticles = db.getArticles({ status: "published" });

  // 1. Dominant Lead Story
  const leadArticle =
    allArticles.find((a) => a.id === settings.leadArticleId || a.isLead) ||
    allArticles[0];

  // 2. Top Stories (2-4 supporting prominent stories)
  const remainingArticles = allArticles.filter((a) => a.id !== leadArticle?.id);
  const topStories = remainingArticles.slice(0, 3);

  // 3. Dexter Column
  const latestDexterColumn = db.getDexterColumns({ status: "published", limit: 1 })[0];

  // 4. Current Weekly Edition
  const currentEdition = db.getCurrentWeeklyEdition();
  const editionArticles = currentEdition
    ? db.getArticles({ editionId: currentEdition.id, status: "published" })
    : [];

  // 5. Category-Specific Sections
  const techArticles = db.getArticles({ categorySlug: "technology", limit: 3 });
  const worldArticles = db.getArticles({ categorySlug: "world", limit: 3 });
  const cultureArticles = db.getArticles({ categorySlug: "culture", limit: 3 });
  const businessArticles = db.getArticles({ categorySlug: "business", limit: 3 });
  const spiritualityArticles = db.getArticles({ categorySlug: "spirituality", limit: 3 });

  // 6. Breaking News
  const breakingArticle = allArticles.find((a) => a.isBreaking);

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Breaking News Banner */}
      {(settings.breakingNewsActive || breakingArticle) && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#B63A32]/10 border border-[#B63A32]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-md bg-[#B63A32] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 animate-pulse">
              <Flame className="w-3 h-3" />
              <span>Breaking Dispatch</span>
            </span>
            <p className="text-xs sm:text-sm font-semibold text-[var(--text-ink)]">
              {breakingArticle?.title || settings.breakingNewsText}
            </p>
          </div>
          {breakingArticle && (
            <Link
              href={`/article/${breakingArticle.slug}`}
              className="text-xs font-bold text-[#B63A32] hover:underline whitespace-nowrap flex items-center gap-1"
            >
              <span>Read Coverage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}

      {/* SECTION 1: LEAD STORY & TOP STORIES HERO GRID */}
      <section className="space-y-8">
        {/* Dominant Lead Story */}
        {leadArticle && <ArticleCard article={leadArticle} variant="lead" />}

        {/* Supporting Top Stories Grid */}
        {topStories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {topStories.map((story) => (
              <ArticleCard key={story.id} article={story} variant="top-story" />
            ))}
          </div>
        )}
      </section>

      <EditorialDivider />

      {/* SECTION 2: DEXTER'S VANTAGE POINT SPOTLIGHT */}
      {latestDexterColumn && <DexterSpotlight column={latestDexterColumn} />}

      {/* SECTION 3: EDITORIAL TWO-COLUMN MAGAZINE GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: World Affairs & Technology Features (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* World Affairs Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-paper)]">
              <h3 className="font-editorial text-2xl font-bold text-[var(--text-ink)] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C96846]" />
                <span>World Affairs & Treaties</span>
              </h3>
              <Link
                href="/category/world"
                className="text-xs font-semibold text-[var(--accent-clay)] hover:underline flex items-center gap-1"
              >
                <span>All World News</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {worldArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="grid" />
              ))}
            </div>
          </div>

          {/* Applied Technology Section */}
          <div className="space-y-4 pt-6 border-t border-[var(--border-paper)]">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-paper)]">
              <h3 className="font-editorial text-2xl font-bold text-[var(--text-ink)] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#546E7A]" />
                <span>Applied Technology & Systems</span>
              </h3>
              <Link
                href="/category/technology"
                className="text-xs font-semibold text-[var(--accent-clay)] hover:underline flex items-center gap-1"
              >
                <span>All Technology</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {techArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="grid" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Latest Wire / Sidebar Analysis (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="clay-card-static p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-paper)]">
              <h4 className="font-serif font-bold text-lg text-[var(--text-ink)] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent-clay)]" />
                <span>The Latest Wire</span>
              </h4>
              <span className="text-[10px] uppercase font-bold text-[var(--text-faint)] tracking-wider">
                Updated Hourly
              </span>
            </div>

            <div className="divide-y divide-[var(--border-paper)]">
              {remainingArticles.slice(3, 8).map((art) => (
                <ArticleCard key={art.id} article={art} variant="horizontal" showImage={false} />
              ))}
            </div>
          </div>

          {/* Spirituality & Philosophy Teaser */}
          {spiritualityArticles.length > 0 && (
            <div className="p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-paper)] space-y-3">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--accent-sage)]">
                Contemplative Essays
              </span>
              <h4 className="font-editorial text-xl font-bold text-[var(--text-ink)] leading-snug">
                {spiritualityArticles[0].title}
              </h4>
              <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                {spiritualityArticles[0].deck}
              </p>
              <Link
                href={`/article/${spiritualityArticles[0].slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[var(--accent-clay)] hover:underline pt-1"
              >
                <span>Read Essay</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </aside>
      </section>

      {/* SECTION 4: CURRENT WEEKLY EDITION SHOWCASE */}
      {currentEdition && (
        <WeeklyEditionShowcase
          edition={currentEdition}
          articles={editionArticles.length > 0 ? editionArticles : allArticles.slice(0, 6)}
        />
      )}

      {/* SECTION 5: CULTURE & BUSINESS HIGHLIGHTS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-paper)]">
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-ink)]">
            Culture, Macroeconomics & Craft
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...cultureArticles, ...businessArticles].slice(0, 4).map((art) => (
            <ArticleCard key={art.id} article={art} variant="grid" />
          ))}
        </div>
      </section>

      {/* SECTION 6: NEWSLETTER SUBSCRIPTION */}
      <NewsletterBox />
    </div>
  );
}
