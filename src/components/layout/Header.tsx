"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sun, Moon, Menu, X, BookOpen, Feather, Shield } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SearchModal } from "@/components/public/SearchModal";
import { Category } from "@/lib/types";

const NAV_CATEGORIES: Array<{ name: string; slug: string }> = [
  { name: "World", slug: "world" },
  { name: "Politics", slug: "politics" },
  { name: "Current Events", slug: "current-events" },
  { name: "Business", slug: "business" },
  { name: "Technology", slug: "technology" },
  { name: "Culture", slug: "culture" },
  { name: "Spirituality", slug: "spirituality" },
  { name: "Sports", slug: "sports" },
];

export function Header({ categories = NAV_CATEGORIES }: { categories?: Array<{ name: string; slug: string }> }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="w-full z-40 relative">
        {/* Top Edition & Date Bar */}
        <div className="bg-[var(--bg-subtle)]/70 border-b border-[var(--border-paper)] px-4 py-1.5 text-xs text-[var(--text-muted)] font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span>{currentDate || "The Weekly Edition"}</span>
              <span className="hidden sm:inline text-[var(--border-strong)]">•</span>
              <span className="hidden sm:inline font-serif italic text-[var(--accent-clay)] font-semibold">
                Vol. XIV, Issue 33
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/column"
                className="hover:text-[var(--accent-clay)] transition-colors flex items-center gap-1 font-serif italic"
              >
                <Feather className="w-3 h-3 text-[var(--accent-clay)]" />
                <span>Dexter&apos;s Vantage Point</span>
              </Link>
              <span className="hidden md:inline text-[var(--border-strong)]">•</span>
              <Link
                href="/editions"
                className="hidden md:flex items-center gap-1 hover:text-[var(--accent-clay)] transition-colors"
              >
                <BookOpen className="w-3 h-3" />
                <span>Weekly Editions</span>
              </Link>
              <span className="hidden lg:inline text-[var(--border-strong)]">•</span>
              <Link
                href="/admin/dashboard"
                className="hidden lg:flex items-center gap-1 text-[var(--text-faint)] hover:text-[var(--text-ink)] transition-colors text-[11px]"
              >
                <Shield className="w-3 h-3" />
                <span>Newsroom Desk</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Masthead / Wordmark Bar */}
        <div className="max-w-7xl mx-auto px-4 py-6 text-center relative flex flex-col items-center justify-center">
          <Link href="/" className="group inline-block">
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--text-ink)] group-hover:text-[var(--accent-clay)] transition-colors duration-200">
              INK
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="h-[1px] w-8 bg-[var(--accent-clay)]" />
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-semibold text-[var(--text-muted)]">
                The Weekly Newspaper of Distinction
              </p>
              <span className="h-[1px] w-8 bg-[var(--accent-clay)]" />
            </div>
          </Link>
        </div>

        {/* Sticky Primary Navigation */}
        <div
          className={`sticky top-0 z-40 w-full transition-all duration-200 ${
            isScrolled
              ? "bg-[var(--bg-paper)]/95 backdrop-blur-md border-b border-[var(--border-paper)] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] py-2.5"
              : "border-y border-[var(--border-paper)] bg-[var(--bg-paper)] py-2"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            {/* Scrolled Compact Wordmark */}
            <div className={`transition-all duration-200 ${isScrolled ? "opacity-100 w-auto mr-4" : "opacity-0 w-0 overflow-hidden"}`}>
              <Link href="/" className="font-editorial text-2xl font-bold text-[var(--text-ink)] hover:text-[var(--accent-clay)]">
                INK
              </Link>
            </div>

            {/* Desktop Categories List */}
            <nav className="hidden md:flex items-center gap-1 xl:gap-1.5 flex-1 min-w-0 overflow-x-auto no-scrollbar py-0.5 mr-3">
              <Link
                href="/"
                className={`px-2.5 py-1 text-[11px] xl:text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  pathname === "/"
                    ? "bg-[var(--bg-subtle)] text-[var(--accent-clay)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-subtle)]/50"
                }`}
              >
                Front Page
              </Link>

              {categories.map((cat) => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className={`px-2 xl:px-2.5 py-1 text-[11px] xl:text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? "bg-[var(--bg-subtle)] text-[var(--accent-clay)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-subtle)]/50"
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}

              <Link
                href="/column"
                className={`px-2.5 py-1 text-[11px] xl:text-xs font-serif font-bold italic tracking-wide rounded-lg transition-colors whitespace-nowrap shrink-0 text-[var(--accent-clay)] hover:bg-[var(--bg-subtle)]/60 flex items-center gap-1 border border-[var(--accent-clay)]/25 ${
                  pathname.startsWith("/column") ? "bg-[var(--bg-subtle)] shadow-xs" : "bg-[var(--bg-surface)]"
                }`}
              >
                <Feather className="w-3 h-3 text-[var(--accent-clay)]" />
                <span>Dexter&apos;s Vantage</span>
              </Link>
            </nav>

            {/* Action Buttons: Search, Theme Toggle, Mobile Menu (Strictly Isolated & Non-Colliding) */}
            <div className="flex items-center gap-2 shrink-0 border-l border-[var(--border-paper)]/70 pl-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-ink)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-paper)] rounded-xl transition-all shadow-[var(--shadow-clay-sm)] cursor-pointer shrink-0"
                title="Search stories (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-[var(--bg-paper)] rounded text-[var(--text-faint)] border border-[var(--border-paper)]">
                  ⌘K
                </kbd>
              </button>

              <button
                onClick={toggleTheme}
                aria-label="Toggle dark/light theme"
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text-ink)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-paper)] rounded-xl transition-all shadow-[var(--shadow-clay-sm)] cursor-pointer flex items-center justify-center shrink-0"
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
              >
                <span className="transition-transform duration-300 hover:rotate-45">
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-[#E0B45F] animate-in spin-in-45" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#91442F] animate-in -spin-in-45" />
                  )}
                </span>
              </button>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text-ink)] bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-xl shrink-0"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[110px] bottom-0 z-30 bg-[var(--bg-paper)]/98 backdrop-blur-xl border-b border-[var(--border-paper)] p-6 overflow-y-auto animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-3">
                  Editorial Sections
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-paper)] text-sm font-semibold text-[var(--text-ink)] hover:border-[var(--accent-clay)]"
                  >
                    Front Page
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-paper)] text-sm font-semibold text-[var(--text-ink)] hover:border-[var(--accent-clay)]"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-paper)] space-y-3">
                <Link
                  href="/column"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3.5 rounded-xl bg-[#C96846]/10 border border-[#C96846]/30 text-sm font-serif font-bold text-[var(--accent-clay)]"
                >
                  <Feather className="w-4 h-4" />
                  <span>Dexter&apos;s Vantage Point</span>
                </Link>

                <Link
                  href="/editions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-paper)] text-sm font-medium text-[var(--text-ink)]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Weekly Edition Archives</span>
                </Link>

                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-paper)] text-sm font-medium text-[var(--text-ink)]"
                >
                  <Shield className="w-4 h-4" />
                  <span>Newsroom CMS Admin</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Instant Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
