"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Feather,
  Upload,
  Eye,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowLeft,
  X,
  FileText,
  Quote,
} from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { TipTapEditor } from "@/components/admin/TipTapEditor";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { DexterColumn, WeeklyEdition, ArticleStatus } from "@/lib/types";

interface DexterColumnFormProps {
  initialColumn?: DexterColumn;
  editions: WeeklyEdition[];
  isNew?: boolean;
}

export function DexterColumnForm({
  initialColumn,
  editions,
  isNew = false,
}: DexterColumnFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<DexterColumn>>({
    title: initialColumn?.title || "",
    slug: initialColumn?.slug || "",
    subtitle: initialColumn?.subtitle || "",
    excerpt: initialColumn?.excerpt || "",
    signatureQuote: initialColumn?.signatureQuote || "",
    content: initialColumn?.content || "<p class=\"drop-cap\">Begin Dexter's philosophical dispatch here...</p>",
    featuredImage: initialColumn?.featuredImage || "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80",
    editionId: initialColumn?.editionId || editions[0]?.id || "",
    editionName: initialColumn?.editionName || editions[0]?.title || "The Weekly Folio",
    status: initialColumn?.status || "published",
    readingTimeMinutes: initialColumn?.readingTimeMinutes || 6,
    tags: initialColumn?.tags || ["Philosophy", "Cognition", "Analog Living"],
    authorBio: initialColumn?.authorBio || "Dexter is the Senior Columnist and Philosophical Editor of INK Newspaper.",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isConvertingDocx, setIsConvertingDocx] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleDocxUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsConvertingDocx(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload/docx", {
        method: "POST",
        body: uploadData,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          content: data.html,
          title: prev.title || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        }));
        alert("Word document converted directly into TipTap editable draft!");
      } else {
        alert("Failed to convert .docx file.");
      }
    } catch (err) {
      console.error("Docx upload failed:", err);
      alert("Error parsing Word file.");
    } finally {
      setIsConvertingDocx(false);
    }
  };

  const handleSave = async (targetStatus?: ArticleStatus) => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const selectedEdition = editions.find((e) => e.id === formData.editionId);
      const payload = {
        ...formData,
        status: targetStatus || formData.status,
        editionName: selectedEdition ? `Vol. ${selectedEdition.volumeNumber}, Issue ${selectedEdition.issueNumber}` : formData.editionName,
        slug: formData.slug || formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      };

      const url = isNew ? "/api/dexter" : `/api/dexter/${initialColumn?.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
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
        if (isNew) {
          router.push("/admin/dexter");
        } else {
          router.refresh();
        }
      } else {
        alert("Failed to save Dexter's column.");
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-paper)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/dexter")}
            className="p-2 rounded-xl border border-[var(--border-paper)] hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--accent-clay)] flex items-center gap-1">
              <Feather className="w-3 h-3" />
              <span>Dexter&apos;s Column Studio</span>
            </span>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--text-ink)]">
              {formData.title ? formData.title.slice(0, 35) + "..." : "New Weekly Column"}
            </h1>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Docx Importer */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleDocxUpload}
            accept=".docx"
            className="hidden"
          />
          <ClayButton
            type="button"
            variant="secondary"
            size="sm"
            isLoading={isConvertingDocx}
            onClick={() => fileInputRef.current?.click()}
            leftIcon={<Upload className="w-4 h-4 text-[var(--accent-clay)]" />}
          >
            Import .docx
          </ClayButton>

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
            variant="primary"
            size="sm"
            isLoading={isSaving}
            onClick={() => handleSave("published")}
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
          >
            Publish Column
          </ClayButton>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Dexter&apos;s column saved successfully!</span>
        </div>
      )}

      {/* Main Form Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Title, Subtitle, Signature Quote, TipTap Editor */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-ink)] uppercase tracking-wider">
              Column Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. The Quiet Revolution of Analog Mindsets in an Accelerated Age"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-2xl font-editorial font-bold text-xl sm:text-2xl text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)] shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-ink)] uppercase tracking-wider">
              Subtitle / Thesis
            </label>
            <textarea
              rows={2}
              placeholder="Why the most lucid strategic thinkers of our time are abandoning hyper-connectivity..."
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-xl text-sm font-serif italic text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)] shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-ink)] uppercase tracking-wider flex items-center gap-1">
              <Quote className="w-3.5 h-3.5 text-[var(--accent-clay)]" />
              <span>Signature Quote Detail</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Silence is not the absence of thought; it is the clean slate..."
              value={formData.signatureQuote}
              onChange={(e) => setFormData({ ...formData, signatureQuote: e.target.value })}
              className="w-full px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-xl text-xs text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)] shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-ink)] uppercase tracking-wider">
              Column Essay Body (TipTap Editor)
            </label>
            <TipTapEditor
              content={formData.content || ""}
              onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
              placeholder="Write or paste Dexter's weekly philosophical essay..."
            />
          </div>
        </div>

        {/* Right Column: Edition Assignment, Artwork, Status */}
        <div className="lg:col-span-4 space-y-6">
          <div className="clay-card-static p-5 space-y-4">
            <h3 className="font-serif font-bold text-sm text-[var(--text-ink)] uppercase tracking-wider border-b border-[var(--border-paper)] pb-2">
              Edition & Status
            </h3>

            <CustomSelect
              label="Assign to Weekly Folio"
              value={formData.editionId || (editions[0]?.id ?? "")}
              onChange={(val) => setFormData({ ...formData, editionId: val })}
              options={editions.map((ed) => ({
                value: ed.id,
                label: `Vol. ${ed.volumeNumber}, Issue ${ed.issueNumber} (${ed.title})`,
                description: ed.theme,
              }))}
            />

            <CustomSelect
              label="Publication Status"
              value={formData.status || "published"}
              onChange={(val) => setFormData({ ...formData, status: val as ArticleStatus })}
              options={[
                { value: "published", label: "Published (Live)", badge: "Live" },
                { value: "draft", label: "Draft", badge: "Draft" },
                { value: "scheduled", label: "Scheduled", badge: "Auto" },
                { value: "archived", label: "Archived", badge: "Archive" },
              ]}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-ink)]">Reading Time (Minutes)</label>
              <input
                type="number"
                min={1}
                max={30}
                value={formData.readingTimeMinutes}
                onChange={(e) => setFormData({ ...formData, readingTimeMinutes: parseInt(e.target.value) || 5 })}
                className="w-full px-3 py-1.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-lg text-xs text-[var(--text-ink)]"
              />
            </div>
          </div>

          {/* Featured Column Image */}
          <div className="clay-card-static p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-paper)] pb-2">
              <h3 className="font-serif font-bold text-sm text-[var(--text-ink)] uppercase tracking-wider">
                Featured Artwork
              </h3>
              <span className="text-[10px] text-[var(--accent-clay)] font-semibold uppercase tracking-wider">
                Dexter&apos;s Seal
              </span>
            </div>

            {/* Live Preview with Guaranteed Editorial Fallback */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--border-paper)] bg-[var(--bg-subtle)] shadow-inner">
              <EditorialImage
                src={formData.featuredImage || ""}
                alt={formData.title || "Dexter Column Artwork"}
                fallbackCategory="Dexter's Vantage"
                fallbackIcon="feather"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>

            {/* Quick Presets for Dexter Column */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-[var(--text-faint)] uppercase tracking-wider block">
                Dexter Atmosphere Presets
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "📜 Vintage Desk", url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1400&auto=format&fit=crop&q=80" },
                  { label: "🏛️ Ancient Cloister", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1400&auto=format&fit=crop&q=80" },
                  { label: "🗞️ News Desk", url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&auto=format&fit=crop&q=80" },
                  { label: "🖋️ Letterpress", url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1400&auto=format&fit=crop&q=80" },
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
          </div>

          {/* Short Excerpt */}
          <div className="clay-card-static p-5 space-y-4">
            <h3 className="font-serif font-bold text-sm text-[var(--text-ink)] uppercase tracking-wider border-b border-[var(--border-paper)] pb-2">
              Archive Excerpt
            </h3>
            <textarea
              rows={3}
              placeholder="Short summary for archives and homepage spotlight..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-3 py-2 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-xl text-xs text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)]"
            />
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-3xl max-h-[90vh] bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-3xl shadow-2xl overflow-y-auto p-6 sm:p-10 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-paper)]">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-clay)]">
                Dexter Column Preview
              </span>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1.5 rounded-lg border border-[var(--border-paper)] hover:bg-[var(--bg-subtle)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[var(--text-ink)]">
                {formData.title || "Untitled Column"}
              </h1>
              {formData.subtitle && (
                <p className="text-base text-[var(--text-muted)] font-serif italic">{formData.subtitle}</p>
              )}
              {formData.signatureQuote && (
                <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border-l-4 border-[var(--accent-clay)]">
                  <p className="font-serif italic text-sm text-[var(--text-ink)]">
                    &ldquo;{formData.signatureQuote}&rdquo;
                  </p>
                </div>
              )}
              <div
                className="prose-ink max-w-none pt-4"
                dangerouslySetInnerHTML={{ __html: formData.content || "" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
