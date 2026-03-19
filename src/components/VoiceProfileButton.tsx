"use client";
import React from "react";

interface VoiceProfileButtonProps {
  onClick: () => void;
  hasProfile: boolean;
}

export function VoiceProfileButton({ onClick, hasProfile }: VoiceProfileButtonProps) {
  return (
    <button
      onClick={onClick}
      title="Voice Profile Settings"
      className="fixed top-6 right-6 z-50 flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/60 hover:bg-white/[0.10] hover:text-white/90 transition-all duration-200"
    >
      {hasProfile ? (
        <span className="text-sm">⚙</span>
      ) : (
        <span className="text-sm">⚙</span>
      )}
      {hasProfile && (
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white/60" />
      )}
    </button>
  );
}
