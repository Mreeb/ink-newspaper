"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";

export function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="my-16 relative overflow-hidden rounded-3xl border border-[var(--border-paper)] bg-[var(--bg-surface)] p-8 sm:p-12 shadow-[var(--shadow-clay-md)]">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[var(--accent-clay)]/10 text-[var(--accent-clay)] flex items-center justify-center mx-auto mb-2 border border-[var(--accent-clay)]/20 shadow-sm">
          <Mail className="w-6 h-6" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[var(--accent-clay)]">
          The Weekly Dispatch
        </span>

        <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--text-ink)] leading-tight">
          Thoughtful journalism, delivered every Thursday.
        </h3>

        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          Join over 42,000 discerning readers who receive Dexter&apos;s philosophical essay, investigative deep-dives, and our curated weekly folio directly in their inbox.
        </p>

        {status === "success" ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-medium flex items-center justify-center gap-2 max-w-md mx-auto animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Welcome to the INK circle. Check your inbox for the current edition.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              placeholder="Enter your personal or work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-xl text-sm text-[var(--text-ink)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-clay)] shadow-inner transition-colors"
            />
            <ClayButton
              type="submit"
              variant="primary"
              size="md"
              isLoading={status === "loading"}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Subscribe
            </ClayButton>
          </form>
        )}

        <p className="text-[11px] text-[var(--text-faint)] pt-1">
          No algorithmic noise. No sponsored clickbait. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
}
