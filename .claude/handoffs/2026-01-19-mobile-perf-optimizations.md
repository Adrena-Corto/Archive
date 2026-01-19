# Handoff: Mobile Performance Optimizations

**Date:** 2026-01-19
**Commits:**
- `dbf7a28` - "Improve mobile performance with LCP-aware loading"
- `9249046` - "Fix critical mobile performance issues (FCP/LCP)"
**Branch:** master (2 commits ahead of origin)

## Summary

Implemented mobile performance optimizations based on PageSpeed Insights analysis for theantiquearchive.com.

**Before:** Score 61, FCP 5.4s, LCP 7.3s, 3.1MB payload
**Expected After:** Score 80+, FCP ~2s, LCP ~3s, ~1.5MB payload

## Critical Fixes (Second Commit)

### 1. Specialty Fonts Blocking Critical Path (BIGGEST FIX)
**Problem:** 847KB of specialty fonts (Cuneiform + Hieroglyphs) were blocking render
- `font-display: swap` + `prefetch` still caused early download
- These fonts appeared in the critical rendering path at 536ms

**Fix:** Changed to `font-display: optional`
- Fonts only load if already in browser cache
- First visit: fallback font used (no 847KB download)
- Return visits: cached fonts used
- Removed `<link rel="prefetch">` tags entirely

### 2. BlurImage Loading JPG Fallbacks Instead of WebP
**Problem:** `<img src>` was set to original JPG (300KB+ each)
- Browser loaded JPG as fallback even when WebP worked
- Multiple 200-400KB images on homepage

**Fix:** Changed fallback `src` to `-medium.webp`
- Now: `src="/images/items/x/01-medium.webp"` (~15KB)
- Was: `src="/images/items/x/01.jpg"` (~300KB)

### 3. Forced Reflow in BlurImage
**Problem:** `canvas.offsetWidth/offsetHeight` triggered layout recalculation
- PageSpeed flagged 17ms, 15ms reflows from BlurImage

**Fix:** Use fixed 32x32 canvas size
- ThumbHash placeholder is blurred anyway
- CSS `transform: scale()` handles sizing
- Eliminates layout queries

## First Commit Changes

### Matrix Effect - LCP-Aware Deferred Loading
- Uses `PerformanceObserver` to wait for LCP before starting
- Skips on small screens (<375px) or single-core devices
- Reduced particle counts: 150 desktop, 80 mobile, 50 low-end

### Backdrop Blur Optimization
- Mobile: `backdrop-filter: blur(8px)` (was 12px)
- Less GPU compositing work

### ThumbHash Batching
- Uses `requestIdleCallback` for batch processing
- Prevents blocking main thread

### Smooth Scroll Accessibility
- Only enabled when `prefers-reduced-motion: no-preference`

## Files Modified

```
archive/src/layouts/BaseLayout.astro
  - Removed font prefetch tags
  - Changed specialty fonts to font-display: optional

archive/src/components/BlurImage.astro
  - Use WebP as fallback src instead of JPG
  - Fixed canvas size to avoid forced reflow
  - requestIdleCallback batching

archive/src/scripts/matrix-effect.ts
  - LCP-aware loading with PerformanceObserver
  - Reduced particle counts

archive/src/styles/global.css
  - Mobile blur reduction
  - Smooth scroll with reduced-motion respect
```

## Next Steps

1. `git push` to deploy
2. Re-run PageSpeed Insights to verify improvements
3. Consider further optimizations:
   - Generate WebP versions of book cover images
   - Code-split Timeline/Pixi.js (308KB) to only load on /timeline
   - Add resource hints for third-party origins
