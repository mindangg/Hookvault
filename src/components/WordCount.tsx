import React from "react";

interface WordCountProps {
  text: string;
}

export function WordCount({ text }: WordCountProps) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const readTimeMin = Math.ceil(words / 200);
  const readTimeLabel = readTimeMin <= 1 ? "< 1 min read" : `${readTimeMin} min read`;

  return (
    <div className="flex items-center gap-3 text-white/30 text-xs mb-4">
      <span>{words.toLocaleString()} words</span>
      <span>·</span>
      <span>{readTimeLabel}</span>
    </div>
  );
}
