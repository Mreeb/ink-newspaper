"use client";

import React, { useState } from "react";
import { Share2, Check, Copy, Printer, ExternalLink, Send } from "lucide-react";

export function ShareControls({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-2 pt-2">
      <span className="text-xs text-[var(--text-faint)] font-medium flex items-center gap-1 mr-1">
        <Share2 className="w-3.5 h-3.5" />
        <span>Share:</span>
      </span>

      <button
        onClick={handleCopy}
        className="p-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-paper)] text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-all shadow-[var(--shadow-clay-sm)] cursor-pointer"
        title="Copy article link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
      </button>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-paper)] text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-all shadow-[var(--shadow-clay-sm)] flex items-center justify-center font-bold text-xs"
        title="Share on X"
      >
        𝕏
      </a>

      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-paper)] text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-all shadow-[var(--shadow-clay-sm)] flex items-center justify-center font-bold text-xs"
        title="Share on LinkedIn"
      >
        in
      </a>

      <button
        onClick={handlePrint}
        className="p-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-paper)] text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-all shadow-[var(--shadow-clay-sm)] cursor-pointer"
        title="Print article"
      >
        <Printer className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
