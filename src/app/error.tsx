"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="clay-card-static p-10 max-w-lg mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#B63A32]/10 text-[#B63A32] flex items-center justify-center mx-auto border border-[#B63A32]/20 shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#B63A32]">
          Rendering Interruption
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--text-ink)]">
          An Unexpected Event Occurred
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          The newsroom rendering pipeline encountered an exception while assembling this page. Our technical team has been notified.
        </p>
        <div className="pt-2">
          <ClayButton
            onClick={() => reset()}
            variant="primary"
            size="md"
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Attempt Recovery & Reload
          </ClayButton>
        </div>
      </div>
    </div>
  );
}
