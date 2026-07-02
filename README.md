# HookVault

Paste a TikTok, Instagram Reel, or YouTube Shorts URL and get the video's spoken content back as a ready-to-reuse script, pulled directly from the transcript.

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
