"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Newspaper, Sparkles, Feather, Image as ImageIcon } from "lucide-react";

interface EditorialImageProps extends Omit<ImageProps, "onError"> {
  fallbackCategory?: string;
  fallbackIcon?: "newspaper" | "feather" | "sparkles" | "general";
  aspectRatioClass?: string;
}

export function EditorialImage({
  src,
  alt,
  fallbackCategory = "INK Dispatch",
  fallbackIcon = "newspaper",
  className = "",
  fill,
  width,
  height,
  priority,
  sizes,
  ...rest
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(!src || src === "");

  if (hasError || !src) {
    return (
      <div
        className={`relative w-full h-full min-h-[160px] bg-gradient-to-br from-[var(--bg-subtle)] via-[var(--bg-surface)] to-[var(--border-paper)] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden border border-[var(--border-paper)] rounded-inherit group ${className}`}
      >
        {/* Subtle Decorative Background Geometric Watermark */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border border-[var(--accent-clay)]/20 pointer-events-none opacity-40 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute -left-4 -top-4 w-24 h-24 rounded-full border border-[var(--accent-gold)]/20 pointer-events-none opacity-30" />

        {/* Embossed Center Clay Icon Badge */}
        <div className="w-12 h-12 rounded-2xl bg-[var(--bg-paper)] border border-[var(--border-paper)] shadow-[var(--shadow-clay-sm)] flex items-center justify-center mb-3 text-[var(--accent-clay)] group-hover:rotate-6 transition-transform duration-300">
          {fallbackIcon === "feather" ? (
            <Feather className="w-5 h-5 text-[var(--accent-clay)]" />
          ) : fallbackIcon === "sparkles" ? (
            <Sparkles className="w-5 h-5 text-[var(--accent-gold)]" />
          ) : fallbackIcon === "newspaper" ? (
            <Newspaper className="w-5 h-5 text-[var(--accent-clay)]" />
          ) : (
            <ImageIcon className="w-5 h-5 text-[var(--text-faint)]" />
          )}
        </div>

        {/* Editorial Text Watermark */}
        <span className="font-editorial text-xs sm:text-sm font-bold text-[var(--text-ink)] tracking-tight">
          INK • Photographic Archive
        </span>
        <span className="text-[10px] uppercase tracking-widest font-semibold text-[var(--accent-clay)] mt-0.5">
          {fallbackCategory}
        </span>
        {alt && (
          <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 max-w-[85%] mt-1 italic font-serif opacity-80">
            {alt}
          </p>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "INK Newspaper Editorial Image"}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
}
