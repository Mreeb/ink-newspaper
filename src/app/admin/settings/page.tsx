"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  Sun,
  Moon,
  Laptop,
  Sparkles,
  Layout,
} from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { useTheme, ThemeMode } from "@/components/providers/ThemeProvider";
import { SiteSettings, Article, WeeklyEdition } from "@/lib/types";

export default function AdminSettingsPage() {
  const { theme, setTheme } = useTheme();

  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "INK Newspaper",
    tagline: "The Weekly Editorial of Distinction",
    currentEditionId: "",
    leadArticleId: "",
    topStoryIds: [],
    breakingNewsText: "",
    breakingNewsActive: false,
    footerQuote: "Molded from truth, committed to clarity.",
  });

  const [articles, setArticles] = useState<Article[]>([]);
  const [editions, setEditions] = useState<WeeklyEdition[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch(console.error);

    fetch("/api/articles?status=published")
      .then((res) => res.json())
      .then((data) => setArticles(data.articles || []))
      .catch(console.error);

    fetch("/api/admin/editions")
      .then((res) => res.json())
      .then((data) => setEditions(data.editions || []))
      .catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Save settings failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeSelect = (mode: ThemeMode) => {
    setTheme(mode);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
      <div className="pb-4 border-b border-[var(--border-paper)]">
        <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent-clay)] flex items-center gap-1">
          <Settings className="w-3.5 h-3.5" />
          <span>System Configuration</span>
        </span>
        <h1 className="font-editorial text-3xl font-bold text-[var(--text-ink)]">
          Newsroom & Appearance Settings
        </h1>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Site settings and appearance updated live across all pages.</span>
        </div>
      )}

      {/* Theme & Appearance Customizer */}
      <div className="clay-card-static p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-paper)] pb-3">
          <div>
            <h3 className="font-editorial text-xl font-bold text-[var(--text-ink)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-clay)]" />
              <span>Theme & Reading Mode</span>
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Control the publication&apos;s default color palette and reader appearance.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[var(--bg-subtle)] text-xs font-mono font-bold text-[var(--accent-clay)] uppercase">
            Active: {theme}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Light Mode Option */}
          <button
            type="button"
            onClick={() => handleThemeSelect("light")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
              theme === "light"
                ? "bg-[#FFFBF4] border-[var(--accent-clay)] ring-2 ring-[var(--accent-clay)]/20 shadow-md text-[#171716]"
                : "bg-[var(--bg-surface)] border-[var(--border-paper)] hover:border-[var(--accent-clay)]/50 text-[var(--text-muted)]"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-amber-100/60 text-amber-800 border border-amber-200">
                <Sun className="w-4 h-4" />
              </div>
              {theme === "light" && <CheckCircle2 className="w-4 h-4 text-[var(--accent-clay)]" />}
            </div>
            <p className="font-bold text-sm text-[var(--text-ink)]">Warm Paper (Light)</p>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">
              Clay cream paper surfaces (#F4EFE6) with rich ink typography.
            </p>
          </button>

          {/* Dark Mode Option */}
          <button
            type="button"
            onClick={() => handleThemeSelect("dark")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
              theme === "dark"
                ? "bg-[#1A1D1F] border-[var(--accent-clay)] ring-2 ring-[var(--accent-clay)]/20 shadow-md text-[#F5EFE6]"
                : "bg-[var(--bg-surface)] border-[var(--border-paper)] hover:border-[var(--accent-clay)]/50 text-[var(--text-muted)]"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
                <Moon className="w-4 h-4" />
              </div>
              {theme === "dark" && <CheckCircle2 className="w-4 h-4 text-[var(--accent-clay)]" />}
            </div>
            <p className="font-bold text-sm text-[var(--text-ink)]">Sleek Slate (Dark)</p>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">
              Deep editorial slate (#111315) with high contrast ivory readability.
            </p>
          </button>

          {/* System Mode Option */}
          <button
            type="button"
            onClick={() => handleThemeSelect("system")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
              theme === "system"
                ? "bg-[var(--bg-surface)] border-[var(--accent-clay)] ring-2 ring-[var(--accent-clay)]/20 shadow-md"
                : "bg-[var(--bg-surface)] border-[var(--border-paper)] hover:border-[var(--accent-clay)]/50 text-[var(--text-muted)]"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-ink)] border border-[var(--border-paper)]">
                <Laptop className="w-4 h-4" />
              </div>
              {theme === "system" && <CheckCircle2 className="w-4 h-4 text-[var(--accent-clay)]" />}
            </div>
            <p className="font-bold text-sm text-[var(--text-ink)]">System Preference</p>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">
              Automatically adapts to reader&apos;s OS light/dark schedule.
            </p>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="clay-card-static p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-paper)]">
          <h3 className="font-editorial text-xl font-bold text-[var(--text-ink)] flex items-center gap-2">
            <Layout className="w-4 h-4 text-[var(--accent-clay)]" />
            <span>Masthead & Curation</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-ink)]">
              Publication Title
            </label>
            <input
              type="text"
              required
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-xl text-sm font-editorial font-bold text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-ink)]">
              Masthead Tagline
            </label>
            <input
              type="text"
              required
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-4 py-2.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-xl text-sm text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)]"
            />
          </div>
        </div>

        {/* Lead Article & Active Edition Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <CustomSelect
            label="Featured Lead Story (Homepage Spotlight)"
            value={settings.leadArticleId || ""}
            onChange={(val) => setSettings({ ...settings, leadArticleId: val })}
            options={[
              { value: "", label: "Automatic (Latest Lead Flag)" },
              ...articles.map((a) => ({
                value: a.id,
                label: a.title,
                badge: a.category?.name,
              })),
            ]}
          />

          <CustomSelect
            label="Active Weekly Edition Folio"
            value={settings.currentEditionId || ""}
            onChange={(val) => setSettings({ ...settings, currentEditionId: val })}
            options={[
              { value: "", label: "Automatic (Current Flagged Folio)" },
              ...editions.map((e) => ({
                value: e.id,
                label: `Vol. ${e.volumeNumber}, Issue ${e.issueNumber} (${e.title})`,
                badge: e.isCurrent ? "Active" : undefined,
              })),
            ]}
          />
        </div>

        {/* Breaking News Dispatch Banner */}
        <div className="p-5 rounded-2xl bg-[var(--bg-paper)] border border-[var(--border-paper)] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#B63A32]">
              Breaking News Global Ticker
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={settings.breakingNewsActive}
                onChange={(e) => setSettings({ ...settings, breakingNewsActive: e.target.checked })}
                className="rounded border-[var(--border-paper)] text-[#B63A32]"
              />
              <span className="font-semibold text-[var(--text-ink)]">Enable Banner on Homepage</span>
            </label>
          </div>

          <input
            type="text"
            placeholder="e.g. BREAKING: Geneva treaty on autonomous orbital space debris signed by 38 nations."
            value={settings.breakingNewsText || ""}
            onChange={(e) => setSettings({ ...settings, breakingNewsText: e.target.value })}
            className="w-full px-3 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-xl text-xs text-[var(--text-ink)] outline-none focus:border-[#B63A32]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-ink)]">
            Colophon / Footer Quote
          </label>
          <input
            type="text"
            value={settings.footerQuote}
            onChange={(e) => setSettings({ ...settings, footerQuote: e.target.value })}
            className="w-full px-4 py-2.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-xl text-xs font-serif italic text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)]"
          />
        </div>

        <div className="pt-4 border-t border-[var(--border-paper)] flex justify-end">
          <ClayButton
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Masthead Settings
          </ClayButton>
        </div>
      </form>
    </div>
  );
}
