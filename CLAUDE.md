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

## Testing

The site uses Playwright for visual regression and E2E tests.

### Running Tests

```bash
cd archive

pnpm test           # Run all tests (requires build first)
pnpm test:ui        # Interactive UI mode
pnpm test:headed    # Run with visible browser
pnpm test:update    # Update visual snapshots
```

### Test Structure

```
tests/
├── visual-regression.spec.ts  # Screenshot comparisons for key pages
├── coin-filters.spec.ts       # E2E tests for /coins filter system
├── artifact-filters.spec.ts   # E2E tests for /artifacts filters
└── search.spec.ts             # E2E tests for search modal & page
```

### Visual Regression

Screenshots are stored in `tests/__screenshots__/`. When UI changes:

1. Run `pnpm test` to see failures
2. Review the diff in `playwright-report/`
3. If changes are intentional: `pnpm test:update`
4. Commit updated snapshots

### Writing New Tests

```typescript
import { test, expect } from '@playwright/test';

test('feature works', async ({ page }) => {
  await page.goto('/page');
  await page.click('button');
  await expect(page.locator('.result')).toBeVisible();
});
```

### CI Integration

Tests run automatically on PR via GitHub Actions (add `.github/workflows/test.yml` when ready).

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

### Article Visualizations (Required)

**Every article must include at least one data visualization.** Visualizations enhance comprehension and engagement. Use the established visual language:

**Colors:**
- Accent cyan: `#22d3ee`
- Gold highlights: `#fbbf24`
- Dark backgrounds: `#12121a`, `#0a0a0f`
- Muted text: `#71717a`, `#52525b`
- Borders: `#2a2a3a`, `#27272a`

**Visualization Types:**
- **SVG Charts** — Line graphs, bar charts, timelines (use `viewBox` for responsive scaling)
- **Math Boxes** — Formulas with `.math-box`, `.math-formula`, `.math-explanation` classes
- **Comparison Diagrams** — Side-by-side technical specs, before/after views
- **Interactive Simulations** — JavaScript-powered with scroll-triggered animations
- **Process Diagrams** — Step-by-step sequences (numbered panels)
- **Reference Grids** — Symbol decoders, classification matrices

**Styling Classes (defined in `[id].astro`):**
```css
.visualization-container  /* Wrapper with bg-surface, border, rounded */
.vis-header, .vis-label, .vis-sublabel  /* Header styling */
.math-box, .math-formula, .math-explanation  /* Math formatting */
.simulation-container  /* Interactive elements */
```

**Best Practices:**
- Use `font-family: 'JetBrains Mono', monospace` for labels and data
- Add aria-labels for accessibility
- Include `.vis-footnote` for data caveats
- For animations: 5 second duration, logarithmic time for decay curves
- Responsive: use `viewBox` for SVGs, percentage widths

**Example structure:**
```html
<div class="visualization-container">
  <div class="vis-header">
    <span class="vis-label">// Chart Title</span>
    <span class="vis-sublabel">Subtitle or context</span>
  </div>
  <svg viewBox="0 0 600 300" aria-label="Description">
    <!-- Chart content -->
  </svg>
  <div class="vis-footnote">Data source or caveat</div>
</div>
```

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

## Performance Testing

The site has automated performance testing using Lighthouse to ensure fast load times and excellent Core Web Vitals.

### Running Performance Tests

```bash
# Run automated Lighthouse tests on all key pages
node scripts/lighthouse-test.mjs
```

This tests 5 key pages (Homepage, Coins, Artifacts, Articles, Sample Item) on both mobile and desktop, generating a detailed report at `LIGHTHOUSE-REPORT.md`.

### Performance Workflow

1. **Test Current State**
   ```bash
   node scripts/lighthouse-test.mjs
   ```

2. **Review Report**
   ```bash
   cat LIGHTHOUSE-REPORT.md
   ```

3. **Identify Issues**
   - Look for scores below 90
   - Check LCP (target: <2.5s on mobile)
   - Check TBT (target: <200ms)
   - Review "Top Opportunities" for fixes

