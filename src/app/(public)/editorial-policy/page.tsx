import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, BookOpen, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Verification Policy — INK Newspaper",
  description: "The journalistic verification standards, corrections protocol, and ethical guidelines of INK Newspaper.",
};

export default function EditorialPolicyPage() {
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
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent-clay)]">
            Journalistic Standards
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[var(--text-ink)]">
            Editorial Verification Code
          </h1>
          <p className="font-serif italic text-base text-[var(--text-muted)]">
            Guidance for reporting, multi-source corroboration, and corrections.
          </p>
        </div>

        <div className="space-y-6 text-sm text-[var(--text-ink)] leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-editorial text-2xl font-bold text-[var(--text-ink)]">
              1. Two-Source Verification Rule
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Every critical factual claim concerning international agreements, public policy, or corporate restructuring must be corroborated by at least two independent primary sources (e.g., official court filings, published peer-reviewed findings, or authorized institutional spokespersons).
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[var(--border-paper)]">
            <h2 className="font-editorial text-2xl font-bold text-[var(--text-ink)]">
              2. Corrections & Transparency
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              When an error of fact or context occurs, INK publishes an explicit correction footnote at the top of the relevant article, detailing the exact nature of the modification, the timestamp, and the rationale.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[var(--border-paper)]">
            <h2 className="font-editorial text-2xl font-bold text-[var(--text-ink)]">
              3. Distinction Between Analysis and Fact
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              We maintain strict demarcation between verified reporting and analytical commentary. Opinion columns, such as Dexter&apos;s Vantage Point, are explicitly labeled to ensure readers always know the nature of the text before them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
