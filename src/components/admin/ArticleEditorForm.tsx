"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Save,
  Eye,
  CheckCircle2,
  Calendar,
  Sparkles,
  History,
  ArrowLeft,
  X,
  ExternalLink,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { TipTapEditor } from "@/components/admin/TipTapEditor";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Article, ArticleRevision, ArticleStatus, Category, WeeklyEdition } from "@/lib/types";

interface ArticleEditorFormProps {
  initialArticle?: Article;
  categories: Category[];
  editions: WeeklyEdition[];
  revisions?: ArticleRevision[];
  isNew?: boolean;
}

export function ArticleEditorForm({
  initialArticle,
  categories,
  editions,
  revisions = [],
  isNew = false,
}: ArticleEditorFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Article>>({
    title: initialArticle?.title || "",
    slug: initialArticle?.slug || "",
    deck: initialArticle?.deck || "",
    summary: initialArticle?.summary || "",
    content: initialArticle?.content || "<p>Write your investigative report here...</p>",
    categoryId: initialArticle?.categoryId || categories[0]?.id || "",
    tags: initialArticle?.tags || ["Investigation", "Policy"],
    authorName: initialArticle?.authorName || "Eleanor Vance",
    authorRole: initialArticle?.authorRole || "Editor-in-Chief",
    featuredImage: initialArticle?.featuredImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&auto=format&fit=crop&q=80",
    imageCaption: initialArticle?.imageCaption || "",
    imageCredit: initialArticle?.imageCredit || "",
    imageAlt: initialArticle?.imageAlt || "",
    status: initialArticle?.status || "draft",
    isFeatured: initialArticle?.isFeatured || false,
    isLead: initialArticle?.isLead || false,
    isBreaking: initialArticle?.isBreaking || false,
    readingTimeMinutes: initialArticle?.readingTimeMinutes || 5,
    seoTitle: initialArticle?.seoTitle || "",
    seoDescription: initialArticle?.seoDescription || "",
    weeklyEditionId: initialArticle?.weeklyEditionId || editions[0]?.id || "",
    sources: initialArticle?.sources || [],
    aiGenerated: initialArticle?.aiGenerated || false,
    aiConfidence: initialArticle?.aiConfidence,
    aiClaims: initialArticle?.aiClaims || [],
    aiWarnings: initialArticle?.aiWarnings || [],
  });

  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showRevisionsDrawer, setShowRevisionsDrawer] = useState(false);

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: isNew && !prev.slug ? val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : prev.slug,
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags?.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags?.filter((t) => t !== tag) });
  };

  const handleSave = async (targetStatus?: ArticleStatus) => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const payload = {
        ...formData,
        status: targetStatus || formData.status,
      };

      const url = isNew ? "/api/articles" : `/api/articles/${initialArticle?.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setSaveSuccess(true);
        if (targetStatus === "published") {
          try {
            const confetti = (await import("canvas-confetti")).default;
            confetti({
              particleCount: 90,
              spread: 60,
              origin: { y: 0.65 },
              colors: ["#C96846", "#D6A84B", "#7E8C72", "#171716"],
            });
          } catch {
            // Confetti optional
          }
        }
        setTimeout(() => setSaveSuccess(false), 3500);
        if (isNew && data.article?.id) {
          router.push(`/admin/articles/${data.article.id}/edit`);
        } else {
          router.refresh();
        }
      } else {
        alert("Failed to save article. Please check required fields.");
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRestoreRevision = (rev: ArticleRevision) => {
    if (window.confirm("Restore this earlier version of title, deck, and content?")) {
      setFormData((prev) => ({
        ...prev,
        title: rev.title,
        deck: rev.deck,
        content: rev.content,
        summary: rev.summary,
      }));
      setShowRevisionsDrawer(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Save Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-paper)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/articles")}
            className="p-2 rounded-xl border border-[var(--border-paper)] hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] cursor-pointer"
            title="Back to articles"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--accent-clay)]">
              {isNew ? "New Draft Creation" : "Editorial Review Desk"}
            </span>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-ink)]">
              {formData.title ? formData.title.slice(0, 40) + "..." : "Untitled Article"}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {revisions.length > 0 && (
            <ClayButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowRevisionsDrawer(true)}
              leftIcon={<History className="w-4 h-4" />}
            >
              Revisions ({revisions.length})
            </ClayButton>
          )}

          <ClayButton
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setShowPreviewModal(true)}
            leftIcon={<Eye className="w-4 h-4" />}
          >
            Preview
          </ClayButton>

          <ClayButton
            type="button"
            variant="secondary"
            size="sm"
            isLoading={isSaving}
            onClick={() => handleSave("draft")}
          >
            Save Draft
          </ClayButton>

          <ClayButton
            type="button"
            variant="primary"
            size="sm"
            isLoading={isSaving}
            onClick={() => handleSave("published")}
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
          >
            Publish Article
          </ClayButton>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Article changes saved successfully to database!</span>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Columns: Headline, Deck, Rich TipTap Editor */}
        <div className="lg:col-span-8 space-y-6">
          {/* AI Banner if AI-generated */}
          {formData.aiGenerated && (
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-clay)]/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-[var(--accent-clay)]">
                <Sparkles className="w-4 h-4" />
                <span>AI-Assisted Synthesis Draft</span>
                {formData.aiConfidence && (
                  <span className="ml-auto font-mono text-[11px] bg-[var(--bg-subtle)] px-2 py-0.5 rounded-full border border-[var(--border-paper)]">
                    Confidence: {Math.round(formData.aiConfidence * 100)}%
                  </span>
                )}
              </div>
              {formData.aiWarnings && formData.aiWarnings.length > 0 && (
                <div className="text-[#B63A32] space-y-1">
                  <span className="font-semibold">Review Warnings:</span>
                  <ul className="list-disc list-inside space-y-0.5">
                    {formData.aiWarnings.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-ink)] uppercase tracking-wider">
              Headline
            </label>
            <input
              type="text"
              required
              placeholder="e.g. The Renaissance of Independent Micro-Manufacturing..."
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-2xl font-editorial font-bold text-xl sm:text-2xl text-[var(--text-ink)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-clay)] shadow-sm"
            />
          </div>

          {/* Subheadline / Deck */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-ink)] uppercase tracking-wider">
              Subheadline / Deck
            </label>
            <textarea
              rows={2}
              placeholder="A one or two sentence editorial deck summarizing the core thesis..."
              value={formData.deck}
              onChange={(e) => setFormData({ ...formData, deck: e.target.value })}
              className="w-full px-4 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-xl text-sm text-[var(--text-ink)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-clay)] shadow-sm"
            />
          </div>

          {/* TipTap Rich Editor */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-ink)] uppercase tracking-wider">
              Article Body & Layout
            </label>
            <TipTapEditor
              content={formData.content || ""}
              onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
            />
          </div>

          {/* Supporting Sources Table */}
          <div className="clay-card-static p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[var(--text-ink)] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-clay)]" />
                <span>Supporting Citations ({formData.sources?.length || 0})</span>
              </label>
            </div>

            {formData.sources && formData.sources.length > 0 ? (
              <div className="divide-y divide-[var(--border-paper)]/60 text-xs">
                {formData.sources.map((src, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between gap-4">
                    <div>
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline text-[var(--text-ink)]">
                        {src.name}
                      </a>
                      <p className="text-[var(--text-faint)] text-[10px]">{src.publisher}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[10px] font-mono">
                      {src.permission}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--text-muted)] italic">No external sources linked yet.</p>
            )}
          </div>
        </div>

        {/* Right 4 Columns: Metadata, Status, Category, Image, SEO */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status & Publishing Control */}
          <div className="clay-card-static p-5 space-y-4">
            <h3 className="font-serif font-bold text-sm text-[var(--text-ink)] uppercase tracking-wider border-b border-[var(--border-paper)] pb-2">
              Publishing Controls
            </h3>

            <CustomSelect
              label="Article Status"
              value={formData.status || "draft"}
              onChange={(val) => setFormData({ ...formData, status: val as ArticleStatus })}
              options={[
                { value: "draft", label: "Draft (Private)", badge: "Draft" },
                { value: "in_review", label: "In Review (Awaiting Approval)", badge: "Review" },
                { value: "approved", label: "Approved (Ready)", badge: "Ready" },
                { value: "scheduled", label: "Scheduled", badge: "Auto" },
                { value: "published", label: "Published (Live)", badge: "Live" },
                { value: "rejected", label: "Rejected", badge: "Denied" },
                { value: "archived", label: "Archived", badge: "Archive" },
              ]}
            />

            {/* Editorial Flags */}
            <div className="space-y-2 pt-2 border-t border-[var(--border-paper)]/60 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isLead}
                  onChange={(e) => setFormData({ ...formData, isLead: e.target.checked })}
                  className="rounded border-[var(--border-paper)] text-[var(--accent-clay)] focus:ring-[var(--accent-clay)]"
                />
                <span className="font-semibold text-[var(--text-ink)]">Lead Story (Hero Spotlight)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-[var(--border-paper)] text-[var(--accent-clay)] focus:ring-[var(--accent-clay)]"
                />
                <span className="font-medium text-[var(--text-ink)]">Top Story Feature</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isBreaking}
                  onChange={(e) => setFormData({ ...formData, isBreaking: e.target.checked })}
                  className="rounded border-[var(--border-paper)] text-[#B63A32]"
                />
                <span className="font-medium text-[#B63A32]">Breaking Dispatch Banner</span>
              </label>
            </div>
          </div>

          {/* Section & Edition Assignment */}
          <div className="clay-card-static p-5 space-y-4">
            <h3 className="font-serif font-bold text-sm text-[var(--text-ink)] uppercase tracking-wider border-b border-[var(--border-paper)] pb-2">
              Section & Edition
            </h3>

            <CustomSelect
              label="Editorial Section"
              value={formData.categoryId || (categories[0]?.id ?? "")}
              onChange={(val) => setFormData({ ...formData, categoryId: val })}
              options={categories.map((c) => ({
                value: c.id,
                label: c.name,
                description: c.description,
              }))}
            />

            <CustomSelect
              label="Assign to Weekly Folio"
              value={formData.weeklyEditionId || ""}
              onChange={(val) => setFormData({ ...formData, weeklyEditionId: val })}
              options={[
                { value: "", label: "None (Standalone Article)" },
                ...editions.map((ed) => ({
                  value: ed.id,
                  label: `Vol. ${ed.volumeNumber}, Issue ${ed.issueNumber} (${ed.title})`,
                  description: ed.theme,
                })),
              ]}
            />

            {/* Tags */}
            <div className="space-y-1.5 pt-2 border-t border-[var(--border-paper)]/60">
              <label className="text-xs font-semibold text-[var(--text-ink)]">Tags & Topics</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.tags?.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-paper)] rounded-full text-[11px]"
                  >
                    #{t}
                    <button type="button" onClick={() => handleRemoveTag(t)} className="hover:text-[#B63A32]">
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type tag and press Enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full px-3 py-1.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-lg text-xs text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)]"
              />
            </div>
          </div>

          {/* Featured Photography */}
          <div className="clay-card-static p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-paper)] pb-2">
              <h3 className="font-serif font-bold text-sm text-[var(--text-ink)] uppercase tracking-wider">
                Featured Photography
              </h3>
              <span className="text-[10px] text-[var(--accent-clay)] font-semibold uppercase tracking-wider">
                Preview & Fallback
              </span>
            </div>

            {/* Live Editorial Image Preview with Guaranteed Fallback */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--border-paper)] bg-[var(--bg-subtle)] shadow-inner">
              <EditorialImage
                src={formData.featuredImage || ""}
                alt={formData.imageAlt || formData.title || "Featured Preview"}
                fallbackCategory={categories.find((c) => c.id === formData.categoryId)?.name || "Editorial"}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>

            {/* Quick Unsplash Editorial Presets */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-[var(--text-faint)] uppercase tracking-wider block">
                Quick Editorial Presets
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "⚡ Energy & Grid", url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1400&auto=format&fit=crop&q=80" },
                  { label: "🏛️ Architecture", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop&q=80" },
                  { label: "🔬 Deep Tech", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&auto=format&fit=crop&q=80" },
                  { label: "🌐 Global Affairs", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&auto=format&fit=crop&q=80" },
                  { label: "📖 Literature", url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1400&auto=format&fit=crop&q=80" },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, featuredImage: preset.url })}
                    className="px-2 py-1 rounded-lg border border-[var(--border-paper)] bg-[var(--bg-paper)] hover:border-[var(--accent-clay)] hover:text-[var(--accent-clay)] text-[10px] font-medium transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-ink)]">Image URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={formData.featuredImage || ""}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                className="w-full px-3 py-1.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-lg text-xs text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-ink)]">Image Caption</label>
              <input
                type="text"
                placeholder="e.g. Technicians calibrate a titanium valve..."
                value={formData.imageCaption}
                onChange={(e) => setFormData({ ...formData, imageCaption: e.target.value })}
                className="w-full px-3 py-1.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-lg text-xs text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-ink)]">Credit / Attribution</label>
              <input
                type="text"
                placeholder="e.g. Photo by Marco Bellini / INK"
                value={formData.imageCredit}
                onChange={(e) => setFormData({ ...formData, imageCredit: e.target.value })}
                className="w-full px-3 py-1.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-lg text-xs text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)]"
              />
            </div>
          </div>

          {/* SEO & Slug */}
          <div className="clay-card-static p-5 space-y-4">
            <h3 className="font-serif font-bold text-sm text-[var(--text-ink)] uppercase tracking-wider border-b border-[var(--border-paper)] pb-2">
              SEO & Metadata
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-ink)]">URL Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-1.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-lg text-xs font-mono text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-ink)]">SEO Title</label>
              <input
                type="text"
                placeholder="Leave blank to use headline"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                className="w-full px-3 py-1.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-lg text-xs text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-ink)]">SEO Description</label>
              <textarea
                rows={2}
                placeholder="Leave blank to use deck"
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                className="w-full px-3 py-1.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-lg text-xs text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-4xl max-h-[90vh] bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-3xl shadow-2xl overflow-y-auto p-6 sm:p-10 space-y-8 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-paper)]">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-clay)]">
                Live Article Preview
              </span>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1.5 rounded-lg border border-[var(--border-paper)] hover:bg-[var(--bg-subtle)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[var(--text-ink)] leading-tight">
                {formData.title || "Untitled Article"}
              </h1>
              {formData.deck && (
                <p className="text-lg text-[var(--text-muted)] font-serif italic">{formData.deck}</p>
              )}
              {formData.featuredImage && (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                  <Image src={formData.featuredImage} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <div
                className="prose-ink max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.content || "" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Revisions History Drawer */}
      {showRevisionsDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[var(--bg-surface)] h-full p-6 border-l border-[var(--border-paper)] shadow-2xl overflow-y-auto space-y-6 animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-paper)]">
              <h3 className="font-editorial text-xl font-bold flex items-center gap-2">
                <History className="w-5 h-5 text-[var(--accent-clay)]" />
                <span>Revision History</span>
              </h3>
              <button
                onClick={() => setShowRevisionsDrawer(false)}
                className="p-1.5 rounded-lg border border-[var(--border-paper)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {revisions.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-[var(--bg-paper)] border border-[var(--border-paper)] space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--text-faint)]">
                    <span>{new Date(rev.createdAt).toLocaleString()}</span>
                    <span className="font-semibold text-[var(--text-ink)]">{rev.editedBy}</span>
                  </div>
                  <p className="font-bold text-sm text-[var(--text-ink)] line-clamp-1">{rev.title}</p>
                  {rev.note && <p className="text-[11px] text-[var(--accent-clay)] font-mono">{rev.note}</p>}
                  <ClayButton
                    size="sm"
                    variant="secondary"
                    onClick={() => handleRestoreRevision(rev)}
                    className="w-full mt-2"
                  >
                    Restore This Version
                  </ClayButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
