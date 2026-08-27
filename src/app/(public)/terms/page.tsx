import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — INK Newspaper",
  description: "Terms of service and syndication standards of INK Newspaper.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-clay)] hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Front Page</span>
      </Link>

      <div className="clay-card-static p-8 sm:p-12 space-y-6">
        <h1 className="font-editorial text-4xl font-bold text-[var(--text-ink)]">
          Terms of Service & Copyright
        </h1>
        <p className="text-xs text-[var(--text-faint)]">
          Last revised: August 2026
        </p>

        <div className="space-y-4 text-sm text-[var(--text-muted)] leading-relaxed">
          <p>
            Welcome to INK Newspaper. All investigative articles, philosophical essays by Dexter, photographic commissions, and editorial typography are protected by international intellectual property treaties.
          </p>
          <h2 className="font-editorial text-2xl font-bold text-[var(--text-ink)] pt-4">
            1. Personal and Non-Commercial Reading
          </h2>
          <p>
            You may read, share links to, and quote excerpts (up to 150 words with attribution and a direct link) for personal, educational, and non-commercial purposes.
          </p>
          <h2 className="font-editorial text-2xl font-bold text-[var(--text-ink)] pt-4">
            2. Syndication and Archival Rights
          </h2>
          <p>
            Commercial re-publication, bulk scraping, or automated ingestion into proprietary training sets without explicit written authorization from the INK Publishing Board is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
