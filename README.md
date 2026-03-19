# HookVault

AI-powered hook analyzer for TikTok, Instagram Reels, and YouTube Shorts. Transcribes, translates to Vietnamese, and rewrites in your personal writing style.

## Setup

1. Install Node.js v18+ from [nodejs.org](https://nodejs.org)
2. Clone the repo
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local.local
   ```
5. Add your API keys to `.env.local`:
   - `OPENAI_API_KEY` → [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - `SUPADATA_API_KEY` → [supadata.ai](https://supadata.ai)

6. Run the dev server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000)

## Using Voice Profile

1. Click the **⚙** gear icon in the top-right corner
2. Paste 3–5 samples of your Vietnamese writing (captions, scripts, messages)
3. Click **Save Profile**
4. Every analysis will now rewrite the transcript in your style automatically
5. A small dot indicator appears on the gear icon when a profile is active

## Features

- 🔗 Paste any TikTok, Instagram Reel, or YouTube Shorts URL
- 📋 Word-for-word English transcription via Supadata API
- 🇻🇳 Full Vietnamese translation
- ✍️ Personal voice rewrite (requires Voice Profile)
- 📊 Script structure breakdown with timing, purpose, and technique analysis
- 📎 One-click copy on every tab
- 💾 Voice profile saved locally in your browser

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- TypeScript 5
- OpenAI gpt-4o-mini
- Supadata API
- Motion (Framer Motion v12)
- Spline 3D scenes
# Hookvault
# Hookvault
