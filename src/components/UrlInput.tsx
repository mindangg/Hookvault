"use client";
import React, { useState } from "react";
import { detectPlatform, Platform } from "@/lib/utils";
import { PlatformBadge } from "./PlatformBadge";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export function UrlInput({ onAnalyze, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState<Platform>(null);

  const handleChange = (val: string) => {
    setUrl(val);
    setPlatform(detectPlatform(val));
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleChange(text.trim());
    } catch {
      // Permission denied or not supported
    }
  };

  const handleSubmit = () => {
    if (url.trim() && !isLoading) {
      onAnalyze(url.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="url"
            value={url}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste a TikTok, Reel, or Shorts URL..."
            className="w-full bg-white/[0.04] border border-white/[0.08] text-white/90 placeholder:text-white/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={handlePaste}
          disabled={isLoading}
          className="px-4 bg-white/[0.06] text-white/70 border border-white/[0.08] text-sm rounded-xl hover:bg-white/[0.10] hover:text-white/90 transition-all duration-200 whitespace-nowrap disabled:opacity-40"
        >
          Paste
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading || !url.trim()}
          className="px-5 bg-white text-black font-semibold text-sm rounded-xl hover:bg-white/90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Analyze
        </button>
      </div>

      {platform && (
        <div className="flex items-center gap-2">
          <PlatformBadge platform={platform} />
        </div>
      )}
    </div>
  );
}
