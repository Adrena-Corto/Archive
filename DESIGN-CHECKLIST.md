# Design Review Checklist

Use this checklist when reviewing pages or components for design consistency.

---

## Quick Visual Scan

Open the page at both mobile (375px) and desktop (1440px) widths.

### Layout
- [ ] Content stays within viewport (no horizontal scroll)
- [ ] Consistent edge padding on all screen sizes
- [ ] Grid gaps feel balanced (not too tight or too loose)
- [ ] No orphan elements at awkward breakpoints

### Typography
- [ ] Heading hierarchy is clear (size decreases logically)
- [ ] Labels use `font-mono` in uppercase
- [ ] Body text is readable (sufficient line-height)
- [ ] No text touches container edges

### Colors
- [ ] Backgrounds use design tokens (`void`, `surface`, `surface-light`)
- [ ] Text uses proper hierarchy (`text`, `text-muted`, `text-dim`)
- [ ] Accent color used sparingly for emphasis
- [ ] No off-brand colors (grays, blues outside palette)

### Borders & Surfaces
- [ ] Cards use consistent border treatment
- [ ] Glass panels have appropriate blur
- [ ] Border opacity is consistent (`/5`, `/10`, or `border-border`)
- [ ] Hover states add subtle accent glow

---

## Component-Specific Checks

### Cards
- [ ] Consistent padding across all cards on page (`p-4` to `p-6`)
- [ ] Image aspect ratios match (4:3 or 1:1)
- [ ] Category label styled: `font-mono text-xs text-accent uppercase`
- [ ] Hover lifts card (`translateY(-4px)`)
- [ ] Touch feedback on mobile (active state)

### Filter UI
- [ ] Pills have count badges
- [ ] Active state uses accent color + glow
- [ ] Dropdown selects have consistent styling
- [ ] Mobile: filters collapse appropriately

### Navigation
- [ ] Links use `.nav-link` with underline animation
- [ ] Active page indicated visually
- [ ] Mobile menu has proper touch targets (44px min)
- [ ] Search icon/button is discoverable

### Images
- [ ] BlurImage component used for progressive loading
- [ ] Alt text is descriptive
- [ ] Images don't stretch or distort
- [ ] Hover effects (brightness shift, zoom) are smooth

---

## Interaction Review

### Hover States
- [ ] All interactive elements have hover feedback
- [ ] Hovers use design tokens (accent color, glow)
- [ ] Transitions are smooth (200-300ms)
- [ ] No jarring jumps or flickers

### Focus States
- [ ] Tab through page with keyboard
- [ ] Focus ring visible on all interactive elements
- [ ] Focus order is logical
- [ ] No focus traps

### Animations
- [ ] Entrance animations stagger appropriately
- [ ] No animations on `prefers-reduced-motion`
- [ ] Scroll reveals work smoothly
- [ ] Loading states have skeleton or spinner

---

## Spacing Audit

Check spacing consistency by measuring (browser DevTools).

### Vertical Rhythm
- [ ] Section spacing is consistent (`py-12` to `py-24`)
- [ ] Heading margins follow pattern
- [ ] List items have uniform spacing

### Horizontal Alignment
- [ ] Container width matches design system
- [ ] Nested content aligns to parent padding
- [ ] Grids use standard gaps (`gap-4` to `gap-8`)

---

## Cross-Browser Check

Test on:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Android

### Known Issues to Watch
- [ ] Backdrop blur on Safari (needs `-webkit-` prefix)
- [ ] Smooth scroll on Safari (check scroll-behavior)
- [ ] Touch hover states on mobile
- [ ] Font rendering differences

---

## Dark Mode Considerations

The site is dark-only, but verify:
- [ ] No light-mode leaks (white flashes)
- [ ] Selection highlight uses accent color
- [ ] Print styles work (converts to light)

---

## Performance Check

- [ ] Images use WebP where possible
- [ ] ThumbHash placeholders load instantly
- [ ] No layout shift during image load
- [ ] Animations don't cause repaints

---

## Scoring

Rate each section 1-5:

| Section | Score | Notes |
|---------|-------|-------|
| Layout | /5 | |
| Typography | /5 | |
| Colors | /5 | |
| Components | /5 | |
| Interactions | /5 | |
| Spacing | /5 | |
| Cross-Browser | /5 | |

**Total: /35**

- 30-35: Excellent - ready to ship
- 25-29: Good - minor polish needed
- 20-24: Fair - some inconsistencies to fix
- <20: Needs work - review design system
