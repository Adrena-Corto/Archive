# Handoff: Performance Regression Investigation

**Date:** 2026-01-19
**Status:** REGRESSION - Score dropped from 61 → 38
**Branch:** master (2 commits ahead of origin)

## Problem

After applying "performance optimizations", mobile score got **worse**:

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Score | 61 | **38** | -23 |
| FCP | 5.4s | 5.4s | same |
| LCP | 7.3s | 7.4s | +0.1s |
| TBT | 10ms | **980ms** | +970ms! |
| Speed Index | 6.2s | 7.0s | +0.8s |
| CLS | 0 | 0 | same |

## Key Issue: TBT exploded from 10ms to 980ms

Something in the changes is now blocking the main thread for ~1 second.

## Changes Made (Need Review)

### 1. BlurImage.astro
- Changed `src` from original JPG to `-medium.webp`
- Changed canvas size from `offsetWidth/offsetHeight` to fixed `32x32`
- Added `requestIdleCallback` batching

**Suspect:** The batching logic might be causing issues, OR the 32x32 canvas change might be triggering something

### 2. BaseLayout.astro
- Removed font prefetch tags
- Changed specialty fonts to `font-display: optional`

**Suspect:** Removing prefetch might have changed loading order

### 3. matrix-effect.ts
- Added PerformanceObserver for LCP detection
- Added `shouldSkip()` checks

**Suspect:** The PerformanceObserver with `buffered: true` might be causing issues

### 4. global.css
- Reduced blur on mobile (8px vs 12px)
- Added prefers-reduced-motion check for smooth scroll

**Unlikely** to cause TBT issues

## Investigation Steps

1. **Check if it's the BlurImage batching:**
   - The `requestIdleCallback` with timeout might be processing all images at once
   - The batch processing loop might be too aggressive

2. **Check the PerformanceObserver:**
   - `buffered: true` retrieves all past LCP entries
   - Might be causing sync work

3. **Test each change in isolation:**
   - Revert matrix-effect changes, test
   - Revert BlurImage changes, test
   - etc.

## Files Changed

```
archive/src/components/BlurImage.astro
archive/src/layouts/BaseLayout.astro
archive/src/scripts/matrix-effect.ts
archive/src/styles/global.css
```

## Git Status

```
master: 2 commits ahead of origin
- dbf7a28: "Improve mobile performance with LCP-aware loading"
- 9249046: "Fix critical mobile performance issues (FCP/LCP)"
```

To revert if needed:
```bash
git reset --hard HEAD~2  # Revert both commits
# OR
git revert HEAD~1..HEAD  # Create revert commits
```

## Next Session Tasks

1. Run local Lighthouse to get detailed trace
2. Identify which specific change caused the TBT spike
3. Fix or revert the problematic change
4. Test incrementally before deploying
