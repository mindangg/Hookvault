import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Platform = "youtube" | "tiktok" | "instagram" | null;

export function detectPlatform(url: string): Platform {
  if (!url) return null;
  if (url.includes("youtube.com/shorts") || url.includes("youtu.be")) return "youtube";
  if (url.includes("tiktok.com")) return "tiktok";
  if (url.includes("instagram.com/reel") || url.includes("instagram.com/p/")) return "instagram";
  return null;
}

export function validateUrl(url: string): boolean {
  const platform = detectPlatform(url);
  return platform !== null;
}

const VIETNAMESE_CHARS = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

export function isLikelyVietnamese(text: string): boolean {
  if (!text) return false;
  return VIETNAMESE_CHARS.test(text);
}
