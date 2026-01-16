# Antiques & Coins Collection Website

## Overview

Static website showcasing a personal collection of coins, jewelry, rings, cylinder seals, and small antiques. Modern minimal aesthetic inspired by Palmer Dinnerware.

## Tech Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS
- **Interactivity**: Alpine.js (for filters)
- **Search**: Pagefind (static search)
- **Data**: YAML files in `src/data/items/`
- **Hosting**: GitHub Pages

## Code Principles

- Clean, minimal code
- No comments unless logic is non-obvious
- Mobile-first responsive design
- Semantic HTML for accessibility
- Optimize images with Astro's built-in tools

## File Structure

```
src/
  components/     # Reusable UI components
  layouts/        # Page layouts
  pages/          # Route pages
  data/
    items/        # YAML files for collection items
  styles/         # Global styles
  lib/            # Utilities
public/
  images/
    items/        # Item photographs
```

## Site Map

See `SITEMAP.md` for a visual map of all pages, routes, and navigation flows. **Keep this file up to date** when adding or modifying pages.

## Item Schema

Each item in `src/data/items/*.yaml`:

```yaml
id: unique-slug
name: "Item Name"
category: coin | jewelry | ring | seal | misc
era: "Date range or period"
period: "Historical period name"
origin: "Geographic origin"
material: gold | silver | bronze | other
weight: "Weight with unit"
dimensions: "Size description"
condition: "Condition grade"
description: "Detailed description"
images:
  - filename.jpg
tags: [tag1, tag2]
```

### Coin-Specific Fields (Required for Coins)

Coins have additional fields that power the hierarchical filter system on `/coins`:

```yaml
# Add these fields to coin items:
empire: roman | byzantine | greek | persian | islamic | other
denomination: "Denarius" | "Tetarteron" | "Solidus" | "Drachm" | etc.
ruler: "Marcus Aurelius" | "Constantine IX" | etc.
```

**Important:** The filter UI auto-generates from this data:
- New empires appear as pill buttons automatically
- New denominations/rulers appear as sub-filters under their empire
- Counts update automatically based on collection data

**Example coin YAML:**
```yaml
id: septimius-severus-denarius
name: "Septimius Severus Denarius"
category: coin
era: "193-211 AD"
period: "Roman Imperial"
origin: "Rome"
material: silver
condition: "VF"
empire: roman           # <- Required for coins
denomination: Denarius  # <- Required for coins
ruler: Septimius Severus # <- Required for coins
description: "Silver denarius of Emperor..."
images:
  - obverse.jpg
  - reverse.jpg
tags: [roman, denarius, silver, severan]
```

**Valid empire values:** `roman`, `byzantine`, `greek`, `persian`, `islamic`, `other`

When adding new empires, update `empireLabels` in `src/components/CoinFilterBar.astro` to add a display name.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm preview      # Preview production build
```

## Adding New Items

### Quick Method (Recommended)
Use `/add-item` skill - just share photos and describe the item. Claude handles:
- Image optimization and placement
- YAML file creation
- Proper naming conventions

### Manual Method
1. Add photos to `public/images/items/[item-id]/`
2. Create `src/data/items/[item-id].yaml`
3. Fill in item details (Claude can assist with identification)
4. Regenerate ThumbHash manifest: `node scripts/generate-thumbhash.mjs`
5. Run `pnpm build` to regenerate search index

### ThumbHash (Progressive Image Loading)

Images use ThumbHash placeholders for smooth loading. When adding new images:

```bash
cd archive
node scripts/generate-thumbhash.mjs
```

This updates `src/data/thumbhash-manifest.json` with blur placeholders for all images.

**How it works:**

- Script scans `public/images/items/` and generates 28-byte hashes
- Client decodes hash → renders blurry placeholder instantly
- When real image loads → crossfade transition

**Files involved:**

- `scripts/generate-thumbhash.mjs` - Generation script
- `src/data/thumbhash-manifest.json` - Hash manifest (auto-generated)
- `src/components/BlurImage.astro` - Reusable blur component

## Photography Workflow

Photos are captured with SANOTO lightbox. See `archive/photography/README.md` for details.

```
archive/photography/
├── inbox/          # Drop raw photos here
├── processed/      # Optimized images
├── archive/        # Original backups
└── templates/      # YAML templates
```

### Image Processing (ImageMagick)

**Requires:** `brew install imagemagick`

#### Default: Simple Resize (recommended)

Use this for most photos - preserves original framing, no artifacts:

```bash
ITEM_ID="item-name"
mkdir -p archive/public/images/items/$ITEM_ID

