# Automated Performance Testing & Optimization Workflow

## 🎯 Overview

This document describes the automated PageSpeed/Lighthouse testing and optimization workflow established for continuous performance monitoring and improvements.

## 📊 Current Performance Scores

### Before Optimization (Testing GitHub Pages redirect URL)
- Homepage: Mobile 94, Desktop 97
- Coins: Mobile 80, Desktop 89
- Artifacts: Mobile 78, Desktop 90
- Articles: Mobile 85, Desktop 97

**Issue:** Testing wrong URL caused 400-2,600ms redirect penalties

### After Fixing Test URL (Testing production domain directly)
- **Homepage: Mobile 100, Desktop 100** ✅
- **Coins: Mobile 92, Desktop 96** ✅
- **Artifacts: Mobile 92, Desktop 95** ✅
- **Articles: Mobile 84, Desktop 99** ⚠️

### After Lazy Loading Fix (Current - Pending Retest)
- Awaiting deployment and retest results...

## 🔧 Tools Created

### 1. Lighthouse Test Script (`scripts/lighthouse-test.mjs`)

**Purpose:** Automated testing of all key pages using local Lighthouse

**Usage:**
```bash
node scripts/lighthouse-test.mjs
```

**Features:**
- Tests 5 key pages (Homepage, Coins, Artifacts, Articles, Sample Item)
- Runs both mobile and desktop tests
- Generates detailed markdown report with:
  - Performance scores
  - Core Web Vitals (FCP, LCP, TBT, CLS, Speed Index)
  - Top opportunities for improvement
  - Key diagnostics
- Color-coded summary table

**Output:** `LIGHTHOUSE-REPORT.md`

### 2. PageSpeed API Script (`scripts/pagespeed-test.mjs`)

**Note:** This hits rate limits quickly. Use Lighthouse script instead.

### 3. Performance Iteration Script (`scripts/performance-iterate.mjs`)

**Purpose:** Run full test → analyze → suggest workflow

**Status:** Created but not yet fully implemented

## 📈 Optimization Fixes Applied

### Fix 1: Use Production Domain for Testing
**Issue:** Testing `adrena-corto.github.io/Archive/` caused 301 redirects to `theantiquearchive.com`
**Fix:** Updated script to test `theantiquearchive.com` directly
**Impact:** Eliminated 400-2,600ms redirect penalties, revealing true baseline scores

### Fix 2: Lazy Loading on Articles Page
**Issue:** Featured item thumbnails on `/library/articles` had no `loading="lazy"`
**Fix:** Added `loading="lazy"` attribute to article thumbnail images
**Expected Impact:** Reduce LCP on Articles page from 4.3s to <2.5s on mobile
**Status:** Deployed, awaiting retest

### Fix 3: Existing Optimizations (Already in place)
- ✅ BlurImage component with ThumbHash placeholders
- ✅ `fetchpriority="high"` on first 6 coin/artifact cards
- ✅ `loading="eager"` for above-fold images
- ✅ `loading="lazy"` for below-fold images
- ✅ WebP with responsive srcsets (400w, 800w)
- ✅ requestIdleCallback for non-critical work

## 🔄 Iterative Workflow

### Step 1: Test Current State
```bash
node scripts/lighthouse-test.mjs
```

### Step 2: Review Report
```bash
cat LIGHTHOUSE-REPORT.md
```

### Step 3: Identify Issues
Look for:
- Scores below 90
- LCP > 2.5s on mobile
- TBT > 200ms
- Top opportunities with significant savings

### Step 4: Implement Fixes
Common fixes:
- Add `loading="lazy"` to below-fold images
- Add `fetchpriority="high"` to LCP element
- Defer non-critical JavaScript
- Preload critical resources
- Reduce unused CSS

### Step 5: Build & Deploy
```bash
pnpm build
git add -A
git commit -m "Performance: [description]"
git push
```

### Step 6: Wait & Retest
```bash
# Wait 3 minutes for GitHub Pages deployment
sleep 180
node scripts/lighthouse-test.mjs
```

### Step 7: Compare Results
Check if scores improved. Iterate if needed.

## 🎯 Performance Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| Performance Score | 90-100 | 50-89 | 0-49 |
| FCP | < 1.8s | 1.8-3.0s | > 3.0s |
| LCP | < 2.5s | 2.5-4.0s | > 4.0s |
| TBT | < 200ms | 200-600ms | > 600ms |
| CLS | < 0.1 | 0.1-0.25 | > 0.25 |

## 📝 Common Issues & Solutions

### High LCP (> 2.5s on mobile)
**Causes:**
- Large images loading slowly
- Images not prioritized
- Network latency

**Solutions:**
- Add `fetchpriority="high"` to LCP image
- Use `loading="eager"` for above-fold images
- Preload critical images
- Optimize image sizes

### High TBT (> 200ms)
**Causes:**
- Heavy JavaScript execution
- Long tasks blocking main thread
- ThumbHash processing on main thread

**Solutions:**
- Use requestIdleCallback for non-critical work
- Code-split large bundles
- Defer non-critical scripts
- Use web workers for heavy processing

### Unused CSS
**Causes:**
- Tailwind generates utility classes
- Not all classes used on every page

**Solutions:**
- Configure PurgeCSS (Tailwind does this)
- Split CSS per route
- Inline critical CSS

### Multiple Redirects
**Causes:**
- Testing wrong URL
- Unnecessary route redirects

**Solutions:**
- Test production domain directly
- Remove unnecessary redirects in code
- Use direct URLs in tests

## 🚀 Future Improvements

### Potential Optimizations
1. ✅ Lazy load article thumbnails (Done)
2. Preload LCP images on collection pages
3. Reduce Tailwind CSS bundle (PurgeCSS)
4. Optimize Timeline component loading
5. Add service worker for offline support
6. Implement resource hints (dns-prefetch, preconnect)

### Monitoring
- Run Lighthouse tests before each major deployment
- Track scores over time
- Set up CI/CD checks (optional)

## 📚 References

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
- [Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Code Splitting](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

## 🎉 Success Metrics

**Homepage:** 🏆 Perfect 100/100 on both mobile and desktop!

**Collection Pages:** ⭐ 92-96 scores - Excellent performance

**Articles Page:** 🔄 84 mobile → Pending retest after lazy loading fix

**Overall Status:** 4/5 pages scoring 90+ on all devices. One page pending optimization.
