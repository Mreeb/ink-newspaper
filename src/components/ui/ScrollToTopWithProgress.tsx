"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTopWithProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
        setVisible(window.scrollY > 300);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[var(--bg-surface)] text-[var(--text-ink)] border border-[var(--border-paper)] shadow-[var(--shadow-clay-lg)] hover:border-[var(--accent-clay)] transition-all cursor-pointer select-none active:scale-95"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            {/* SVG Circular Progress Ring */}
            <svg className="w-12 h-12 -rotate-90 pointer-events-none absolute inset-0">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="var(--border-paper)"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="var(--accent-clay)"
                strokeWidth="2.5"
                strokeDasharray={125.6}
                strokeDashoffset={125.6 - (125.6 * scrollProgress) / 100}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-150"
              />
            </svg>

            <ArrowUp className="w-4 h-4 text-[var(--accent-clay)] group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
