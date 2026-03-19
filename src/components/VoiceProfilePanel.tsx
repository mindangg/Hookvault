"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getVoiceProfile, saveVoiceProfile, clearVoiceProfile } from "@/lib/voiceProfile";

interface VoiceProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileChange: (profile: string | null) => void;
}

export function VoiceProfilePanel({ isOpen, onClose, onProfileChange }: VoiceProfilePanelProps) {
  const [samples, setSamples] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const existing = getVoiceProfile();
      setSamples(existing ?? "");
    }
  }, [isOpen]);

  const handleSave = () => {
    const trimmed = samples.trim();
    if (trimmed) {
      saveVoiceProfile(trimmed);
      onProfileChange(trimmed);
    } else {
      clearVoiceProfile();
      onProfileChange(null);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setSamples("");
    clearVoiceProfile();
    onProfileChange(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-96 max-w-full bg-black border-l border-white/[0.08] z-50 p-8 overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-all"
            >
              ✕
            </button>

            <h2 className="text-white/90 text-xl font-semibold mb-2">My Voice Profile</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Paste 3–5 samples of how you write in Vietnamese. GPT will study your style and rewrite
              every transcript to match.
            </p>

            <textarea
              value={samples}
              onChange={(e) => setSamples(e.target.value)}
              placeholder={`Paste your Vietnamese writing samples here...\n\nExample: your captions, scripts, messages — anything that shows how you naturally write in Vietnamese.`}
              className="w-full min-h-[300px] bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/20 rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-white text-black font-semibold text-sm py-2.5 rounded-xl hover:bg-white/90 transition-all duration-200"
              >
                {saved ? "✓ Saved!" : "Save Profile"}
              </button>
              <button
                onClick={handleClear}
                className="px-4 bg-white/[0.06] text-white/70 border border-white/[0.08] text-sm rounded-xl hover:bg-white/[0.10] hover:text-white/90 transition-all duration-200"
              >
                Clear
              </button>
            </div>

            <p className="text-white/20 text-xs mt-6 leading-relaxed">
              Your profile is saved locally in your browser. It never leaves your device unless you
              run an analysis.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
