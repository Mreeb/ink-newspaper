"use client";

import React, { useState } from "react";
import { Shield, CheckCircle2, Ban, Lock, Globe } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { SourcePermission } from "@/lib/types";

interface SourcePolicyRule {
  domain: string;
  name: string;
  policy: SourcePermission;
  notes: string;
}

const INITIAL_SOURCES: SourcePolicyRule[] = [
  { domain: "reuters.com", name: "Reuters International", policy: "metadata_only", notes: "Headline and link citation only. Full text reproduction prohibited." },
  { domain: "apnews.com", name: "Associated Press", policy: "metadata_only", notes: "Primary discovery endpoint. Attribution required." },
  { domain: "nature.com", name: "Nature Geosciences", policy: "metadata_only", notes: "Academic citation and paper DOI attribution." },
  { domain: "wikipedia.org", name: "Wikimedia Foundation", policy: "public_domain", notes: "Creative Commons Attribution-ShareAlike licensed content." },
  { domain: "europa.eu", name: "European Commission Press", policy: "public_domain", notes: "Official sovereign civic releases." },
  { domain: "un.org", name: "United Nations Media", policy: "public_domain", notes: "Public domain global treaty transcripts." },
  { domain: "scamwire.com", name: "Unverified Tabloid Wire", policy: "blocked", notes: "Flagged for repeated synthetic misinformation." },
];

export default function AdminSourcesPage() {
  const [sources, setSources] = useState<SourcePolicyRule[]>(INITIAL_SOURCES);

  const handlePolicyChange = (domain: string, newPolicy: SourcePermission) => {
    setSources((prev) =>
      prev.map((s) => (s.domain === domain ? { ...s, policy: newPolicy } : s))
    );
  };

  const policyOptions = [
    { value: "metadata_only", label: "metadata_only", badge: "Metadata" },
    { value: "licensed_republish", label: "licensed_republish", badge: "Licensed" },
    { value: "public_domain", label: "public_domain", badge: "Public" },
    { value: "blocked", label: "blocked", badge: "Blocked" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="pb-4 border-b border-[var(--border-paper)]">
        <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent-clay)] flex items-center gap-1">
          <Shield className="w-3.5 h-3.5" />
          <span>Source Permissions & Licensing Registry</span>
        </span>
        <h1 className="font-editorial text-3xl font-bold text-[var(--text-ink)]">
          Wire Sources & Ingestion Policies
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          Enforce automated copyright boundaries during NewsData.io and GDELT ingestion.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-paper)] space-y-1">
          <span className="font-bold text-[var(--text-ink)]">metadata_only</span>
          <p className="text-[var(--text-muted)] text-[11px]">Retain headline, description, link. Never copy full text.</p>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-paper)] space-y-1">
          <span className="font-bold text-[var(--text-ink)]">licensed_republish</span>
          <p className="text-[var(--text-muted)] text-[11px]">Accredited wire syndication with explicit licensing.</p>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-paper)] space-y-1">
          <span className="font-bold text-[var(--text-ink)]">public_domain</span>
          <p className="text-[var(--text-muted)] text-[11px]">Government and treaty official communications.</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#B63A32]/10 border border-[#B63A32]/30 space-y-1">
          <span className="font-bold text-[#B63A32]">blocked</span>
          <p className="text-[var(--text-muted)] text-[11px]">Strictly discarded during automatic news discovery.</p>
        </div>
      </div>

      <div className="clay-card-static overflow-visible border border-[var(--border-paper)]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-muted)] uppercase tracking-wider font-semibold border-b border-[var(--border-paper)]">
            <tr>
              <th className="py-3.5 px-4">Domain & Publisher</th>
              <th className="py-3.5 px-4 w-64">Current Permission Policy</th>
              <th className="py-3.5 px-4">Editorial Compliance Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-paper)]/60">
            {sources.map((src) => (
              <tr key={src.domain} className="hover:bg-[var(--bg-subtle)]/40 transition-colors">
                <td className="py-3.5 px-4">
                  <p className="font-bold text-sm text-[var(--text-ink)]">{src.name}</p>
                  <p className="font-mono text-[11px] text-[var(--accent-clay)]">{src.domain}</p>
                </td>

                <td className="py-3.5 px-4 w-64">
                  <CustomSelect
                    size="sm"
                    value={src.policy}
                    onChange={(val) => handlePolicyChange(src.domain, val as SourcePermission)}
                    options={policyOptions}
                  />
                </td>

                <td className="py-3.5 px-4 text-[var(--text-muted)] max-w-sm">
                  {src.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
