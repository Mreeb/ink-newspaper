"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Feather,
  Globe2,
  Sparkles,
  BookOpen,
  FolderTree,
  Shield,
  Settings,
  History,
  ExternalLink,
  Plus,
  Menu,
  X,
  Radio,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { useTheme } from "@/components/providers/ThemeProvider";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Articles", href: "/admin/articles", icon: FileText },
  { name: "Dexter's Column", href: "/admin/dexter", icon: Feather },
  { name: "News Pipeline", href: "/admin/news-pipeline", icon: Globe2 },
  { name: "AI Drafting Jobs", href: "/admin/ai-jobs", icon: Sparkles },
  { name: "Weekly Editions", href: "/admin/editions", icon: BookOpen },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Sources & Licenses", href: "/admin/sources", icon: Shield },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
  { name: "Audit History", href: "/admin/audit-logs", icon: History },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  // If on login page, render clean container without sidebar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[var(--bg-paper)] text-[var(--text-ink)]">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg-paper)] text-[var(--text-ink)]">
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[var(--border-paper)] bg-[var(--bg-surface)] p-4 justify-between shrink-0 shadow-sm">
        <div className="space-y-6">
          {/* Masthead Brand */}
          <div className="px-3 py-2 flex items-center justify-between">
            <Link href="/admin/dashboard" className="block">
              <span className="font-editorial text-2xl font-bold tracking-tight text-[var(--text-ink)]">
                INK
              </span>
              <span className="block text-[10px] uppercase tracking-widest font-bold text-[var(--accent-clay)]">
                Newsroom CMS
              </span>
            </Link>

            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>

          {/* Quick Create Action */}
          <div className="px-1">
            <Link href="/admin/articles/new" className="w-full block">
              <ClayButton variant="primary" size="sm" className="w-full" leftIcon={<Plus className="w-4 h-4" />}>
                Draft Article
              </ClayButton>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[var(--accent-clay)] text-white shadow-[0_2px_8px_rgba(201,104,70,0.3)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-subtle)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card, Theme Toggle & Public Link */}
        <div className="pt-4 border-t border-[var(--border-paper)] space-y-3">
          <div className="flex items-center justify-between px-1">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border-paper)] bg-[var(--bg-paper)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-colors cursor-pointer"
              title={`Switch to ${resolvedTheme === "light" ? "Dark" : "Light"} mode`}
            >
              {resolvedTheme === "light" ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[var(--accent-clay)]" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              )}
            </button>

            <Link
              href="/"
              target="_blank"
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-subtle)]"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--bg-subtle)] flex items-center justify-between">
            <div className="text-xs">
              <p className="font-bold text-[var(--text-ink)]">Eleanor Vance</p>
              <p className="text-[10px] text-[var(--accent-clay)] uppercase font-semibold">Administrator</p>
            </div>
            <Link
              href="/admin/login"
              title="Logout"
              className="text-[var(--text-muted)] hover:text-[#B63A32] p-1 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Admin Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-[var(--border-paper)] bg-[var(--bg-surface)]">
          <Link href="/admin/dashboard" className="font-editorial text-xl font-bold">
            INK CMS
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-[var(--border-paper)] bg-[var(--bg-paper)] text-[var(--text-muted)]"
            >
              {resolvedTheme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <Link href="/admin/articles/new">
              <ClayButton variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                New
              </ClayButton>
            </Link>
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2 rounded-xl border border-[var(--border-paper)] bg-[var(--bg-paper)]"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden p-4 border-b border-[var(--border-paper)] bg-[var(--bg-surface)] space-y-2 animate-in slide-in-from-top duration-200">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[var(--accent-clay)] text-white"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
