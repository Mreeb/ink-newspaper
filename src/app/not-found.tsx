import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="clay-card-static p-10 max-w-lg mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-clay)]/10 text-[var(--accent-clay)] flex items-center justify-center mx-auto border border-[var(--accent-clay)]/20 shadow-sm font-serif font-bold text-2xl">
          404
        </div>
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--accent-clay)]">
          Page Not Found
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--text-ink)]">
          The Folio Has Moved
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          The dispatch, article, or archive you are seeking is no longer at this coordinate. It may have been re-indexed or archived into a past weekly edition.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-clay)] text-white text-xs font-semibold hover:bg-[var(--accent-dark-clay)] transition-all shadow-md"
          >
            <span>Return to Front Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