4. **Implement Fixes & Deploy**
   ```bash
   pnpm build
   git add -A && git commit -m "Performance: [description]"
   git push
   ```

5. **Wait & Retest** (GitHub Pages deployment takes ~3 minutes)
   ```bash
   sleep 180
   node scripts/lighthouse-test.mjs
   ```

### Current Performance (2026-01-19)

**Production URL:** `https://theantiquearchive.com`

| Page | Mobile | Desktop |
|------|--------|---------|
| Homepage | 100 | 100 |
| Coins | 92 | 95 |
| Artifacts | 91 | 96 |
| Articles | 87 | 100 |

### Performance Best Practices

**Images:**
- ✅ Use `BlurImage` component for progressive loading with ThumbHash
- ✅ Add `priority={true}` to first 6 cards on collection pages
- ✅ Add `loading="lazy"` to below-fold images
- ✅ Use WebP with responsive srcsets (400w, 800w)

**JavaScript:**
- ✅ Use `requestIdleCallback` for non-critical work (ThumbHash processing)
- ✅ Defer non-critical scripts
- ✅ Dynamic imports for heavy components (Timeline)

**Critical Resources:**
- ✅ `fetchpriority="high"` on LCP images
- ✅ `loading="eager"` for above-fold images
- ✅ Inline critical CSS

### Performance Scripts

- `scripts/lighthouse-test.mjs` - Automated Lighthouse testing
- `scripts/pagespeed-test.mjs` - PageSpeed API (rate-limited, use Lighthouse instead)
- `scripts/performance-iterate.mjs` - Test → analyze → suggest workflow

### Documentation

- `PERFORMANCE-WORKFLOW-SUMMARY.md` - Complete workflow guide
- `LIGHTHOUSE-REPORT.md` - Latest test results
- `PAGESPEED-WORKFLOW.md` - Manual testing workflow

## Design Consistency Testing

Automated design consistency auditing to ensure visual coherence across the site.

### Running Design Audit

```bash
# Run automated design consistency audit
node scripts/design-audit.mjs
```

This scans all components and pages for:

- Arbitrary values (non-token spacing, sizes)
- Deprecated color usage
- Border opacity consistency
- Typography scale adherence

### Design Workflow

1. **Run Audit**

   ```bash
   node scripts/design-audit.mjs
   ```

2. **Review Report**

   ```bash
   cat DESIGN-AUDIT-REPORT.md
   ```

3. **Fix Issues** - Address red issues first, then review warnings

4. **Re-audit** - Target score: 90+

### Current Design Score (2026-01-20)

| Metric       | Status                                   |
|--------------|------------------------------------------|
| Design Score | 89/100                                   |
| Issues       | 0                                        |
| Warnings     | 32 (mostly layout-specific constraints)  |

### Design Documentation

- `DESIGN-SYSTEM.md` - Color tokens, typography, spacing guidelines
- `DESIGN-CHECKLIST.md` - Manual visual review checklist
- `DESIGN-WORKFLOW.md` - Complete workflow guide
- `DESIGN-AUDIT-REPORT.md` - Latest audit results

### Design Tokens

```text
Colors:     void, surface, surface-light, text, text-muted, text-dim, accent, gold
Fonts:      font-sans (Space Grotesk), font-mono (JetBrains Mono)
Typography: text-micro (10px), text-tiny (11px), text-xs, text-sm, text-base...
Spacing:    Use Tailwind scale (p-4, gap-6, etc.) + custom spacing-4.5
Borders:    border-white/5, border-white/10, border-border
```

### Custom Typography Tokens

Added to `tailwind.config.mjs` to replace arbitrary `text-[10px]` and `text-[11px]`:

```js
fontSize: {
  'micro': ['10px', { lineHeight: '1.4' }],  // Badges, counts, dense UI
  'tiny': ['11px', { lineHeight: '1.4' }],   // Secondary labels
}
```

Use `text-micro` instead of `text-[10px]` throughout the codebase.

See `DESIGN-SYSTEM.md` for full reference.

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
