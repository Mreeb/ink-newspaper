"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Send, CheckCircle2, ArrowLeft } from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "letter-to-editor",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "letter-to-editor", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-300">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-clay)] hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Front Page</span>
      </Link>

      <div className="clay-card-static p-8 sm:p-12 space-y-8">
        <div className="space-y-3 pb-6 border-b border-[var(--border-paper)] text-center">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent-clay)]/10 text-[var(--accent-clay)] flex items-center justify-center mx-auto mb-2 border border-[var(--accent-clay)]/20 shadow-sm">
            <Mail className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[var(--accent-clay)]">
            Letters & Inquiries
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[var(--text-ink)]">
            Contact the Newsroom
          </h1>
          <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
            Submit a letter to the editor, confidential tip, or inquiry to the INK Editorial Board.
          </p>
        </div>

        {status === "success" ? (
          <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3 animate-in fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h3 className="font-editorial text-xl font-bold text-emerald-900 dark:text-emerald-100">
              Message Received
            </h3>
            <p className="text-xs text-emerald-800 dark:text-emerald-200 max-w-md mx-auto">
              Your transmission has been logged with the editorial desk. Letters selected for publication in the weekly folio will be acknowledged via email.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline pt-2"
            >
              Send another dispatch
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-ink)]">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Arthur Pendelton"
                  className="w-full px-4 py-2.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-xl text-sm text-[var(--text-ink)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-clay)] shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-ink)]">Your Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="arthur@university.edu"
                  className="w-full px-4 py-2.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-xl text-sm text-[var(--text-ink)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-clay)] shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-ink)]">Inquiry Department</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-xl text-sm text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)] shadow-inner"
              >
                <option value="letter-to-editor">Letter to the Editor (for Publication)</option>
                <option value="confidential-tip">Confidential Investigative Tip</option>
                <option value="dexter-column">Correspondence for Dexter</option>
                <option value="corrections">Correction or Clarification Request</option>
                <option value="syndication">Syndication & Licensing Inquiry</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-ink)]">Your Transmission / Message</label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your letter with clarity and reasoned arguments..."
                className="w-full px-4 py-3 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-xl text-sm text-[var(--text-ink)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-clay)] shadow-inner"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <p className="text-[11px] text-[var(--text-faint)]">
                Letters may be edited for length and clarity.
              </p>
              <ClayButton
                type="submit"
                variant="primary"
                size="md"
                isLoading={status === "loading"}
                rightIcon={<Send className="w-4 h-4" />}
              >
                Submit Dispatch
              </ClayButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
