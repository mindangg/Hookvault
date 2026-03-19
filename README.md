# HookVault

AI-powered hook analyzer for short-form video creators.

Paste a TikTok, Instagram Reel, or YouTube Shorts URL — get the hook, full transcript, Vietnamese translation, and a rewrite in your own voice. Plus a section-by-section script breakdown so you can steal the structure, not just the words.

---

## Who it's for

Vietnamese content creators who study viral short-form videos and want to adapt proven hooks and script structures into their own content — without sounding like a copy-paste.

---

## What you get

| Tab | What it shows |
|-----|--------------|
| **Hook** | Opening 1–3 sentences pulled word-for-word from the transcript |
| **Transcript** | Full word-for-word transcription in English + Vietnamese |
| **My Voice** | Script rewritten in your personal Vietnamese style (requires Voice Profile) |
| **Script Structure** | Section-by-section breakdown with timestamps, purpose, and technique labels |

---

## Voice Profile

Paste 3–5 samples of your own Vietnamese writing — captions, scripts, messages. Every analysis will rewrite the script to match your exact tone, vocabulary, and sentence style.

Your profile is saved locally in your browser. Never stored on any server.

---

## Setup

**Requirements:** Node.js v18+

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
```

Add your keys to `.env.local`:

```
OPENAI_API_KEY=        # platform.openai.com/api-keys
SUPADATA_API_KEY=      # supadata.ai
```

```bash
# 3. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Supported platforms

- TikTok
- Instagram Reels
- YouTube Shorts

---

## Tech stack

- **Next.js 15** (App Router) + React 19 + TypeScript 5
- **Tailwind CSS v4**
- **Supadata API** — video transcription
- **OpenAI gpt-4o-mini** — translation, hook extraction, script analysis
- **Framer Motion** + **Spline** — hero animations
