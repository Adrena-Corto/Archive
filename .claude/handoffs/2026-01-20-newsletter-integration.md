# Handoff: Newsletter Integration with Buttondown

**Date:** 2026-01-20
**Status:** Complete

---

## What Was Built

### Newsletter Signup Component
- **File:** `archive/src/components/NewsletterSignup.astro`
- Two variants: `compact` (footer) and `full` (article pages)
- Subscribers can choose: Articles only, New Items only, or both
- Uses Buttondown's public form endpoint (no API key exposed)
- Username: `TheAntiqueArchive`

### Placement
1. **Footer** (every page) - compact signup in `BaseLayout.astro`
2. **Articles index** (`/library/articles`) - full CTA at bottom
3. **Individual articles** (`/library/articles/[id]`) - full CTA after content

### Automated Newsletter Digest
- **Script:** `archive/scripts/send-newsletter.mjs`
- **Pre-push hook:** Runs on push to main/master
- **Cooldown:** 7 days between sends (use `--force` to override)
- **Features:**
  - Catchy randomized subject lines
  - Intro text setting the tone
  - Featured items with images (uses `-medium.webp` for smaller file size)
  - Articles with descriptions
  - "Also Added" list for remaining items
  - Tags subscribers by preference (articles/items)

### Commands
```bash
# Preview newsletter without sending
node scripts/send-newsletter.mjs --dry-run

# Create draft on Buttondown
node scripts/send-newsletter.mjs

# Force send (ignore cooldown)
node scripts/send-newsletter.mjs --force
```

---

## Files Changed/Created

### New Files
- `archive/src/components/NewsletterSignup.astro` - Signup form component
- `archive/scripts/send-newsletter.mjs` - Newsletter digest script
- `archive/scripts/setup-newsletter-hook.sh` - Hook installer
- `archive/.env` - API key (gitignored)
- `archive/.env.example` - Template for others

### Modified Files
- `archive/src/layouts/BaseLayout.astro` - Added footer signup
- `archive/src/pages/library/articles/index.astro` - Added CTA
- `archive/src/pages/library/articles/[id].astro` - Added CTA after content
- `archive/.gitignore` - Added `.newsletter-state.json`
- `archive/package.json` - Added `dotenv` dependency

---

## Buttondown Setup

### Account
- Username: `TheAntiqueArchive`
- API Key: Stored in `.env` (local only)

### Still To Do (in Buttondown dashboard)
1. **Settings → Basics:** Change display name from "Alex C" to "The Antique Archive"
2. **Settings → Sending:** Add custom domain for branded emails
3. **DNS Records needed:**
   - TXT: `v=spf1 include:buttondown.email ~all`
   - CNAME: `buttondown._domainkey` → `dkim.buttondown.email`

### Tags
- `articles` - Subscribers who want article notifications
- `items` - Subscribers who want new item notifications
- Emails are tagged so only relevant subscribers receive them

---

## How It Works

1. **User subscribes** via form on site
2. **Buttondown** adds them with selected tags
3. **On git push** to main/master, pre-push hook runs
4. **Script checks** for new articles/items since last send
5. **If new content** and cooldown passed (7 days), creates draft email
6. **Review & send** manually at buttondown.com/emails

---

## State Management

- `.newsletter-state.json` tracks:
  - `lastSent` - timestamp of last newsletter
  - `lastArticles` - IDs of articles included in last send
  - `lastItems` - IDs of items included in last send
- File is gitignored (local state only)
- Delete to reset and include all content in next send

---

## Commits

1. `e73575a` - Add newsletter signup with Buttondown integration
2. `459767b` - Use smaller medium webp images in newsletter emails
