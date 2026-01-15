# Handoff: ThumbHash Progressive Image Loading

**Date:** 2026-01-15
**Status:** ~80% complete, needs testing and build integration

## What Was Done

### 1. Dependencies Installed
- `sharp` - image processing for hash generation
- `thumbhash` - hash encoding/decoding
- `@unlazy/core` - (installed but not used, can remove)

### 2. ThumbHash Generation Script
**File:** `archive/scripts/generate-thumbhash.mjs`

Generates a JSON manifest of ThumbHash strings for all images in `public/images/items/`.

```bash
cd archive && node scripts/generate-thumbhash.mjs
```

**Output:** `archive/src/data/thumbhash-manifest.json` (63 images currently)

### 3. Components Updated

| Component | Status | Notes |
|-----------|--------|-------|
| `BlurImage.astro` | ✅ Created | New reusable component with canvas placeholder |
| `ItemCard.astro` | ✅ Updated | Uses BlurImage |
| `CoinCard.astro` | ✅ Updated | Uses BlurImage |
| `item/[id].astro` | ✅ Updated | Canvas placeholders, preserves magnifier |
| `articles/[id].astro` | ✅ Updated | Dynamic JS for markdown embeds |

### 4. How It Works
1. At build time: ThumbHash (28-byte string) generated per image
2. At runtime: Client JS decodes hash → draws blurry placeholder on canvas
3. When image loads: Fade transition from placeholder to real image

## What Remains

### Must Do
1. **Test the build** - Run `pnpm build` and verify no errors
2. **Test in browser** - Check placeholders render and fade correctly
3. **Add to package.json scripts** - Automate hash generation before build

### Should Do
1. **Update CLAUDE.md** - Document workflow for adding new images
2. **Consider removing `@unlazy/core`** - Not actually used

### Nice to Have
1. **WebP conversion** - Could add sharp-based WebP generation for smaller files
2. **Astro Image component** - Full optimization (srcset, formats) - bigger refactor

## Adding New Images (Current Process)

When adding new item images:

1. Add photos to `archive/public/images/items/[item-id]/`
2. Create YAML in `archive/src/data/items/[item-id].yaml`
3. **Regenerate thumbhash manifest:**
   ```bash
   cd archive && node scripts/generate-thumbhash.mjs
   ```
4. Build: `pnpm build`

## Proposed Automation

Update `archive/package.json`:
```json
{
  "scripts": {
    "thumbhash": "node scripts/generate-thumbhash.mjs",
    "prebuild": "node scripts/generate-thumbhash.mjs",
    "build": "astro build && pagefind --site dist"
  }
}
```

This auto-generates hashes before every build.

## Files Changed

```
archive/
├── scripts/
│   └── generate-thumbhash.mjs          # NEW - hash generation
├── src/
│   ├── components/
│   │   ├── BlurImage.astro             # NEW - reusable blur component
│   │   ├── ItemCard.astro              # MODIFIED - uses BlurImage
│   │   └── CoinCard.astro              # MODIFIED - uses BlurImage
│   ├── data/
│   │   └── thumbhash-manifest.json     # NEW - generated manifest
│   └── pages/
│       ├── item/[id].astro             # MODIFIED - canvas placeholders
│       └── library/articles/[id].astro # MODIFIED - JS for embeds
└── package.json                        # MODIFIED - new deps
```

## Known Issues

- None identified yet - needs browser testing
- Article embed wrapper might affect CSS layout - verify visually

## Context for Next Session

The implementation is complete but untested. Next steps:
1. Run `pnpm dev` or `pnpm build` to verify
2. Test image loading in browser (throttle network to see effect)
3. Add the prebuild script automation
4. Update CLAUDE.md with new workflow
