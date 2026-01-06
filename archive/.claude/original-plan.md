# Antiques & Coins Collection Website

## Overview
A stylish static website to document and showcase a personal collection of coins, jewelry, rings, cylinder seals, and small antiques. Inspired by the minimalist elegance of Palmer Dinnerware.

## Tech Stack
- **Framework**: Astro (excellent for static content sites, great image optimization)
- **Styling**: Tailwind CSS (rapid styling, matches reference aesthetic)
- **Search/Filter**: Pagefind (static search) + client-side filtering with Alpine.js
- **Animations**: CSS transitions + minimal JS for smooth interactions
- **Data**: YAML/JSON files for item catalog (easy to edit, version controlled)
- **Hosting**: GitHub Pages (free, reliable)

## Key Features

### 1. Catalog Display
- Grid/masonry layout for browsing
- Large detail view with zoom capability
- Multiple images per item (front/back for coins, various angles)

### 2. Filtering System
- **By Category**: Coins, Jewelry, Rings, Seals, Miscellaneous
- **By Era/Period**: Ancient, Medieval, Modern, etc.
- **By Origin/Region**: Geographic filtering
- **By Material**: Gold, Silver, Bronze, etc.
- **By Condition**: Grading system display

### 3. Timeline View
- Visual timeline navigation
- Group items by historical period
- Scrubable/zoomable interface

### 4. Search
- Full-text search across all item data
- Instant results with Pagefind (works statically)

### 5. Item Data Structure
```yaml
id: unique-id
name: "Roman Denarius - Emperor Augustus"
category: coin
subcategory: ancient-roman
era: "27 BC - 14 AD"
period: "Roman Imperial"
origin: "Rome, Italy"
material: silver
weight: "3.8g"
dimensions: "19mm diameter"
condition: "VF (Very Fine)"
grade: "NGC VF 4/5"
acquisition_date: "2024-03"
description: "Silver denarius featuring..."
provenance: "..."
images:
  - obverse.jpg
  - reverse.jpg
tags: [augustus, denarius, imperial, silver]
```

## Site Structure
```
/
├── index.astro          # Landing page with featured items
├── collection/
│   └── index.astro      # Full catalog with filters
├── item/
│   └── [id].astro       # Individual item detail pages
├── timeline/
│   └── index.astro      # Timeline visualization
├── about/
│   └── index.astro      # About the collection
└── data/
    └── items/           # YAML files for each item
```

## Design Aesthetic (Modern Minimal, Palmer-inspired)
- **Background**: Clean white/off-white
- **Typography**: Elegant serif for headings, clean sans-serif for body
- **Layout**: Generous whitespace, asymmetric grids
- **Imagery**: Large, high-quality photos on neutral backgrounds
- **Interactions**: Subtle hover states, smooth transitions
- **UI**: Minimal chrome - let the objects be the focus
- **Navigation**: Understated, appears on scroll/hover
- **Visibility**: Fully public, SEO-friendly

## Workflow for Adding Items
1. Photograph item (I can provide tips)
2. Create YAML file with item details
3. Claude assists with identification and filling metadata
4. Commit to repo → auto-deploys to GitHub Pages

## Implementation Phases

### Phase 1: Foundation
- [ ] Initialize Astro project with Tailwind
- [ ] Set up basic layout and navigation
- [ ] Create item data schema
- [ ] Build collection grid component
- [ ] Build item detail page

### Phase 2: Filtering & Search
- [ ] Implement category/era/material filters
- [ ] Add Pagefind for full-text search
- [ ] Build filter UI components

### Phase 3: Timeline
- [ ] Create timeline visualization
- [ ] Connect to item data

### Phase 4: Polish
- [ ] Add animations and transitions
- [ ] Optimize images
- [ ] Mobile responsiveness
- [ ] Deploy to GitHub Pages

### Phase 5: Content Population
- [ ] Begin adding items one by one
- [ ] Claude assists with identification and metadata

## Questions Resolved
- ✅ Item types: Coins + small antiques (jewelry, rings, seals, misc)
- ✅ Collection size: 200+ items
- ✅ Photography: Will photograph as we go
- ✅ Hosting: GitHub Pages

## Future Ideas

Ideas to explore after core implementation:

- **Timeline historical events overlay**: Filter timeline to show historical events by continent and type (wars, inventions, rise/fall of civilizations and dynasties). Requires a historical events database with dates, regions, and event categories to correlate with collection items.
