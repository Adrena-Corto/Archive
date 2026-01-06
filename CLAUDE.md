# Antiques & Coins Collection Website

## Overview

Static website showcasing a personal collection of coins, jewelry, rings, cylinder seals, and small antiques. Modern minimal aesthetic inspired by Palmer Dinnerware.

## Tech Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS
- **Interactivity**: Alpine.js (for filters)
- **Search**: Pagefind (static search)
- **Data**: YAML files in `src/data/items/`
- **Hosting**: GitHub Pages

## Code Principles

- Clean, minimal code
- No comments unless logic is non-obvious
- Mobile-first responsive design
- Semantic HTML for accessibility
- Optimize images with Astro's built-in tools

## File Structure

```
src/
  components/     # Reusable UI components
  layouts/        # Page layouts
  pages/          # Route pages
  data/
    items/        # YAML files for collection items
  styles/         # Global styles
  lib/            # Utilities
public/
  images/
    items/        # Item photographs
```

## Item Schema

Each item in `src/data/items/*.yaml`:

```yaml
id: unique-slug
name: "Item Name"
category: coin | jewelry | ring | seal | misc
era: "Date range or period"
period: "Historical period name"
origin: "Geographic origin"
material: gold | silver | bronze | other
weight: "Weight with unit"
dimensions: "Size description"
condition: "Condition grade"
description: "Detailed description"
images:
  - filename.jpg
tags: [tag1, tag2]
```

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm preview      # Preview production build
```

## Adding New Items

1. Add photos to `public/images/items/[item-id]/`
2. Create `src/data/items/[item-id].yaml`
3. Fill in item details (Claude can assist with identification)
4. Run `pnpm build` to regenerate search index

## Design Guidelines

- **Colors**: White/off-white backgrounds, dark text
- **Typography**: Serif for headings, sans-serif for body
- **Spacing**: Generous whitespace
- **Images**: Large, high-quality, neutral backgrounds
- **Interactions**: Subtle hovers, smooth transitions

## Agents

Specialized agents in `.claude/agents/`. Use these by asking Claude to "use the [agent] agent" or referencing the task type.

| Agent | Use For |
|-------|---------|
| `frontend` | Astro components, Tailwind, Alpine.js, accessibility |
| `design` | Visual consistency, spacing, typography, Palmer aesthetic |
| `architect` | Technical decisions, tradeoffs, stack choices |
| `reviewer` | Code review before merging |
| `refactor` | Improving code without changing behavior |
| `debug` | Tracking down and fixing bugs |

Example prompts:
- "Use the design agent to review this component's spacing"
- "Use the frontend agent to build the filter component"
- "Review this PR with the reviewer agent"
