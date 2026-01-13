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
4. Run `pnpm build` to regenerate search index

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
    -resize 1400x1400 \
    -quality 85 \
    "$OUTPUT"
done
```

#### Alternative: Center Crop (only for well-centered shots)

Only use if object is centered in frame - off-center objects get cut off:

```bash
magick "$img" \
  -gravity center -crop 50%x50%+0+0 +repage \
  -resize 1400x1400 \
  -quality 85 \
  "$OUTPUT"
```

**Note:** Auto-centering via trim+extend doesn't work well - lightbox gradient creates visible seams. If object is off-center, either retake the photo or use simple resize.

#### Other Operations

```bash
# Rotate 180° (e.g., seal bases with hieroglyphs)
magick image.jpg -rotate 180 image.jpg
```

**Key settings:**
- Max dimension: 1400px
- Quality: 85%
- Format: JPEG

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
  <a href="/Archive/items/ITEM-ID">
    <div class="collection-embed-images grid-cols-2">
      <img src="/Archive/images/items/ITEM-ID/image1.jpg" alt="Description" />
      <img src="/Archive/images/items/ITEM-ID/image2.jpg" alt="Description" />
    </div>
  </a>
  <div class="collection-embed-info">
    <span class="collection-embed-label">From the Collection</span>
    <p class="collection-embed-caption">Caption describing the item and what to notice.</p>
    <a href="/Archive/items/ITEM-ID" class="collection-embed-link">
      View full item details
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </a>
  </div>
</div>
```

**Notes:**
- For single image, omit `grid-cols-2` class
- Always link to the item page (`/Archive/items/ITEM-ID`)
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
