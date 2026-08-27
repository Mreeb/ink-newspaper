import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — INK Newspaper",
  description: "Privacy and reader data protection policies of INK Newspaper.",
};

export default function PrivacyPage() {
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
          Reader Privacy Policy
        </h1>
        <p className="text-xs text-[var(--text-faint)]">
          Last revised: August 2026
        </p>

        <div className="space-y-4 text-sm text-[var(--text-muted)] leading-relaxed">
          <p>
            INK Newspaper adheres to a radical privacy-first publishing model. We believe reader attention is not an advertising commodity to be tracked across the open web.
          </p>
          <h2 className="font-editorial text-2xl font-bold text-[var(--text-ink)] pt-4">
            1. Zero Third-Party Advertising Trackers
          </h2>
          <p>
            We do not install invasive programmatic advertising pixels, cross-site trackers, or data-broker cookies. Our site analytics are aggregated, privacy-preserving, and cookie-free.
          </p>
          <h2 className="font-editorial text-2xl font-bold text-[var(--text-ink)] pt-4">
            2. Newsletter Data
          </h2>
          <p>
            If you subscribe to the weekly letter, your email address is encrypted and used exclusively for delivering our editorial dispatch. We never sell, rent, or share your contact details.
          </p>
        </div>
      </div>
    </div>
  );
}
