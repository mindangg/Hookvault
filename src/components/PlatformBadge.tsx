import React from "react";
import { Platform } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PlatformBadgeProps {
  platform: Platform;
}

const config: Record<NonNullable<Platform>, { label: string; className: string; icon: string }> = {
  youtube: {
    label: "YouTube Shorts",
    className: "bg-red-950/60 text-red-300 border border-red-900/40",
    icon: "▶",
  },
  tiktok: {
    label: "TikTok",
    className: "bg-white/[0.06] text-white/80 border border-white/[0.08]",
    icon: "♪",
  },
  instagram: {
    label: "Instagram Reel",
    className: "bg-purple-950/60 text-purple-300 border border-purple-900/40",
    icon: "◈",
  },
};

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  if (!platform) return null;
  const { label, className, icon } = config[platform];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
        className
      )}
    >
      <span>{icon}</span>
      {label}
    </span>
  );
}
