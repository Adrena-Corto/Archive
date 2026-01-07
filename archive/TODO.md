# Timeline Enhancement TODO

## Completed
- [x] Interactive horizontal timeline with 4 zoom levels (Era/Period/Century/Decade)
- [x] Pan navigation (drag + momentum)
- [x] Mini-map with viewport indicator
- [x] Item markers (cyan circles) with hover tooltips
- [x] Historical landmarks (14 events, gold diamonds)
- [x] Landmark tooltips with date formatting
- [x] Zoom controls (+/- buttons)
- [x] Keyboard navigation (arrows pan, +/- zoom)
- [x] Mobile touch support (pinch-to-zoom, swipe to pan)
- [x] Auto-center on collection items on load

## Remaining

### Clustering System
- [ ] Implement greedy clustering algorithm when items overlap
- [ ] Create `TimelineCluster.astro` component with item count badge
- [ ] Auto-expand clusters on zoom in (bloom animation)
- [ ] Click cluster to zoom into that area
- [ ] Gold ring indicator on clusters containing featured items

### Filters
- [ ] Add filter toggles for item categories (coin, jewelry, ring, seal, misc)
- [ ] Landmark visibility toggle (already have `showLandmarks` state)
- [ ] Material filter option
- [ ] Persist filter state in URL params

### URL State Persistence
- [ ] Save zoom level and pan position to URL (`?zoom=3&year=-500`)
- [ ] Allow sharing specific timeline views
- [ ] Restore state on page load

### Accessibility
- [ ] Add ARIA labels for zoom level and visible date range
- [ ] Announce item/landmark focus to screen readers
- [ ] Ensure focus ring visibility on all interactive elements
- [ ] Add skip link to timeline controls
- [ ] Test with screen reader

### Performance (if collection grows)
- [ ] Virtualization - only render visible items
- [ ] Debounce clustering calculations
- [ ] Lazy load landmark data

### Nice to Have
- [ ] Period bands (colored background regions for eras)
- [ ] Double-tap to zoom on mobile
- [ ] Smooth animated transitions when clicking minimap
- [ ] Item image preview in tooltip
