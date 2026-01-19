# Design Consistency Audit Report

**Generated:** 2026-01-19

---

## Summary

| Metric | Count |
|--------|-------|
| Files Scanned | 29 |
| Issues (Must Fix) | 0 |
| Warnings (Should Review) | 32 |
| Arbitrary Values | 57 |
| Deprecated Colors | 0 |
| Inconsistent Patterns | 0 |

**Design Consistency Score:** 🟡 89/100

---

## 🟡 Warnings (Should Review)

### arbitrary-value (22 occurrences)

> 💡 **Suggestion:** Consider using design tokens from tailwind.config.mjs

| File | Details |
|------|----------|
| `/src/components/ArtifactFilterBar.astro` | Arbitrary values found: top-[57px], min-w-[18px], h-[18px], ... |
| `/src/components/CoinCard.astro` | Arbitrary values found: min-h-[2.5rem] |
| `/src/components/CoinFilterBar.astro` | Arbitrary values found: top-[57px], min-w-[18px], h-[18px], ... |
| `/src/components/FilterBar.astro` | Arbitrary values found: min-w-[140px], max-w-[280px] |
| `/src/components/ItemCard.astro` | Arbitrary values found: min-h-[2.5rem] |
| `/src/components/Search.astro` | Arbitrary values found: min-h-[2.5rem] |
| `/src/components/SearchModal.astro` | Arbitrary values found: top-[12vh], max-h-[50vh] |
| `/src/components/TechStats.astro` | Arbitrary values found: gap-[2px] |
| `/src/components/home/FeatureShowcase.astro` | Arbitrary values found: tracking-[0.2em], min-h-[320px], md:... |
| `/src/components/timeline/Timeline.astro` | Arbitrary values found: h-[55vh], min-h-[380px], max-w-[45%]... |
| ... | *and 12 more* |

### arbitrary-spacing (5 occurrences)

> 💡 **Suggestion:** Use standard Tailwind spacing scale

| File | Details |
|------|----------|
| `/src/components/ArtifactFilterBar.astro` | Arbitrary spacing values: h-[18px] |
| `/src/components/CoinFilterBar.astro` | Arbitrary spacing values: h-[18px], h-[16px] |
| `/src/components/TechStats.astro` | Arbitrary spacing values: gap-[2px] |
| `/src/components/home/FeatureShowcase.astro` | Arbitrary spacing values: h-[85%] |
| `/src/components/timeline/Timeline.astro` | Arbitrary spacing values: h-[55vh], w-[200px] |

### arbitrary-typography (5 occurrences)

> 💡 **Suggestion:** Use standard Tailwind sizes: xs, sm, base, lg, xl, 2xl, etc.

| File | Details |
|------|----------|
| `/src/components/CoinFilterBar.astro` | Arbitrary font sizes: text-[9px] |
| `/src/components/home/FeatureShowcase.astro` | Arbitrary font sizes: text-[8px] |
| `/src/components/timeline/Timeline.astro` | Arbitrary font sizes: text-[9px], text-[8px] |
| `/src/pages/item/[id].astro` | Arbitrary font sizes: text-[15px] |
| `/src/pages/library/articles/[id].astro` | Arbitrary font sizes: text-[2px], text-[17px] |

---

## Design Tokens Reference

### Colors
```
Background: void, surface, surface-light, surface-elevated
Borders:    border, border-light
Text:       text, text-muted, text-dim
Accent:     accent, accent-glow, gold, gold-glow
```

### Typography
```
Fonts:  font-sans (Space Grotesk), font-mono (JetBrains Mono), font-cuneiform
Sizes:  text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, ...
```

### Spacing Guidelines
```
Cards:     p-4 to p-6 internal, gap-3 to gap-5 content
Sections:  py-12 to py-24 vertical
Grids:     gap-4 to gap-8 between items
```

### Border Patterns
```
Standard:  border-border or border-white/10
Subtle:    border-white/5
Hover:     border-accent or border-accent-glow
```
