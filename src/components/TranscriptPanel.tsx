import React from "react";
import { WordCount } from "./WordCount";
import { CopyButton } from "./CopyButton";

interface TranscriptPanelProps {
  text: string;
  translation?: string | null;
}

export function TranscriptPanel({ text, translation }: TranscriptPanelProps) {
  const showTranslation =
    !!translation && translation.trim().toLowerCase() !== text.trim().toLowerCase();

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-1">
        <WordCount text={text} />
        <CopyButton text={text} />
      </div>
      <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{text}</p>

      {showTranslation && (
        <div className="mt-6 pt-6 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/30 text-xs tracking-widest uppercase">Tiếng Việt</span>
            <CopyButton text={translation} />
          </div>
          <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{translation}</p>
        </div>
      )}
    </div>
  );
}
