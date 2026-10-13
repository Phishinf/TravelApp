# Paul's Footsteps — Greece Pilgrimage & Study Guide

An interactive travel guide and study handbook for a 10-day pilgrimage that follows the Apostle Paul's missionary journeys through Greece (Kavala/Neapolis, Philippi, Thessaloniki, Berea, Meteora, and more). The content is mainly in Traditional Chinese, with English labels.

## Features

| Section | Description |
| --- | --- |
| **Itinerary** (行程) | A day-by-day schedule with theme verses, events, distances, and overnight stops. You can tick off events as you complete them, and each destination shows a live 3-day weather forecast. |
| **Biblical Sights** (聖經景點) | Details on each biblical site you visit. |
| **Paul's Journeys** (保羅行程) | Paul's missionary routes and their background in Acts. |
| **History** | An encyclopedia of historical background. |
| **Fathers & Martyrs** (教父殉道) | Profiles of church fathers and martyrs. |
| **Sacred Art & Icons** (聖像藝術) | A guide to Byzantine icons and sacred art. |
| **Devotional Hymns** (培靈詩歌) | Hymn lyrics, with melodies played in the browser through the Web Audio API. |
| **Study Notes & Journal** (研經日誌) | Personal reflections that can be started from a scripture verse or an itinerary day. |

The app also has global search, a scripture drawer, and bookmarks.

## Tech Stack

- **React 19** + **TypeScript**, built with **Vite**
- **Tailwind CSS v4** for styling
- **lucide-react** for icons and **motion** for animation
- **Open-Meteo API** for weather forecasts, which needs no API key. If the request fails, the app shows a regional estimate instead.
- **localStorage** for bookmarks, completed events, and journal entries. Nothing is stored on a server.

## Getting Started

**Prerequisites:** Node.js 18+

```bash
npm install
cp .env.example .env.local   # optional: set GEMINI_API_KEY
npm run dev                  # http://localhost:3000
```

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type-check with `tsc --noEmit` |

## Project Structure

```
src/
├── App.tsx          # App shell, tab routing, cross-section navigation
├── components/      # One folder per section, plus common/ (Header, Sidebar, Search, Scripture drawer)
├── data/            # Static content: itinerary, sights, history, fathers, art, hymns
├── services/        # storageService, weatherService, audioSynthService
└── types/           # Shared TypeScript types
```

To change the trip content, edit the files in `src/data/`.
