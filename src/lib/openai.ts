const BASE_URL = "https://api.openai.com/v1";

export async function translateToVietnamese(text: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You translate video transcripts into natural, fluent Vietnamese. Return only the translated text, with no extra commentary.",
        },
        { role: "user", content: text },
      ],
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const translation = data.choices?.[0]?.message?.content;

  if (!translation) {
    throw new Error("Could not translate transcript with OpenAI");
  }

  return translation.trim();
}
