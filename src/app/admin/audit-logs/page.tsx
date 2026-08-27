"use client";

import React, { useState, useEffect } from "react";
import { History, Shield, RefreshCw } from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { AuditLog } from "@/lib/types";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/audit-logs");
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-paper)]">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent-clay)] flex items-center gap-1">
            <History className="w-3.5 h-3.5" />
            <span>Publishing Ledger</span>
          </span>
          <h1 className="font-editorial text-3xl font-bold text-[var(--text-ink)]">
            Audit History & Editorial Actions
          </h1>
        </div>

        <ClayButton
          variant="secondary"
          size="sm"
          onClick={fetchLogs}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Refresh Ledger
        </ClayButton>
      </div>

      <div className="clay-card-static overflow-hidden border border-[var(--border-paper)]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-muted)] uppercase tracking-wider font-semibold border-b border-[var(--border-paper)]">
            <tr>
              <th className="py-3.5 px-4">Timestamp</th>
              <th className="py-3.5 px-4">Actor</th>
              <th className="py-3.5 px-4">Action</th>
              <th className="py-3.5 px-4">Target</th>
              <th className="py-3.5 px-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-paper)]/60">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[var(--text-muted)]">
                  Loading ledger events...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[var(--text-muted)]">
                  No audit events recorded yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-[var(--bg-subtle)]/40 transition-colors">
                  <td className="py-3.5 px-4 text-[var(--text-faint)] font-mono whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-[var(--text-ink)]">
                    {log.actorName}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-paper)] font-mono text-[10px] font-bold text-[var(--accent-clay)]">
                      {log.action}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-[var(--text-muted)]">
                    {log.targetType}:{log.targetId}
                  </td>

                  <td className="py-3.5 px-4 text-[var(--text-muted)] max-w-md">
                    {log.details}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
