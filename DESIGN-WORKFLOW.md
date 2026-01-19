# Design Consistency Workflow

Systematic process for auditing and improving design consistency, similar to the Lighthouse performance workflow.

---

## Quick Start

```bash
# Run automated design audit
node scripts/design-audit.mjs

# View report
cat DESIGN-AUDIT-REPORT.md
```

---

## The Loop

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   1. AUDIT          2. IDENTIFY         3. FIX             │
│   ───────────       ──────────────      ─────────────       │
│   Run script        Review report       Update code         │
│                                                             │
│        ↑                                      │             │
│        │                                      │             │
│        └──────────────────────────────────────┘             │
│                     4. VERIFY                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Step 1: Run Audit

```bash
node scripts/design-audit.mjs
```

**Output:**
- Console summary with score
- `DESIGN-AUDIT-REPORT.md` with detailed findings

**What it checks:**
- Arbitrary values (non-token spacing, sizes)
- Deprecated color usage (gray, slate, zinc)
- Border opacity consistency
- Typography scale adherence
- Spacing pattern consistency

---

## Step 2: Review Report

Open `DESIGN-AUDIT-REPORT.md` and review:

### Issues (Must Fix)
Red flags that break design consistency:
- Deprecated color tokens
- Major pattern deviations

### Warnings (Should Review)
Yellow flags to evaluate:
- Arbitrary values (may be intentional)
- Minor inconsistencies

### Priority Order
1. Fix all **Issues** first
2. Review **Warnings** by frequency (most common first)
3. Decide which warnings are intentional exceptions

---

## Step 3: Fix Issues

### Common Fixes

**Deprecated Colors:**
```diff
- text-gray-500
+ text-text-muted

- bg-slate-800
+ bg-surface

- border-zinc-700
+ border-border
```

**Arbitrary Spacing:**
```diff
- p-[13px]
+ p-3  /* 12px - close enough */

- gap-[18px]
+ gap-4  /* 16px */ or gap-5 /* 20px */
```

**Arbitrary Typography:**
```diff
- text-[13px]
+ text-xs  /* 12px */

- text-[15px]
+ text-sm  /* 14px */ or text-base /* 16px */
```

**Border Consistency:**
```diff
- border-white/8
+ border-white/10

- border-white/15
+ border-white/10  /* or use border-border */
```

---

## Step 4: Verify

Run audit again to confirm fixes:

```bash
node scripts/design-audit.mjs
```

Target: **Score 90+** before shipping.

---

## Visual Review (Manual)

For changes that affect visual appearance, also do a manual review:

1. **Open DESIGN-CHECKLIST.md**
2. **Test at key breakpoints:**
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1440px
3. **Score each section**
4. **Fix any visual issues found**

---

## When to Run

| Trigger | Audit Type |
|---------|------------|
| Before PR merge | Automated + spot check |
| New component added | Automated + full checklist |
| Major refactor | Full manual + automated |
| Monthly maintenance | Full audit |

---

## Design Review Workflow

For significant UI changes:

```
1. Make changes locally
2. Run: node scripts/design-audit.mjs
3. Fix any issues
4. Do visual review with DESIGN-CHECKLIST.md
5. Take screenshots at mobile + desktop
6. Include in PR description
7. Get design approval before merge
```

---

## Reference Documents

| Document | Purpose |
|----------|---------|
| `DESIGN-SYSTEM.md` | Design tokens and patterns |
| `DESIGN-CHECKLIST.md` | Manual review checklist |
| `DESIGN-AUDIT-REPORT.md` | Latest automated audit |
| `tailwind.config.mjs` | Token definitions |
| `src/styles/global.css` | Component base styles |

---

## Exceptions

Some arbitrary values are intentional. Document them:

```javascript
// Intentional: matches external library constraint
className="w-[280px]"

// Intentional: optical adjustment
className="text-[15px]"  // Between sm and base for this context
```

When adding exceptions:
1. Add comment explaining why
2. Consider if a design token should be added instead
3. Track in team documentation

---

## Metrics to Track

| Metric | Target | Current |
|--------|--------|---------|
| Design Audit Score | 90+ | - |
| Arbitrary Values | <10 | - |
| Deprecated Colors | 0 | - |
| Manual Checklist | 30+/35 | - |

Update after each audit cycle.
