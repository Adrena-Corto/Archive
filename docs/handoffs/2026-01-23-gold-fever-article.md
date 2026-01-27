# Handoff: Gold Fever Article

**Date:** 2026-01-23
**Session:** Article writing for The Antique Archive

## What Was Done

Created and published a new article: **"Gold Fever: When Melt Value Meets History"**

- **File:** `archive/src/content/articles/gold-fever.md`
- **Live URL:** https://theantiquearchive.com/articles/gold-fever
- **Commit:** `3847d6c`

### Article Content

Market analysis piece covering:
- Gold hitting all-time high of $4,924/oz on January 22, 2026
- Premium compression effect on numismatic collectibles
- The paradox of ancient gold becoming simultaneously more/less valuable
- Counter-cyclical collecting strategies
- Featured the Constantine IX tetarteron from the collection

### Visualizations Included

1. **Gold Price Chart 2020-2026** - SVG line chart showing tripling from ~$1,500 to $4,924
2. **Premium Compression Diagram** - Bar chart showing how melt value eats into collector premium at different gold prices
3. **Math Box** - Survival rate calculation for ancient gold objects

### Sources Used

- Trading Economics (current gold prices)
- Investing News (all-time high data)
- Fortune (January 2026 price articles)
- CoinWeek (numismatic premium analysis)
- JM Bullion (bullion vs numismatics guide)

## What's Pending

- Newsletter draft created in Buttondown (ID: `269e5356-be35-4180-ad37-0cd91318f620`) - needs review and send
- Could add more gold items to article (hellenistic-gold-earring, gold-crystal-pendant)

## Collection Items Referenced

- `constantine-ix-tetarteron` - Featured with collection-embed block
- Other gold items available but not used:
  - `hellenistic-gold-earring` (2.69g gold)
  - `gold-crystal-pendant` (Hellenistic-Roman)

## Key Files

- Article: `archive/src/content/articles/gold-fever.md`
- Byzantine coin: `archive/src/data/items/constantine-ix-tetarteron.yaml`
- Article styling reference: `archive/src/content/articles/linear-minds-exponential-times.md`

## Notes for Next Session

- Article follows the site's visualization requirements (SVG charts, math boxes, collection embeds)
- Used the established color tokens: `#fbbf24` (gold), `#22d3ee` (cyan accent), `#52525b` (muted text)
- JetBrains Mono for all chart labels per design system
