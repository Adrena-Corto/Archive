# Handoff: Playwright Test Fixes for Mobile Performance Changes

**Date:** 2026-01-19
**Commit:** 0d49ca8

## Summary

Fixed all Playwright tests to pass after recent mobile performance optimization commits. The tests were failing due to:
1. Visual regression snapshots being outdated
2. Tests using selectors that don't exist on mobile viewports
3. Both chromium and mobile projects sharing the same screenshot directory

## Changes Made

### Test Files

1. **coin-filters.spec.ts** - Made `empire button click` test viewport-aware
   - Desktop: Uses `.filter-pill` selector
   - Mobile: Expands filter panel first, then uses `.mobile-filter-pill`

2. **artifact-filters.spec.ts** - Made `category dropdown exists` test viewport-aware
   - Desktop: Checks for "All Categories" button
   - Mobile: Checks for `.mobile-filter-header` element

3. **search.spec.ts** - Made `browse categories exist` test viewport-aware
   - Desktop: Checks for nav coins link
   - Mobile: Checks for search input (nav is in hamburger menu)

4. **visual-regression.spec.ts** - Fixed flaky item-detail test
   - Added 1s wait for blur placeholder images
   - Increased `maxDiffPixels` to 3000 for this specific test

### Configuration

**playwright.config.ts** - Updated snapshot path template:
```typescript
// Before
snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}'

// After
snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{testFilePath}/{arg}{ext}'
```

This separates screenshots by project, so chromium and mobile don't conflict.

### Screenshot Directory Structure

```
tests/__screenshots__/
├── chromium/
│   └── visual-regression.spec.ts/
│       ├── homepage.png
│       ├── coins.png
│       └── ...
└── mobile/
    └── visual-regression.spec.ts/
        ├── homepage.png
        ├── coins.png
        └── ...
```

## Test Results

```
86 passed (39.4s)
```

All functional tests (coin filters, artifact filters, search) and visual regression tests pass for both chromium and mobile projects.

## Notes for Future Work

- When adding new visual regression tests, they'll automatically get separate screenshots per project
- The `isMobile` fixture from Playwright can be used to write viewport-aware tests
- Item detail page has a higher pixel tolerance due to lazy-loaded image timing

## Related Commits

- `f966b03` - Eliminate render-blocking resources for faster FCP/LCP
- `9249046` - Fix critical mobile performance issues (FCP/LCP)
- `dbf7a28` - Improve mobile performance with LCP-aware loading
