import { NextRequest, NextResponse } from "next/server";
import { detectPlatform, validateUrl, isLikelyVietnamese } from "@/lib/utils";
import { transcribeVideo } from "@/lib/supadata";
import { translateToVietnamese } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body as { url: string };

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!validateUrl(url)) {
      return NextResponse.json(
        { error: "Please paste a valid TikTok, Instagram Reel, or YouTube Shorts URL." },
        { status: 400 }
      );
    }

    const platform = detectPlatform(url);
    if (!platform) {
      return NextResponse.json({ error: "Unsupported platform" }, { status: 400 });
    }

    // Transcribe video
    const transcript = await transcribeVideo(url, platform);

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract transcript from this video. Make sure the video has spoken audio." },
        { status: 422 }
      );
    }

    // Translate to Vietnamese, unless the transcript already is Vietnamese
    const translation = isLikelyVietnamese(transcript)
      ? null
      : await translateToVietnamese(transcript);

    return NextResponse.json({ script: transcript, translation, platform });
  } catch (err: unknown) {
    console.error("Analyze error:", err);
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
