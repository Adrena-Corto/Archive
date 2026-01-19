# Tweet Thread: The Antique Archive

## Overview
- **Total tweets**: 11
- **Theme**: Ancient artifacts meet modern AI
- **Key hook**: 5,000-year-old collection cataloged with Claude

---

## Quick Start with Typefully

### 1. Capture Screenshots
```bash
# Start dev server in one terminal
cd ~/CascadeProjects/windsurf-project-3/archive && pnpm dev

# Run capture script in another terminal
cd ~/CascadeProjects/windsurf-project-3/twitter-visuals
./capture-screenshots.sh
```

### 2. Import to Typefully
1. Go to [typefully.com](https://typefully.com) and sign in
2. Click "New Draft" → "Thread"
3. Copy the content from `typefully-thread.txt`
4. Paste into Typefully (it auto-splits on `---`)
5. Attach images from the `screenshots/` folder to each tweet
6. Schedule or post!

### 3. Record Decipher Animation
For tweet #8, record a 5-second GIF:
- Use **Kap** (free) or **CleanShot X**
- Hover over the cuneiform button on the homepage
- Capture the decrypt animation

---

## Visuals Checklist

| Tweet | Visual Needed | How to Capture |
|-------|---------------|----------------|
| 1 | Hero with cuneiform buttons | Screenshot homepage |
| 2 | 4-item grid (seal, scarab, coins) | Composite or collection page |
| 3 | Stats visualization | Open `stats.html` in browser |
| 4 | Bento grid UI | Screenshot homepage scrolled down |
| 5 | Item detail page | Screenshot `/item/egyptian-scarab` |
| 6 | Lightbox setup or before/after | Your own photo |
| 7 | Timeline visualization | Screenshot `/timeline` |
| 8 | Decipher animation | Screen record hover on buttons (GIF) |
| 9 | Scarab + AI description side-by-side | Composite |
| 10 | Collection count or "more coming" | Stats card or site screenshot |
| 11 | Mobile + desktop side-by-side | Composite |

### How to View Stats Visualization

```bash
# Option 1: Open directly in browser
open /Users/acammm/CascadeProjects/windsurf-project-3/twitter-visuals/stats.html

# Option 2: Or just double-click the file in Finder
# Location: windsurf-project-3/twitter-visuals/stats.html
```

### How to Capture Site Screenshots

```bash
# Start dev server
cd ~/CascadeProjects/windsurf-project-3/archive && pnpm dev

# Then visit in browser:
# - http://localhost:4321              (homepage)
# - http://localhost:4321/timeline     (timeline)
# - http://localhost:4321/item/egyptian-scarab
# - http://localhost:4321/coins
```

---

## The Thread

### Tweet 1 - Hook
```
I collect things that are 5,000 years old.

I built a website to catalog them using Claude.

A cylinder seal from ancient Mesopotamia. A scarab inscribed to Amun-Ra. Coins from Marcus Aurelius.

Here's how ancient history meets modern AI 🧵
```
**Image**: Hero shot with cuneiform/Greek buttons

---

### Tweet 2 - The Collection
```
The collection spans 6,000 years:

• Mesopotamian cylinder seals (3400 BCE)
• Egyptian faience scarabs
• Roman imperial denarii
• Byzantine gold
• Sasanian stamp seals

Each piece outlived empires. Now cataloged on a static site that loads in 200ms.
```
**Image**: 4-item grid showing variety

---

### Tweet 3 - Stats
```
The numbers:

10,175 lines of code
29 commits
~20 Claude sessions
30 components
19 artifacts cataloged
6 articles written

10 days from "init - no design" to production.
```
**Image**: Stats visualization (stats.html)

---

### Tweet 4 - Tech Stack
```
The stack:

• Astro 5 - static generation
• Tailwind - styling
• Alpine.js - interactivity
• Pagefind - client-side search
• PixiJS - timeline visualization
• ThumbHash - blur placeholders
• Sharp - image optimization
• Service Workers - offline caching

All configured by Claude. I just said "make it feel like a museum."
```
**Image**: Bento grid showing polished UI

---

### Tweet 5 - Workflow
```
The workflow:

1. Photograph item in lightbox
2. "Hey Claude, catalog this scarab"
3. Claude optimizes images, writes YAML, identifies hieroglyphs
4. git push

From inbox to live in minutes.
```
**Image**: Scarab detail page with metadata

---

### Tweet 6 - Photography
```
The hardest part? Not the code. The photography.

Claude recommended:
• Fujifilm X-T50 + XF 16-50mm lens
• f/8-f/11, ISO 160 base
• SANOTO lightbox
• ImageMagick processing pipeline

Even taught me hieroglyphs read right-to-left—scarab bases often need 180° rotation.
```
**Image**: Lightbox setup or before/after photo comparison

---

### Tweet 7 - Philosophy
```
There's something poetic about it:

5,000-year-old objects cataloged by AI that's 2 years old.

Cuneiform—humanity's first writing—displayed alongside code that writes itself.

The ancients invented recordkeeping. We're continuing the tradition.
```
**Image**: Timeline spanning 4500 BCE to 1500 AD

---

### Tweet 8 - Features
```
Favorite details:

• Buttons "decrypt" from cuneiform/Greek to English on hover
• Interactive timeline spans 4500 BCE to 1500 AD
• Image magnifier for examining inscriptions
• Dark mode that feels like a museum vault
```
**Video/GIF**: Decipher button animation (5 seconds)

---

### Tweet 9 - AI Reveal
```
One more thing.

This tweet thread? Written by Claude.
Item descriptions? AI.
The article on Marcus Aurelius coins? AI.
Hieroglyph identification? AI.

The only things that aren't AI:
• The photographs
• The weight measurements
• The artifacts themselves

Those are 5,000 years old.
```
**Image**: Side-by-side of AI description + real artifact photo

---

### Tweet 10 - Living Collection
```
This is a living archive.

19 items cataloged. More coming as I photograph the rest.

Photography is the bottleneck—each piece needs multiple angles, proper lighting, patience.

The code is done. The cataloging continues.

Follow along as the archive grows.
```
**Image**: Collection count stat or "more coming" tease

---

### Tweet 11 - CTA
```
🔗 theantiquearchive.com

10 days. ~90% AI-generated code and content.

The past isn't dead. It's just waiting to be archived.
```
**Image**: Mobile + desktop side-by-side

---

## Posting Tips

1. **Best times**: Tuesday-Thursday, 9-11am EST
2. **Tag**: @AnthropicAI, @astaborjk (Astro), @tailwindcss
3. **Record GIF**: Use Kap, CleanShot X, or macOS screen recording for decipher animation
4. **Cross-post**: LinkedIn loves "passion project meets tech" stories

---

## Project Stats (for reference)

| Metric | Value |
|--------|-------|
| Lines of code | 10,175 |
| Commits | 29 |
| Claude sessions | ~20 |
| Components | 30 |
| Items cataloged | 19 |
| Articles | 6 |
| Development time | 10 days |
| Oldest artifact | ~3400 BCE (Uruk cylinder seal) |
| Time span covered | 6,000+ years |
