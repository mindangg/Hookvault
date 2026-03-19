import React from "react";
import { WordCount } from "./WordCount";
import { CopyButton } from "./CopyButton";

interface TranscriptPanelProps {
  text: string;
}

export function TranscriptPanel({ text }: TranscriptPanelProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-1">
        <WordCount text={text} />
        <CopyButton text={text} />
      </div>
      <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
    </div>
  );
}
