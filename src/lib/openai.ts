import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ScriptSection {
  timestamp: string;
  section_name: string;
  content: string;
  purpose: string;
  technique: string;
}

export interface ScriptStructure {
  title: string;
  sections: ScriptSection[];
  overall_formula: string;
  reuse_tip: string;
}

export interface AnalysisResult {
  hook_en: string;
  hook_vi: string;
  hook_my: string;
  transcript_en: string;
  transcript_vi: string;
  transcript_my: string;
  script_structure: ScriptStructure;
}

export async function analyzeTranscript(
  transcript: string,
  voiceProfile: string | null
): Promise<AnalysisResult> {
  const voiceProfileSection = voiceProfile
    ? `Here are samples of how I write in Vietnamese:\n${voiceProfile}\nStudy my vocabulary, sentence length, tone, and style carefully.`
    : "";

  const myVersionInstruction = voiceProfile
    ? "Match my exact Vietnamese writing style from the samples above."
    : "No voice profile provided. Write in natural conversational Vietnamese.";

  const prompt = `You are a viral content strategist and Vietnamese copywriter.

Here is a word-for-word English transcript from a short-form video:
${transcript}

${voiceProfileSection}

Return a JSON object with exactly these fields:
{
  "hook_en": "The hook in English — first 1-3 sentences that grab attention, taken word for word from the transcript",
  "hook_vi": "The hook translated naturally to Vietnamese",
  "hook_my": "The hook rewritten in My Voice style in Vietnamese. ${myVersionInstruction}",
  "transcript_en": "The full transcript exactly word for word as spoken, no changes",
  "transcript_vi": "The full transcript translated naturally to Vietnamese",
  "transcript_my": "The full script rewritten in My Voice style in Vietnamese. ${myVersionInstruction}",
  "script_structure": {
    "title": "Short title for this video formula",
    "sections": [
      {
        "timestamp": "0-3s",
        "section_name": "Hook",
        "content": "Exact words used in this section",
        "purpose": "Why this works psychologically",
        "technique": "e.g. Bold Claim, Open Loop, Shock, Question, Story, Social Proof, CTA"
      }
    ],
    "overall_formula": "1-2 sentence summary of the formula",
    "reuse_tip": "How to reuse this structure for a different niche"
  }
}

Return only valid JSON, no markdown, no extra text.`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    max_tokens: 4000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from OpenAI");

  return JSON.parse(content) as AnalysisResult;
}
