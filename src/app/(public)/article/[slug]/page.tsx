import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, ExternalLink, Tag } from "lucide-react";
import { db } from "@/lib/services/db";
import { Badge, EditorialDivider } from "@/components/ui/Badge";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { ShareControls } from "@/components/public/ShareControls";
import { ArticleCard } from "@/components/public/ArticleCard";
import { EditorialImage } from "@/components/ui/EditorialImage";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = db.getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.deck || article.summary,
    authors: [{ name: article.authorName }],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.deck || article.summary,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.authorName],
      tags: article.tags,
      images: [
        {
          url: article.featuredImage,
          alt: article.imageAlt || article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.deck || article.summary,
      images: [article.featuredImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = db.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = db.getArticles({ status: "published" });
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Related Stories (same category, excluding current)
  const relatedArticles = allArticles
    .filter((a) => a.categoryId === article.categoryId && a.id !== article.id)
    .slice(0, 3);

  const formattedPubDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const formattedUpdatedDate = article.updatedAt
    ? new Date(article.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/article/${article.slug}`;

  // JSON-LD NewsArticle Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.deck || article.summary,
    image: [article.featuredImage],
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    author: [
      {
        "@type": "Person",
        name: article.authorName,
        jobTitle: article.authorRole || "Journalist",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "INK Newspaper",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <ReadingProgress />

      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300">
        {/* Article Header & Navigation */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link
              href={article.category ? `/category/${article.category.slug}` : "/"}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-clay)] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to {article.category?.name || "Front Page"}</span>
            </Link>

            {article.weeklyEdition && (
              <Link
                href={`/editions/${article.weeklyEdition.id}`}
                className="text-xs font-serif italic text-[var(--text-muted)] hover:text-[var(--accent-clay)]"
              >
                Vol. {article.weeklyEdition.volumeNumber}, Issue {article.weeklyEdition.issueNumber}
              </Link>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--accent-clay)]/10 text-[var(--accent-clay)] border border-[var(--accent-clay)]/20 text-[11px] font-medium">
                <Sparkles className="w-3 h-3" />
                <span>AI-Assisted Investigation</span>
              </span>
            )}
            <span className="text-xs text-[var(--text-faint)] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTimeMinutes} min read
            </span>
          </div>

          {/* Headline & Deck */}
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-ink)] leading-[1.12]">
            {article.title}
          </h1>

          {article.deck && (
            <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-muted)] leading-relaxed font-normal">
              {article.deck}
            </p>
          )}

          {/* Author Byline, Dates & Share Controls */}
          <div className="pt-6 border-t border-[var(--border-paper)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {article.authorAvatar ? (
                <Image
                  src={article.authorAvatar}
                  alt={article.authorName}
                  width={44}
                  height={44}
                  className="rounded-full object-cover border border-[var(--border-paper)]"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center font-serif font-bold text-sm text-[var(--accent-clay)]">
                  {article.authorName.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-bold text-sm text-[var(--text-ink)]">{article.authorName}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-faint)]">
                  <span>{article.authorRole || "Staff Correspondent"}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formattedPubDate}
                  </span>
                  {article.updatedAt !== article.createdAt && (
                    <>
                      <span>•</span>
                      <span className="italic">Updated {formattedUpdatedDate}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <ShareControls title={article.title} url={canonicalUrl} />
          </div>
        </div>

        {/* Featured Image Section */}
        {article.featuredImage && (
          <div className="space-y-2">
            <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden rounded-3xl border border-[var(--border-paper)] shadow-xl bg-[var(--bg-subtle)]">
              <EditorialImage
                src={article.featuredImage || ""}
                alt={article.imageAlt || article.title}
                fallbackCategory={article.category?.name || "Feature"}
                fill
                sizes="(max-width: 1200px) 100vw, 900px"
                priority
                className="object-cover"
              />
            </div>
            {(article.imageCaption || article.imageCredit) && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[var(--text-faint)] px-2 pt-1 gap-1">
                {article.imageCaption && <span className="italic">{article.imageCaption}</span>}
                {article.imageCredit && <span className="font-medium">{article.imageCredit}</span>}
              </div>
            )}
          </div>
        )}

        {/* Article Body Content */}
        <div className="max-w-3xl mx-auto">
          {/* AI Disclosure Banner (if AI-assisted) */}
          {article.aiGenerated && (
            <div className="my-8 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-paper)] shadow-sm space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-[var(--accent-clay)]">
                <ShieldCheck className="w-4 h-4" />
                <span>Editorial Transparency & AI Assistance Disclosure</span>
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed">
                This report was synthesized using OpenAI structured analysis from verified source materials and underwent human editorial review before publication.
                {article.aiConfidence && ` Verified confidence rating: ${Math.round(article.aiConfidence * 100)}%.`}
              </p>
              {article.aiClaims && article.aiClaims.length > 0 && (
                <div className="pt-2 border-t border-[var(--border-paper)]/60">
                  <span className="font-semibold text-[var(--text-ink)]">Key Factual Claims Verified:</span>
                  <ul className="list-disc list-inside text-[var(--text-muted)] mt-1 space-y-0.5">
                    {article.aiClaims.map((claim, idx) => (
                      <li key={idx}>{claim}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Render Rich Article Body */}
          <div
            className="prose-ink"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-10 border-t border-[var(--border-paper)] flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Filed under:</span>
              </span>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-paper)] rounded-full text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent-clay)] hover:border-[var(--accent-clay)] transition-colors shadow-sm"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Supporting Source Citations */}
          {article.sources && article.sources.length > 0 && (
            <div className="mt-12 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-paper)] shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-sm text-[var(--text-ink)] uppercase tracking-wider flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[var(--accent-clay)]" />
                <span>Supporting Sources & Citations</span>
              </h3>
              <ul className="divide-y divide-[var(--border-paper)]/60 text-xs">
                {article.sources.map((src) => (
                  <li key={src.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[var(--text-ink)] hover:text-[var(--accent-clay)] transition-colors hover:underline"
                      >
                        {src.name}
                      </a>
                      <p className="text-[var(--text-faint)]">
                        {src.publisher} {src.publishedAt ? `• ${src.publishedAt}` : ""}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-paper)] text-[10px] text-[var(--text-muted)] font-mono whitespace-nowrap">
                      {src.permission}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <EditorialDivider />

        {/* Previous / Next Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {prevArticle ? (
            <Link
              href={`/article/${prevArticle.slug}`}
              className="p-5 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-paper)] transition-all space-y-1 text-left shadow-[var(--shadow-clay-sm)] group"
            >
              <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-faint)] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3 text-[var(--accent-clay)]" />
                <span>Previous Story</span>
              </span>
              <h4 className="font-editorial text-sm font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors line-clamp-2">
                {prevArticle.title}
              </h4>
            </Link>
          ) : (
            <div />
          )}

          {nextArticle && (
            <Link
              href={`/article/${nextArticle.slug}`}
              className="p-5 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-paper)] transition-all space-y-1 text-right shadow-[var(--shadow-clay-sm)] group"
            >
              <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-faint)] flex items-center justify-end gap-1">
                <span>Next Story</span>
                <ArrowRight className="w-3 h-3 text-[var(--accent-clay)]" />
              </span>
              <h4 className="font-editorial text-sm font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors line-clamp-2">
                {nextArticle.title}
              </h4>
            </Link>
          )}
        </div>

        {/* Related Stories Grid */}
        {relatedArticles.length > 0 && (
          <section className="pt-10 border-t border-[var(--border-paper)] space-y-6">
            <h3 className="font-editorial text-2xl font-bold text-[var(--text-ink)]">
              Related Investigative Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="top-story" />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
