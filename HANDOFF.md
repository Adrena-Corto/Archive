# Handoff: Mobile Image Gallery Fix

**Date:** 2026-01-21
**Session Focus:** Fixing mobile image display on item detail pages

---

## What Was Done

### Mobile Image Gallery Fix

**Problem:** On mobile, images in the item detail page gallery weren't displaying correctly - either appearing too zoomed/small or showing letterboxing bands.

**Solution:** Used `max-md:` Tailwind prefix to apply mobile-only styles:

```css
/* Desktop (md and up): */
w-full h-auto  /* Original behavior - images scale naturally based on width */

/* Mobile (below md): */
max-md:h-full max-md:object-cover  /* Fill container, crop if needed */
```

**File changed:** [archive/src/pages/item/[id].astro](archive/src/pages/item/[id].astro) line ~302

**Commit:** `b21ce40` - Use object-cover on mobile for item images

---

## Additional Changes in File

The item detail page also received touch magnifier improvements during this session:
- Hold-to-activate pattern (150ms delay prevents accidental activation)
- Context menu prevention
- Touch cancel handling
- Select prevention styles

---

## Testing Notes

Verified on both mobile (390px) and desktop (1280px) viewports:
- **Mobile:** Images fill the container properly with `object-cover`
- **Desktop:** Images scale naturally with `h-auto`, no letterboxing

**Cache note:** GitHub Pages has 10-minute cache TTL. Use `?v=N` query param to bust cache when testing.

---

## Status

- ✅ Mobile image display fixed
- ✅ Desktop unchanged (no regression)
- ✅ Deployed to production

---

## Previous Session (2026-01-20)

Created article **"Against All Odds: How Ancient Objects Survive"** covering relic survival statistics and preservation bias. See `archive/src/content/articles/against-all-odds.md`.
