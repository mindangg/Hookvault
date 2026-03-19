"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg",
        "bg-white/[0.06] text-white/70 border border-white/[0.08]",
        "hover:bg-white/[0.10] hover:text-white/90 transition-all duration-200",
        className
      )}
    >
      {copied ? (
        <>
          <span>✓</span>
          <span>Copied</span>
        </>
      ) : (
        <>
          <span>⎘</span>
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
