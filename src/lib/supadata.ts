import { Platform } from "./utils";

const BASE_URL = "https://api.supadata.ai/v1";

export async function transcribeVideo(url: string, platform: Platform): Promise<string> {
  if (!platform) throw new Error("Unsupported platform");

  const endpoint = `${BASE_URL}/transcript?url=${encodeURIComponent(url)}&text=true`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      "x-api-key": process.env.SUPADATA_API_KEY!,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supadata error ${res.status}: ${err}`);
  }

  const data = await res.json();

  if (typeof data.content === "string") return data.content;
  if (Array.isArray(data.content)) {
    return data.content.map((s: { text: string }) => s.text).join(" ");
  }

  throw new Error("Could not extract transcript from Supadata response");
}