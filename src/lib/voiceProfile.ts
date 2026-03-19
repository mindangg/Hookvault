const STORAGE_KEY = "hookvault_voice_profile";

export function getVoiceProfile(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function saveVoiceProfile(samples: string): void {
  localStorage.setItem(STORAGE_KEY, samples);
}

export function clearVoiceProfile(): void {
  localStorage.removeItem(STORAGE_KEY);
}
