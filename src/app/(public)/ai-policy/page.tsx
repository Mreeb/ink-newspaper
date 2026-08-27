import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Sparkles, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Transparency & Usage Policy — INK Newspaper",
  description: "Our binding commitment to transparency, human editorial oversight, and ethical AI utilization at INK Newspaper.",
};

export default function AiPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-clay)] hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Front Page</span>
      </Link>

      <div className="clay-card-static p-8 sm:p-12 space-y-8">
        <div className="space-y-3 pb-6 border-b border-[var(--border-paper)]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[var(--accent-clay)]">
            <Sparkles className="w-4 h-4" />
            <span>Charter of Algorithmic Transparency</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[var(--text-ink)]">
            AI Usage & Editorial Integrity Policy
          </h1>
          <p className="font-serif italic text-base text-[var(--text-muted)]">
            Adopted by the INK Editorial Board. Last revised August 2026.
          </p>
        </div>

        <div className="space-y-6 text-sm text-[var(--text-ink)] leading-relaxed">
          <p className="text-base text-[var(--text-muted)] leading-relaxed">
            At INK Newspaper, we recognize the transformative power of artificial intelligence in synthesis, cross-lingual monitoring, and document analysis. However, we hold that journalism is fundamentally a sacred human responsibility. This policy articulates our non-negotiable boundaries.
          </p>

          <div className="space-y-4 pt-4">
            <h2 className="font-editorial text-2xl font-bold text-[var(--text-ink)] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Core Principles of AI Utilization</span>
            </h2>

            <ul className="space-y-3 pl-2">
              <li className="p-3.5 rounded-xl bg-[var(--bg-paper)] border border-[var(--border-paper)] space-y-1">
                <span className="font-bold text-[var(--text-ink)]">1. Mandatory Human Editorial Sign-off:</span>
                <p className="text-xs text-[var(--text-muted)]">
                  No artificial intelligence algorithm may publish, schedule, or alter live public articles without explicit human editor verification and approval.
                </p>
              </li>

              <li className="p-3.5 rounded-xl bg-[var(--bg-paper)] border border-[var(--border-paper)] space-y-1">
                <span className="font-bold text-[var(--text-ink)]">2. Zero Hallucination Standard:</span>
                <p className="text-xs text-[var(--text-muted)]">
                  AI tools are strictly prohibited from generating fictional names, unverified quotes, hypothetical dates, or ungrounded statistics. All claims must be anchored in verified source wire metadata.
                </p>
              </li>

              <li className="p-3.5 rounded-xl bg-[var(--bg-paper)] border border-[var(--border-paper)] space-y-1">
                <span className="font-bold text-[var(--text-ink)]">3. Unambiguous Public Disclosure:</span>
                <p className="text-xs text-[var(--text-muted)]">
                  Any article drafted with AI synthesis includes a clear badge and transparency notice detailing the confidence rating and primary factual claims analyzed.
                </p>
              </li>

              <li className="p-3.5 rounded-xl bg-[var(--bg-paper)] border border-[var(--border-paper)] space-y-1">
                <span className="font-bold text-[var(--text-ink)]">4. Source Permission Enforcement:</span>
                <p className="text-xs text-[var(--text-muted)]">
                  We respect content licenses. For metadata-only sources, we ingest discovery summaries and cite original publishers directly without copying entire copyrighted archives.
                </p>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-[#B63A32]/10 border border-[#B63A32]/30 space-y-2 mt-6">
            <h3 className="font-serif font-bold text-sm text-[#B63A32] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Strict Prohibitions</span>
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              We never use synthetic generative avatars to mimic real human journalists without consent, nor do we employ automated prompt loops for clickbait generation. Dexter&apos;s Vantage Point dispatches are 100% human-authored essays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
