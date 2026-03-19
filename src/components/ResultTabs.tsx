"use client";
import React, { useState } from "react";
import { AnalysisResult } from "@/lib/openai";
import { HookBox } from "./HookBox";
import { TranscriptPanel } from "./TranscriptPanel";
import { ScriptStructure } from "./ScriptStructure";
import { cn } from "@/lib/utils";

interface ResultTabsProps {
  result: AnalysisResult;
  hasVoiceProfile: boolean;
  onOpenVoiceProfile: () => void;
}

type Tab = "en" | "vi" | "my" | "structure";

const tabs: { id: Tab; label: string }[] = [
  { id: "en", label: "EN Transcript 🇬🇧" },
  { id: "vi", label: "VI Transcript 🇻🇳" },
  { id: "my", label: "My Version ✍️" },
  { id: "structure", label: "Script Structure 📋" },
];

export function ResultTabs({ result, hasVoiceProfile, onOpenVoiceProfile }: ResultTabsProps) {
  const [active, setActive] = useState<Tab>("en");

  return (
    <div className="mt-8">
      {/* Tab bar */}
      <div className="flex border-b border-white/[0.08] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "px-4 py-3 text-sm whitespace-nowrap transition-all duration-200 -mb-px",
              active === tab.id
                ? "text-white/95 border-b-2 border-white/60"
                : "text-white/40 hover:text-white/70 border-b-2 border-transparent"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white/[0.03] border border-white/[0.08] border-t-0 rounded-b-xl p-6">
        {active === "en" && (
          <>
            <HookBox hook={result.hook_en} />
            <TranscriptPanel text={result.transcript_en} />
          </>
        )}

        {active === "vi" && (
          <>
            <HookBox hook={result.hook_vi} />
            <TranscriptPanel text={result.transcript_vi} />
          </>
        )}

        {active === "my" && (
          <>
            {hasVoiceProfile ? (
              <>
                <HookBox hook={result.hook_my} />
                <TranscriptPanel text={result.transcript_my} />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/30 text-sm mb-4">
                  Set up your voice profile to activate this tab
                </p>
                <button
                  onClick={onOpenVoiceProfile}
                  className="px-5 py-2.5 bg-white/[0.06] text-white/70 border border-white/[0.08] text-sm rounded-xl hover:bg-white/[0.10] hover:text-white/90 transition-all duration-200"
                >
                  Set Up Voice Profile →
                </button>
              </div>
            )}
          </>
        )}

        {active === "structure" && (
          <ScriptStructure data={result.script_structure} />
        )}
      </div>
    </div>
  );
}
