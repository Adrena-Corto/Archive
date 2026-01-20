# Handoff: Outreach Automation System

**Date:** 2026-01-20
**Session Focus:** Patron outreach strategy, contact research, and email automation

---

## Summary

Built a semi-automated outreach system for contacting HK collectors, foundations, and museums. Researched 18 targets with emails/contact info. Created `/support` page.

## What Was Accomplished

### 1. Strategy
- Recommended **grants/patronage first**, then sales
- Focus on HNW collectors who might co-invest or sponsor acquisitions
- Compiled bio for emails: French expat, 7 years HK, 2 fintech startups, 1000+ item collection

### 2. Files Created

| File | Purpose | Git Status |
|------|---------|------------|
| `archive/src/pages/support.astro` | Public patronage page | Committed |
| `scripts/outreach/outreach.mjs` | Automation script | Committed |
| `scripts/outreach/targets.json` | 18 targets with contact info | Committed |
| `scripts/outreach/config.example.json` | Config template | Committed |
| `OUTREACH-LIST.md` | Human-readable target list | Gitignored |
| `COLD-EMAIL-TEMPLATES.md` | Email templates | Gitignored |

### 3. Site Changes
- `/support` page with patronage opportunities (co-acquisition, sponsorship, advisory)
- Footer: Support link + RSS link + Newsletter signup
- About page: Links to support page

## Outreach System

```bash
node scripts/outreach/outreach.mjs list      # See all targets
node scripts/outreach/outreach.mjs research <id>  # AI research
node scripts/outreach/outreach.mjs draft <id>     # AI draft email
node scripts/outreach/outreach.mjs review         # Approve drafts
node scripts/outreach/outreach.mjs send <id>      # Send via SMTP
```

### Setup Required
1. `cp scripts/outreach/config.example.json scripts/outreach/config.json`
2. Add SMTP credentials + Anthropic API key
3. `npm install nodemailer`

## Contact Research Summary

### Emails Found (12/18)
- Peter Fung: visitors@liangyimuseum.com
- Ma Tak Wo: info@hicc.hk (+ LinkedIn)
- Stack's Bowers: info@stacksbowers.com
- Heritage Auctions: CrisB@HA.com
- HKADC: hkadc@hkadc.org.hk
- Asia Society: supportHK@asiasociety.org
- HK Palace Museum: development@hkpm.org.hk
- HK Museum of Art: hkmoa_enquiries@lcsd.gov.hk

### Priority Targets
1. **Betty Lo & Kenneth Chu** - Highest overlap (jewelry/adornments)
2. **Ma Tak Wo** - Gatekeeper to HK numismatic community
3. **Stack's Bowers / Heritage** - Industry relationships

## Next Steps

1. Setup `config.json` with SMTP + Anthropic API key
2. Test with lower-stakes target (Stack's Bowers or HICC)
3. Attend HKINF December 2025
4. Apply to HKADC Project Grant (deadline: June 30)
5. Finish "Against All Odds" article for emails

---

**Status:** ✅ System built, needs config setup for first send
