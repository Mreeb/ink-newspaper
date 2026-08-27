"use client";

import React, { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentScroll = window.scrollY;
        const currentProgress = (currentScroll / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (progress <= 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[var(--bg-subtle)]">
      <div
        className="h-full bg-[var(--accent-clay)] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(201,104,70,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
