import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Feather, Award, ArrowRight } from "lucide-react";
import { EditorialDivider } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About INK Newspaper — The Weekly Editorial",
  description: "Learn about INK Newspaper, our editorial mission, clay-molded design principles, and investigative commitment.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Masthead */}
      <div className="text-center py-12 px-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-paper)] shadow-[var(--shadow-clay-md)] space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[var(--accent-clay)]">
          The Newsroom
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-[var(--text-ink)]">
          About INK Newspaper
        </h1>
        <p className="font-serif italic text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
          &ldquo;A digital newspaper molded from warm paper, tactile conviction, and uncompromising journalistic rigor.&rdquo;
        </p>
      </div>

      {/* Mission Content */}
      <div className="clay-card-static p-8 sm:p-12 space-y-8 text-[var(--text-ink)] leading-relaxed">
        <div className="space-y-4">
          <h2 className="font-editorial text-3xl font-bold text-[var(--text-ink)]">
            Our Editorial Foundation
          </h2>
          <p className="prose-ink">
            INK Newspaper was founded on a singular conviction: that in an era overwhelmed by algorithmic agitation and ephemeral soundbites, the world demands an anchor of intellectual clarity.
          </p>
          <p className="text-base text-[var(--text-muted)] leading-relaxed">
            We do not publish breaking churn for advertising clicks. Every story we commission undergoes rigorous primary-source verification, multi-layer fact-checking, and deliberate editorial design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[var(--border-paper)]">
          <div className="p-5 rounded-2xl bg-[var(--bg-paper)] border border-[var(--border-paper)] space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent-clay)]/10 text-[var(--accent-clay)] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-[var(--text-ink)]">
              Verified Rigor
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Every factual assertion is backed by primary public records, scientific research, or on-the-record testimony.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-paper)] border border-[var(--border-paper)] space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
              <Feather className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-[var(--text-ink)]">
              Artisanal Craft
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Custom responsive typography, Fraunces editorial serifs, and clay-molded surfaces engineered for deep focus.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-paper)] border border-[var(--border-paper)] space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent-sage)]/10 text-[var(--accent-sage)] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-[var(--text-ink)]">
              Weekly Synthesis
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              We publish weekly folios rather than continuous distraction, respecting our readers&apos; attention and peace.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border-paper)] space-y-4">
          <h3 className="font-editorial text-2xl font-bold">The Editorial Board</h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Our masthead brings together veteran international correspondents, computational researchers, and literary critics. We operate independently without sovereign or corporate interference.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/editorial-policy"
              className="text-xs font-bold text-[var(--accent-clay)] hover:underline flex items-center gap-1"
            >
              <span>Read our Verification Code</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/ai-policy"
              className="text-xs font-bold text-[var(--accent-clay)] hover:underline flex items-center gap-1"
            >
              <span>Read our AI Transparency Charter</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
