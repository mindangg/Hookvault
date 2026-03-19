"use client";
import React, { useState, useEffect } from "react";
import { HeroScene } from "@/components/HeroScene";
import { UrlInput } from "@/components/UrlInput";
import { ResultTabs } from "@/components/ResultTabs";
import { VoiceProfilePanel } from "@/components/VoiceProfilePanel";
import { VoiceProfileButton } from "@/components/VoiceProfileButton";
import { AnalysisResult } from "@/lib/openai";
import { getVoiceProfile } from "@/lib/voiceProfile";

const STATUS_MESSAGES = [
  "Fetching transcript...",
  "Reading the video...",
  "Identifying the hook...",
  "Translating to Vietnamese...",
  "Analyzing script structure...",
  "Applying your voice profile...",
  "Almost done...",
];

export default function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [voiceProfile, setVoiceProfile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load voice profile from localStorage on mount
  useEffect(() => {
    const profile = getVoiceProfile();
    setVoiceProfile(profile);
  }, []);

  // Rotate status messages during loading
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setStatusIndex(0);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, voiceProfile }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Analysis failed");
      }

      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <VoiceProfileButton
        onClick={() => setIsProfileOpen(true)}
        hasProfile={!!voiceProfile}
      />

      <VoiceProfilePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onProfileChange={setVoiceProfile}
      />

      {/* Hero */}
      <HeroScene />

      {/* Main content */}
      <main className="bg-black min-h-screen pb-32">
        <div className="max-w-2xl mx-auto px-6 pt-16">
          {/* Eyebrow */}
          <p className="text-white/30 text-xs tracking-widest uppercase mb-3">
            AI-Powered Hook Analyzer
          </p>

          {/* Title */}
          <h1 className="text-white/90 text-3xl font-bold mb-2 tracking-tight">
            HookVault
          </h1>

          {/* Tagline */}
          <p className="text-white/40 text-base mb-8">
            Paste a video. Get the hook.
          </p>

          {/* Voice profile status */}
          {voiceProfile && (
            <p className="text-white/30 text-xs mb-6 flex items-center gap-1.5">
              <span className="text-white/50">✓</span> Voice profile active
            </p>
          )}

          {/* URL Input */}
          <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-3 text-white/45 text-sm">
                <div className="w-5 h-5 border border-white/20 border-t-white/80 rounded-full animate-spin" />
                <span>{STATUS_MESSAGES[statusIndex]}</span>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="mt-6 bg-red-950/40 border border-red-900/30 rounded-xl p-4">
              <p className="text-red-300/90 text-sm">{error}</p>
            </div>
          )}

          {/* Results */}
          {result && !isLoading && (
            <ResultTabs
              result={result}
              hasVoiceProfile={!!voiceProfile}
              onOpenVoiceProfile={() => setIsProfileOpen(true)}
            />
          )}
        </div>
      </main>
    </>
  );
}
