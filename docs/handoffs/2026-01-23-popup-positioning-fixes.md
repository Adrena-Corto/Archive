# Handoff: Popup Positioning Fixes

**Date:** 2026-01-23
**Session:** Fix notification popups staying within viewport

## What Was Done

Fixed two issues with the notification popups on the homepage:

### 1. Changelog Popup Viewport Containment

**File:** `archive/src/components/ChangelogNotification.astro`

The changelog notification (v1.1.0) was going off-screen on the left. Added JavaScript to:
- Check if popup extends past the right edge of viewport
- Reposition to anchor from right if needed
- Detect overlap with article popup and stack above it
- Re-adjust on window resize

Key changes:
```javascript
const adjustPosition = () => {
  const articlePopup = document.getElementById('latest-article-popup');
  const rect = popup.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  // Check if popup would go off right edge (on narrow screens)
  if (rect.right > viewportWidth - 16) {
    popup.style.right = '1rem';
    popup.style.left = 'auto';
  }

  // Check if article popup is visible and would overlap
  if (articlePopup && !articlePopup.classList.contains('opacity-0')) {
    const articleRect = articlePopup.getBoundingClientRect();
    if (rect.right > articleRect.left - 16) {
      popup.style.bottom = `${window.innerHeight - articleRect.top + 16}px`;
    }
  }
};
```

### 2. Article Popup Link Navigation Fix

**File:** `archive/src/components/LatestArticlePopup.astro`

The "Read Article" link wasn't navigating due to View Transitions interference with fixed-positioned elements. Fixed by:
- Adding ID to the link (`popup-article-link`)
- Using `window.location.href` to force navigation instead of relying on View Transitions

```javascript
link.addEventListener('click', (e) => {
  localStorage.setItem(storageKey, articleId || '');
  const href = link.getAttribute('href');
  if (href) {
    e.preventDefault();
    window.location.href = href;
  }
});
```

## What's Pending

- **Not committed yet** - changes need to be tested and committed
- Consider whether both popups should use View Transitions or standard navigation

## Testing

1. Run `pnpm dev` in archive folder
2. Open homepage (clear localStorage first: `localStorage.clear()`)
3. Both popups should appear after 2-2.5 seconds
4. Changelog popup should stay within viewport bounds
5. Clicking "Read Article" should navigate to the article page

## Key Files Modified

- `archive/src/components/ChangelogNotification.astro` - Position adjustment logic
- `archive/src/components/LatestArticlePopup.astro` - Navigation fix

## Architecture Notes

- Both popups use `fixed` positioning with `z-50`
- Changelog shows at 2500ms delay, Article at 2000ms
- Both track dismissal in localStorage (`changelog-last-seen`, `dismissed-article`)
- Changelog has "Don't show again" option (`changelog-never-show`)

## Related Components

- `archive/src/layouts/BaseLayout.astro` - Contains ChangelogNotification
- `archive/src/pages/index.astro` - Contains LatestArticlePopup
