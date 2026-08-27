"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export interface Option {
  value: string;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
  description?: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  label,
  disabled = false,
  className,
  size = "md",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex((opt) => opt.value === value);
        if (currentIndex < options.length - 1) {
          onChange(options[currentIndex + 1].value);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isOpen) {
        const currentIndex = options.findIndex((opt) => opt.value === value);
        if (currentIndex > 0) {
          onChange(options[currentIndex - 1].value);
        }
      }
    }
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-xl",
    md: "px-3.5 py-2 text-xs sm:text-sm rounded-xl",
    lg: "px-4 py-3 text-sm rounded-2xl",
  }[size];

  return (
    <div className={twMerge("relative w-full space-y-1.5", className)} ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold text-[var(--text-ink)] uppercase tracking-wider">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={twMerge(
          clsx(
            "w-full flex items-center justify-between gap-2 text-left transition-all duration-200 cursor-pointer border select-none outline-none",
            "bg-[var(--bg-surface)] text-[var(--text-ink)] border-[var(--border-paper)] shadow-[var(--shadow-clay-sm)]",
            "hover:border-[var(--accent-clay)]/50 focus:border-[var(--accent-clay)] focus:ring-2 focus:ring-[var(--accent-clay)]/20",
            isOpen && "border-[var(--accent-clay)] ring-2 ring-[var(--accent-clay)]/20 shadow-[var(--shadow-clay-md)]",
            disabled && "opacity-50 cursor-not-allowed",
            sizeStyles
          )
        )}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
          {selectedOption ? (
            <span className="font-medium text-[var(--text-ink)] truncate">
              {selectedOption.label}
            </span>
          ) : (
            <span className="text-[var(--text-faint)] italic">{placeholder}</span>
          )}
        </span>

        <span className="flex items-center gap-1.5 shrink-0 ml-1">
          {selectedOption?.badge && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-subtle)] text-[var(--accent-clay)] border border-[var(--border-paper)]">
              {selectedOption.badge}
            </span>
          )}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="text-[var(--text-muted)]"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </span>
      </button>

      {/* Floating Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 z-50 mt-1.5 p-1.5 bg-[var(--bg-surface)] border border-[var(--border-paper)] rounded-2xl shadow-xl max-h-60 overflow-y-auto backdrop-blur-md"
            style={{
              boxShadow: "0 12px 36px -4px rgba(0, 0, 0, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.08)",
            }}
            role="listbox"
          >
            <div className="space-y-0.5">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={twMerge(
                      clsx(
                        "w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-xl text-left transition-all duration-150 cursor-pointer select-none",
                        isSelected
                          ? "bg-[var(--accent-clay)] text-white font-semibold shadow-sm"
                          : "text-[var(--text-ink)] hover:bg-[var(--bg-subtle)] hover:text-[var(--accent-clay)]"
                      )
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {option.icon && (
                        <span className={isSelected ? "text-white" : "text-[var(--accent-clay)]"}>
                          {option.icon}
                        </span>
                      )}
                      <div className="truncate">
                        <span className="block truncate">{option.label}</span>
                        {option.description && (
                          <span
                            className={clsx(
                              "block text-[11px] truncate",
                              isSelected ? "text-white/80" : "text-[var(--text-faint)]"
                            )}
                          >
                            {option.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {option.badge && (
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-[var(--bg-paper)] text-[var(--text-muted)] border border-[var(--border-paper)]"
                          )}
                        >
                          {option.badge}
                        </span>
                      )}
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
