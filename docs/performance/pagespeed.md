# PageSpeed Insights Testing Workflow

## Process

1. Test page on [PageSpeed Insights](https://pagespeed.web.dev/)
2. Document Desktop & Mobile scores
3. Identify top issues
4. Implement fixes
5. Rebuild and deploy
6. Retest to verify improvements
7. Repeat until scores are satisfactory

## Test URLs

- Homepage: `https://acammm.github.io/archive/`
- Coins: `https://acammm.github.io/archive/coins/`
- Artifacts: `https://acammm.github.io/archive/artifacts/`
- Articles: `https://acammm.github.io/archive/articles/`
- Sample Item: `https://acammm.github.io/archive/items/septimius-severus-denarius/`

---

## Test Results

### Homepage - Test 1 (2026-01-19)

**Desktop:**
- Performance: _/100
- FCP: _s
- LCP: _s
- TBT: _ms
- CLS: _

**Mobile:**
- Performance: _/100
- FCP: _s
- LCP: _s
- TBT: _ms
- CLS: _

**Top Issues:**
1.
2.
3.

**Fixes Applied:**
-

**Retest Results:**
- Desktop: _ → _/100
- Mobile: _ → _/100

---

### /coins - Test 1

**Desktop:**
- Performance: _/100
- FCP: _s
- LCP: _s
- TBT: _ms
- CLS: _

**Mobile:**
- Performance: _/100
- FCP: _s
- LCP: _s
- TBT: _ms
- CLS: _

**Top Issues:**
1.
2.
3.

**Fixes Applied:**
-

**Retest Results:**
- Desktop: _ → _/100
- Mobile: _ → _/100

---

### /artifacts - Test 1

**Desktop:**
- Performance: _/100

**Mobile:**
- Performance: _/100

**Top Issues:**
1.

**Fixes Applied:**
-

**Retest Results:**
- Desktop: _ → _/100
- Mobile: _ → _/100

---

### /articles - Test 1

**Desktop:**
- Performance: _/100

**Mobile:**
- Performance: _/100

**Top Issues:**
1.

**Fixes Applied:**
-

**Retest Results:**
- Desktop: _ → _/100
- Mobile: _ → _/100

---

### /items/[sample] - Test 1

**Desktop:**
- Performance: _/100

**Mobile:**
- Performance: _/100

**Top Issues:**
1.

**Fixes Applied:**
-

**Retest Results:**
- Desktop: _ → _/100
- Mobile: _ → _/100

---

## Common Fixes Reference

### Images
- [ ] Use `loading="lazy"` for below-fold images
- [ ] Use `loading="eager"` for LCP image
- [ ] Add `fetchpriority="high"` to LCP image
- [ ] Ensure proper `width` and `height` attributes
- [ ] Use modern formats (WebP/AVIF)
- [ ] Compress images appropriately

### JavaScript
- [ ] Defer non-critical scripts
- [ ] Use dynamic imports for heavy components
- [ ] Remove unused JavaScript
- [ ] Minimize third-party scripts
- [ ] Use `requestIdleCallback` for non-critical work

### CSS
- [ ] Inline critical CSS
- [ ] Defer non-critical CSS
- [ ] Remove unused CSS
- [ ] Minimize CSS files

### Fonts
- [ ] Use `font-display: swap`
- [ ] Preload critical fonts
- [ ] Subset fonts if possible

### Core Web Vitals Targets
- **LCP**: < 2.5s (Good), < 4.0s (Needs Improvement)
- **FID/TBT**: < 100ms / < 200ms
- **CLS**: < 0.1 (Good), < 0.25 (Needs Improvement)
- **FCP**: < 1.8s (Good), < 3.0s (Needs Improvement)

---

## Workflow Commands

```bash
# Build production
cd archive
pnpm build

# Preview locally before deploying
pnpm preview

# Deploy to GitHub Pages
git add .
git commit -m "Performance improvements: [description]"
git push

# Wait ~2-3 minutes for GitHub Pages deployment
```
