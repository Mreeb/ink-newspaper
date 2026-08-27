"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, KeyRound, ArrowRight, UserCheck } from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("editor-in-chief@inknewspaper.com");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate instant secure auth session
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin/dashboard");
    }, 600);
  };

  const handleQuickLogin = (roleEmail: string) => {
    setEmail(roleEmail);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-paper)]">
      <div className="w-full max-w-md clay-card-static p-8 sm:p-10 space-y-6 shadow-2xl border border-[var(--border-paper)] bg-[var(--bg-surface)]">
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <span className="font-editorial text-4xl font-bold tracking-tight text-[var(--text-ink)]">
              INK
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--accent-clay)]">
              Newsroom Staff Access
            </span>
          </Link>
          <p className="text-xs text-[var(--text-muted)] pt-1">
            Authorized entry for administrators and desk editors.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-ink)]">Staff Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-xl text-xs text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)] shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-ink)]">Passphrase</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-xl text-xs text-[var(--text-ink)] outline-none focus:border-[var(--accent-clay)] shadow-inner"
            />
          </div>

          <div className="pt-2">
            <ClayButton
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Authenticate & Enter CMS
            </ClayButton>
          </div>
        </form>

        {/* Quick Demo Credentials Switcher */}
        <div className="pt-4 border-t border-[var(--border-paper)] space-y-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-faint)] block text-center">
            Quick Staff Profiles (Pair Testing)
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("editor-in-chief@inknewspaper.com")}
              className="p-2 rounded-xl bg-[var(--bg-paper)] border border-[var(--border-paper)] text-[11px] text-left hover:border-[var(--accent-clay)] transition-colors"
            >
              <p className="font-bold text-[var(--text-ink)]">Eleanor Vance</p>
              <p className="text-[10px] text-[var(--accent-clay)]">Administrator</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("marcus.thorne@inknewspaper.com")}
              className="p-2 rounded-xl bg-[var(--bg-paper)] border border-[var(--border-paper)] text-[11px] text-left hover:border-[var(--accent-clay)] transition-colors"
            >
              <p className="font-bold text-[var(--text-ink)]">Marcus Thorne</p>
              <p className="text-[10px] text-[var(--accent-sage)]">Desk Editor</p>
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-[var(--text-faint)] hover:text-[var(--accent-clay)] hover:underline">
            ← Return to Public Newspaper
          </Link>
        </div>
      </div>
    </div>
  );
}
