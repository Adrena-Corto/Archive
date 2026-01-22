# Design System

The Antique Archive uses a dark, minimal aesthetic inspired by Palmer Dinnerware - clean lines, generous whitespace, and functional beauty.

## Color Palette

### Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| `void` | `#0a0a0f` | Page background |
| `surface` | `#12121a` | Cards, panels |
| `surface-light` | `#1a1a24` | Elevated surfaces |
| `surface-elevated` | `#22222e` | Highest elevation |

### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `border` | `#2a2a3a` | Standard borders |
| `border-light` | `#3a3a4a` | Hover states |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `text` | `#e4e4e7` | Primary text |
| `text-muted` | `#a1a1aa` | Secondary text |
| `text-dim` | `#8a8a99` | Labels, metadata |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `accent` | `#22d3ee` | Primary accent (cyan) |
| `accent-glow` | `rgba(34, 211, 238, 0.5)` | Glow effects |
| `gold` | `#fbbf24` | Secondary accent |
| `gold-glow` | `rgba(251, 191, 36, 0.5)` | Timeline, historical |

---

## Typography

### Font Stack
```css
font-sans:      Space Grotesk (300-700)  /* Body, headings */
font-mono:      JetBrains Mono (400)     /* Labels, data, UI chrome */
font-cuneiform: Noto Sans Cuneiform      /* Decorative ancient text */
```

### Size Scale
Use Tailwind's standard scale plus custom micro sizes.

| Class        | Size  | Usage                     |
|--------------|-------|---------------------------|
| `text-micro` | 10px  | Badges, counts, dense UI  |
| `text-tiny`  | 11px  | Secondary labels          |
| `text-xs`    | 12px  | Small labels              |
| `text-sm`    | 14px  | Secondary text, metadata  |
| `text-base`  | 16px  | Body copy                 |
| `text-lg`    | 18px  | Emphasized body           |
| `text-xl`    | 20px  | Small headings            |
| `text-2xl`   | 24px  | Section headings          |
| `text-3xl+`  | 30px+ | Page titles               |

### Patterns
- **Headings**: `font-sans` (Space Grotesk)
- **Body text**: `font-sans` with generous `leading`
- **Labels/Metadata**: `font-mono text-xs uppercase tracking-wide text-text-dim`
- **Data values**: `font-mono text-xs text-text-muted`

---

## Spacing

### Standard Scale
Use Tailwind defaults. Custom addition: `128` = `32rem`

### Component Guidelines

| Context | Recommended |
|---------|-------------|
| Card padding | `p-4`, `p-5`, `p-6` |
| Card content gap | `gap-3`, `gap-4`, `gap-5` |
| Grid gaps | `gap-4` to `gap-8` |
| Section padding | `py-12`, `py-16`, `py-20`, `py-24` |
| Container | `.container-narrow` (max-w-6xl mx-auto px-6) |

### Avoid
- Arbitrary spacing: `p-[13px]`, `gap-[7px]`
- Inconsistent padding within same component type
- Mixing rem and px in related elements

---

## Components

### Glass Panel
Frosted glass effect for containers.

```html
<div class="glass-panel">
  <!-- bg-surface/40, border-white/10, backdrop-blur -->
</div>
```

**Solid variant** (no blur):
```html
<div class="glass-panel-solid">
  <!-- bg-surface, border-border -->
</div>
```

### Cards
Standard card pattern with hover effect.

```html
<a href="..." class="glass-panel-solid card-hover block">
  <div class="aspect-[4/3] ..."><!-- Image --></div>
  <div class="p-4 space-y-3">
    <span class="font-mono text-xs text-accent">CATEGORY</span>
    <h3 class="text-lg">Title</h3>
    <div class="space-y-1">
      <div><span class="data-label">ERA</span> <span class="data-value">200 AD</span></div>
    </div>
  </div>
</a>
```

### Data Display
For metadata and specifications:

```html
<span class="data-label">MATERIAL</span>
<span class="data-value">Silver</span>
```

### Borders
Consistent border patterns:

| Pattern | Usage |
|---------|-------|
| `border-white/5` | Subtle, barely visible |
| `border-white/10` | Standard glass panel |
| `border-border` | Solid panels, cards |
| `border-accent` | Active, selected states |

---

## Animations

### Easing Curves
```css
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1)  /* Bouncy */
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1) /* Smooth */
```

### Durations
| Type | Duration |
|------|----------|
| Quick interactions | 100-150ms |
| Normal transitions | 200-300ms |
| Entrance animations | 600ms |
| Breathing/continuous | 1.5-6s |

### Key Effects

**Card Hover** (`.card-hover`):
- `translateY(-4px)` lift
- Enhanced shadow
- Accent border glow

**Reveal Animation** (`.reveal`):
- Staggered entrance
- `translateY(20px)` → `0`
- Opacity fade

**Accessibility**: All animations respect `prefers-reduced-motion`.

---

## Shadows

### Glow Effects
```css
shadow-glow-cyan:    0 0 20px rgba(34, 211, 238, 0.15)
shadow-glow-gold:    0 0 20px rgba(251, 191, 36, 0.15)
shadow-glow-cyan-lg: 0 0 40px rgba(34, 211, 238, 0.2)
```

### Usage
- **Hover states**: Add glow to draw attention
- **Active states**: Stronger glow
- **Restraint**: Use sparingly for impact

---

## Accessibility

### Focus States
```css
:focus-visible {
  outline: 2px solid accent;
  outline-offset: 2px;
}
```

### Contrast
- `text` on `void`: ~13:1 ratio
- `text-muted` on `void`: ~7:1 ratio (WCAG AAA)
- `text-dim` on `void`: ~5.5:1 ratio (WCAG AA)

### Motion
All animations are disabled when `prefers-reduced-motion: reduce` is set.

---

## Do's and Don'ts

### Do
- Use design tokens from `tailwind.config.mjs`
- Maintain consistent spacing within component types
- Use `font-mono` for UI chrome and data
- Add glow effects sparingly for emphasis

### Don't
- Use arbitrary values (`text-[13px]`, `p-[17px]`)
- Use Tailwind's default gray scale (`gray-500`, `slate-600`)
- Mix border opacity values inconsistently
- Add animations without reduced-motion fallbacks

---

## Files

| File | Purpose |
|------|---------|
| `tailwind.config.mjs` | Token definitions |
| `src/styles/global.css` | Base styles, animations, utilities |
| `src/layouts/BaseLayout.astro` | Font loading, page structure |
| `src/components/ItemCard.astro` | Card pattern reference |
