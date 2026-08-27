"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Rss, Feather, ShieldCheck, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      // Fallback
    }
  };

  return (
    <footer className="w-full bg-[var(--bg-surface)] border-t border-[var(--border-paper)] mt-20 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border-paper)]">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-editorial text-3xl font-bold tracking-tight text-[var(--text-ink)]">
                INK
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--accent-clay)]">
                Newspaper of Distinction
              </span>
            </Link>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-sm">
              Molded from warm paper and refined clay surfaces. We deliver long-form investigative reporting, rigorous cultural analysis, and weekly contemplative dispatches.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/feed.xml"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--text-ink)] hover:text-[var(--accent-clay)] transition-colors border border-[var(--border-paper)]"
              >
                <Rss className="w-3.5 h-3.5 text-[var(--accent-clay)]" />
                <span>RSS Feed</span>
              </Link>
              <Link
                href="/column"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-subtle)] text-xs font-serif font-semibold text-[var(--text-ink)] hover:text-[var(--accent-clay)] transition-colors border border-[var(--border-paper)]"
              >
                <Feather className="w-3.5 h-3.5 text-[var(--accent-clay)]" />
                <span>Dexter&apos;s Vantage Point</span>
              </Link>
            </div>
          </div>

          {/* Editorial Sections */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[var(--text-ink)] uppercase tracking-wider mb-4">
              Sections
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>
                <Link href="/category/world" className="hover:text-[var(--accent-clay)] transition-colors">
                  World Affairs
                </Link>
              </li>
              <li>
                <Link href="/category/politics" className="hover:text-[var(--accent-clay)] transition-colors">
                  Politics & Civic Trust
                </Link>
              </li>
              <li>
                <Link href="/category/business" className="hover:text-[var(--accent-clay)] transition-colors">
                  Business & Macroeconomics
                </Link>
              </li>
              <li>
                <Link href="/category/technology" className="hover:text-[var(--accent-clay)] transition-colors">
                  Applied Technology & AI
                </Link>
              </li>
              <li>
                <Link href="/category/culture" className="hover:text-[var(--accent-clay)] transition-colors">
                  Culture & Design
                </Link>
              </li>
              <li>
                <Link href="/category/spirituality" className="hover:text-[var(--accent-clay)] transition-colors">
                  Spirituality & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="hover:text-[var(--accent-clay)] transition-colors">
                  Endurance & Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Publication & Ethics */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[var(--text-ink)] uppercase tracking-wider mb-4">
              Standards & Archives
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>
                <Link href="/editions" className="hover:text-[var(--accent-clay)] transition-colors">
                  Weekly Editions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--accent-clay)] transition-colors">
                  About the Newsroom
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-[var(--accent-clay)] transition-colors">
                  Editorial Verification Code
                </Link>
              </li>
              <li>
                <Link href="/ai-policy" className="hover:text-[var(--accent-clay)] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-clay)]" />
                  <span>AI Transparency Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--accent-clay)] transition-colors">
                  Letters to the Editor
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[var(--accent-clay)] transition-colors text-xs text-[var(--text-faint)]">
                  Staff Login (CMS)
                </Link>
              </li>
            </ul>
          </div>

          {/* Weekly Dispatch Subscription */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-[var(--text-ink)] uppercase tracking-wider">
              The Weekly Letter
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Receive Dexter&apos;s weekly column and our curated investigative edition every Thursday morning.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Subscription confirmed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-xl text-[var(--text-ink)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-clay)]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-[var(--accent-clay)] text-white rounded-lg text-xs font-semibold hover:bg-[var(--accent-dark-clay)] transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="block text-[10px] text-[var(--text-faint)]">
                  Zero spam. Pure editorial rigor.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-faint)] gap-4">
          <p>© {new Date().getFullYear()} INK Publishing Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[var(--text-muted)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--text-muted)] transition-colors">
              Terms of Service
            </Link>
            <Link href="/editorial-policy" className="hover:text-[var(--text-muted)] transition-colors">
              Corrections & Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
