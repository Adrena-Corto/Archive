# Handoff: PWA Support & Sumerian Dreams Article

**Date:** 2026-01-26
**Session:** PWA implementation and new article creation

---

## What Was Completed

### 1. PWA Support Added

Made the site installable on iOS/Android home screens.

**Files Created:**
- `archive/public/manifest.webmanifest` - Web app manifest
- `archive/public/favicon-192.png` - Android icon
- `archive/public/favicon-512.png` - Android icon (large)
- `archive/public/favicon-512-maskable.png` - Android adaptive icon (with safe zone)
- `archive/public/splash/splash-*.png` - 3 iOS splash screens for modern iPhones

**Files Modified:**
- `archive/src/layouts/BaseLayout.astro`:
  - Added `viewport-fit=cover` for notch/Dynamic Island
  - Added manifest link
  - Added iOS PWA meta tags (`apple-mobile-web-app-capable`, status bar style, title)
  - Added iOS splash screen links
  - Added `pt-[env(safe-area-inset-top)]` to header for safe-area padding
- `archive/public/sw.js`:
  - Bumped cache to `archive-v3`
  - Added manifest to cache patterns
  - Added precaching for `/`, `/coins`, `/artifacts`

**To Test:**
- iPhone: Safari → Share → Add to Home Screen → Launch from home screen
- Android: Chrome → menu → Install app

### 2. New Article: Sumerian Dream Incubation

**File:** `archive/src/content/articles/sumerian-dream-incubation.md`

**Topic:** Temple incubation rituals in ancient Sumer - how Sumerians sought divine messages through ritual sleep in temples.

**Key Sections:**
- The liminal threshold (dreams as apertures to the divine)
- Architecture of sacred sleep (gipar chambers, purification rituals)
- Cuneiform dream omen visualization (with actual cuneiform text)
- Gudea's famous temple dream
- Dream interpreters (šā'ilu)
- Civic importance of dreams

**Pending:** User mentioned they have a seal to add later that matches this article. When ready, add a `collection-embed` block to feature the item.

---

## Commits Made

1. `113199b` - Add PWA support for Add to Home Screen
2. `6794fd4` - Add article: The Sacred Sleep - Dream Incubation in Ancient Sumer (after rebase)

---

## Notes

- Newsletter draft created at buttondown.com/emails with 3 new articles (including this one)
- The article uses cuneiform visualization with `Noto Sans Cuneiform` font
- Tone is between scholarly and poetic per user preference

---

## Next Session

- User may want to add a seal item that connects to the dream incubation article
- Review newsletter draft and send if desired