for img in ~/Desktop/"folder-name"/*.JPG; do
  OUTPUT="archive/public/images/items/$ITEM_ID/$(basename "$img" | tr '[:upper:]' '[:lower:]')"
  magick "$img" \
    -resize 2800x2800 \
    -quality 85 \
    "$OUTPUT"
done
```

**Key settings:**
- Max dimension: 2800px (supports magnifier zoom)
- Quality: 85%
- Format: JPEG

#### Other Operations

```bash
# Rotate 180° (e.g., seal bases with hieroglyphs)
magick image.jpg -rotate 180 image.jpg
```

**For seal/scarab bases:** Check hieroglyph orientation - may need 180° rotation for correct reading direction (right to left).

### Camera Equipment

- **Camera**: Fujifilm X-T50
- **Lens**: XF 16-50mm f/2.8-4.8 (minimum focus distance: 24cm)

### Recommended Settings

| Setting | Value |
|---------|-------|
| Mode | Aperture Priority (A) |
| Aperture | f/8 - f/11 |
| ISO | 160 (base ISO, dial on top left) |
| Focus | Manual with Focus Peaking enabled |
| White Balance | Auto or Custom (set for lightbox) |

### Tips for Small Items

- Zoom to 50mm for maximum magnification
- Get as close as the 24cm minimum allows
- Use 2-second timer to avoid camera shake
- For items under 2cm, consider macro extension tubes

## Writing Articles

Articles live in `archive/src/content/articles/*.md`.

### Collection Item Embeds

When featuring items from the collection in articles, use the `.collection-embed` block. This creates a distinct card that signals "from our collection" with clickable images and a link to the item page.

```html
<div class="collection-embed">
  <a href="/items/ITEM-ID">
    <div class="collection-embed-images grid-cols-2">
      <img src="/images/items/ITEM-ID/image1.jpg" alt="Description" />
      <img src="/images/items/ITEM-ID/image2.jpg" alt="Description" />
    </div>
  </a>
  <div class="collection-embed-info">
    <span class="collection-embed-label">From the Collection</span>
    <p class="collection-embed-caption">Caption describing the item and what to notice.</p>
    <a href="/items/ITEM-ID" class="collection-embed-link">
      View full item details
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </a>
  </div>
</div>
```

**Notes:**
- For single image, omit `grid-cols-2` class
- Always link to the item page (`/items/ITEM-ID`)
- Keep captions concise but informative

### Featured Items in Article List

Articles can display thumbnail previews of collection items on the articles index page. Add `featuredItems` to article frontmatter:

```yaml
---
title: "Article Title"
featuredItems: [item-id-1, item-id-2]
---
```

**Important:** Only add items to `featuredItems` if they actually appear in the article body via a `collection-embed`. This field is for surfacing embedded items in the article list UI, not for tagging related items.

## Design Guidelines

- **Colors**: White/off-white backgrounds, dark text
- **Typography**: Serif for headings, sans-serif for body
- **Spacing**: Generous whitespace
- **Images**: Large, high-quality, neutral backgrounds
- **Interactions**: Subtle hovers, smooth transitions

## Agents

Specialized agents in `.claude/agents/`. Use these by asking Claude to "use the [agent] agent" or referencing the task type.

| Agent | Use For |
|-------|---------|
| `frontend` | Astro components, Tailwind, Alpine.js, accessibility |
| `design` | Visual consistency, spacing, typography, Palmer aesthetic |
| `architect` | Technical decisions, tradeoffs, stack choices |
| `reviewer` | Code review before merging |
| `refactor` | Improving code without changing behavior |
| `debug` | Tracking down and fixing bugs |

Example prompts:
- "Use the design agent to review this component's spacing"
- "Use the frontend agent to build the filter component"
- "Review this PR with the reviewer agent"
