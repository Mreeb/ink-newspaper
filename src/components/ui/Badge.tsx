import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ArticleStatus } from "@/lib/types";

interface BadgeProps {
  children?: React.ReactNode;
  variant?: "category" | "status" | "breaking" | "ai" | "tag" | "edition";
  status?: ArticleStatus;
  className?: string;
}

export function Badge({ children, variant = "category", status, className }: BadgeProps) {
  let variantStyles = "bg-[var(--bg-subtle)] text-[var(--text-muted)] border-[var(--border-paper)]";

  if (variant === "category") {
    variantStyles =
      "bg-[var(--bg-surface)] text-[var(--accent-clay)] font-semibold border-[var(--border-paper)] uppercase tracking-wider text-[10px] px-2.5 py-0.5 shadow-sm";
  } else if (variant === "breaking") {
    variantStyles =
      "bg-[#B63A32] text-white font-bold uppercase tracking-widest text-[10px] px-2.5 py-1 rounded-md animate-pulse shadow-[0_2px_8px_rgba(182,58,50,0.3)]";
  } else if (variant === "ai") {
    variantStyles =
      "bg-[#546E7A]/10 text-[#546E7A] dark:text-[#90A4AE] border-[#546E7A]/30 text-[11px] font-medium px-2.5 py-0.5";
  } else if (variant === "edition") {
    variantStyles =
      "bg-[#D6A84B]/15 text-[#916719] dark:text-[#E0B45F] border-[#D6A84B]/30 font-serif font-bold text-xs px-3 py-1";
  } else if (variant === "status" && status) {
    const statusMap: Record<ArticleStatus, string> = {
      draft: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700",
      in_review: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800",
      approved: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
      scheduled: "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800",
      published: "bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-300 border-green-300 dark:border-green-800",
      rejected: "bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800",
      archived: "bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-400 border-stone-300 dark:border-stone-700",
    };
    variantStyles = statusMap[status] || variantStyles;
  }

  const content = children || (status ? status.replace("_", " ") : "");

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors select-none capitalize",
          variantStyles,
          className
        )
      )}
    >
      {content}
    </span>
  );
}

export function EditorialDivider({
  ornament = true,
  className = "",
}: {
  ornament?: boolean;
  className?: string;
}) {
  return (
    <div className={twMerge("relative my-8 flex items-center justify-center", className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[var(--border-paper)]" />
      </div>
      {ornament && (
        <div className="relative bg-[var(--bg-paper)] px-4 text-[var(--accent-clay)] font-serif text-sm italic select-none">
          §
        </div>
      )}
    </div>
  );
}
