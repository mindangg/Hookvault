import React from "react";

interface HookBoxProps {
  hook: string;
}

export function HookBox({ hook }: HookBoxProps) {
  return (
    <div className="bg-white/[0.06] border border-white/[0.10] rounded-xl p-4 mb-6">
      <p className="text-white/30 text-xs tracking-widest uppercase mb-2">Hook</p>
      <p className="text-white/90 text-base leading-relaxed">{hook}</p>
    </div>
  );
}
