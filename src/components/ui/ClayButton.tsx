"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ClayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function ClayButton({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ClayButtonProps) {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs font-medium rounded-lg gap-1.5",
    md: "px-5 py-2.5 text-sm font-semibold rounded-xl gap-2",
    lg: "px-7 py-3.5 text-base font-semibold rounded-2xl gap-2.5",
  }[size];

  const variantClasses = {
    primary:
      "bg-[#C96846] text-white hover:bg-[#91442F] active:translate-y-[1px] shadow-[0_4px_12px_rgba(201,104,70,0.25),inset_0_1px_1px_rgba(255,255,255,0.35)] border border-white/20 dark:bg-[#E17A56] dark:hover:bg-[#C96846]",
    secondary:
      "bg-[var(--bg-surface)] text-[var(--text-ink)] hover:bg-[var(--bg-subtle)] active:translate-y-[1px] border border-[var(--border-paper)] shadow-[0_2px_4px_rgba(60,45,30,0.05),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.05)]",
    gold:
      "bg-[#D6A84B] text-[#171716] hover:bg-[#C27E2D] hover:text-white active:translate-y-[1px] shadow-[0_4px_12px_rgba(214,168,75,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/20 font-semibold",
    danger:
      "bg-[#B63A32] text-white hover:bg-[#8F2720] active:translate-y-[1px] shadow-[0_4px_12px_rgba(182,58,50,0.25),inset_0_1px_1px_rgba(255,255,255,0.25)] border border-white/20",
    ghost:
      "bg-transparent text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-subtle)] border border-transparent shadow-none",
  }[variant];

  return (
    <button
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center transition-all duration-150 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          sizeClasses,
          variantClasses,
          className
        )
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
