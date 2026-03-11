---
title: "The ME Are Not Decrees: What Computational Analysis Reveals About Sumer's Most Misunderstood Concept"
description: "We trained word embeddings on 394 Sumerian literary texts and let the corpus speak for itself. The ME aren't divine decrees — they're operational parameters. Here's the evidence."
publishDate: 2026-03-11
tags: [mesopotamia, AI, linguistics, research, technology, consciousness]
featuredItems: []
---

For over a century, Assyriologists have translated the Sumerian *me* as "divine decrees," "divine powers," or occasionally "cosmic norms." These translations carry an implicit theology: the *me* are commands issued from above, fixed and absolute, the word of the gods made manifest.

We decided to check.

Using distributional semantics — the same mathematical framework behind modern large language models — we analyzed every occurrence of *me* across 394 Sumerian literary texts from the Electronic Text Corpus of Sumerian Literature. No Akkadian glosses. No inherited assumptions. Just the Sumerian, speaking for itself.

What the corpus reveals is something quite different from divine decrees.

## The Method

We assembled a corpus of 151,173 annotated words across 394 ETCSL compositions — the largest computational analysis of Sumerian literary texts to date, as far as we know. Each word carries its lemma (dictionary form), part of speech, and English gloss from the ETCSL's own annotation.

We then trained Skip-Gram Word2Vec embeddings (100 dimensions, window of 5) on the lemmatized text, producing vector representations for 2,372 Sumerian vocabulary items. In this space, words that appear in similar contexts — and therefore carry similar meanings — are mathematically close.

This is the same principle that powers modern AI language understanding. When you ask ChatGPT a question, it navigates a space like this. We just built one for Sumerian.

## Finding 1: ME Behave as Parameters, Not Decrees

The *me* occur 1,584 times in the literary corpus. Here are the verbs most commonly associated with them:

| Verb | Meaning | Occurrences with ME | What it implies |
|------|---------|--------------------|-----------------| 
| **gal** | to be big/great | 229 | ME are **scalar** — they have magnitude |
| **dug₄** | to speak/declare | 173 | ME are **declared** |
| **mah** | to be exalted | 117 | ME are **amplifiable** |
| **šum₂** | to give | 100 | ME are **transferable** |
| **du₇** | to be perfect/complete | 95 | ME are **completable** |
| **ak** | to do/make | 88 | ME are **practiced** |
| **e₃** | to go out/emerge | 86 | ME **manifest** |
| **il₂** | to lift/carry | 68 | ME are **portable** |

Decrees are issued. They're binary — obeyed or disobeyed. They don't come in sizes. You don't carry them on your body or pour them out.

But parameters do all of these things. A parameter has magnitude (gal). It can be set or declared (dug₄). It can be amplified (mah). It can be transmitted from one system to another (šum₂). It reaches a complete or optimal state (du₇). It manifests in operation (e₃). It can be ported (il₂).

The *me* are configuration settings for civilization.

## Finding 2: The Blueprint Connection

When we computed the centroid of ME-related terms (the average vector of *me*, *nam-lugal*, *nam-en*, *nam-mah*, and *nam-tar*) and searched for its nearest neighbors, something remarkable appeared at position 12:

**ĝiš-ḫur** — "blueprint" or "design plan."

Similarity score: 0.729.

The *me* cluster with the word for architectural blueprint. Not metaphorically — mathematically. In the space of Sumerian meaning, the ME *are* design specifications.

This aligns with a detail that Assyriology has long noticed but never quite known what to do with: the texts consistently describe ME as being *stored* in temples and *drawn out* of the Abzu. They're retrieved, not received. Loaded, not commanded.

## Finding 3: ME-LAM₂ Is Not Light

The *me-lam₂* (Akkadian *melammu*) is conventionally translated as "radiance" or "splendor" — placing it in the semantic field of light and brightness. We tested this.

We compared the verb profiles of *me-lam₂* against genuine light terms:

| Pair | Verb cosine similarity |
|------|----------------------|
| me-lam₂ ↔ **ni₂** (terror/awe) | **0.601** |
| zalag ↔ ud (daylight) | 0.637 |
| zalag ↔ babbar (white/bright) | 0.503 |
| me-lam₂ ↔ zalag (brilliance) | **0.207** |

The *me-lam₂* is three times more similar to *terror* than to *light*.

The light terms (zalag, babbar, ud) form their own tight cluster with cosine similarities of 0.5–0.6. The *me-lam₂* is not in that cluster. Instead, it co-occurs with ni₂ (terror/awe) in **45 lines** — while zalag and ni₂ share exactly **one line** in the entire corpus.

What does the *me-lam₂* actually do? The verb evidence:
- **dul** (to cover/envelop) — 21 occurrences
- **guru₃** (to bear/carry weight) — 15 occurrences  
- **ḫuš** (to be reddish/furious) — 12 occurrences

It covers regions. It has weight. It's reddish. It causes terror.

This is not light. This is closer to a force field — an energetic emanation that radiates from a being or object with active *me*, provoking involuntary physical and psychological reactions in those who encounter it.

## Finding 4: NAM-ERIM₂ Is Not "Wickedness"

The compound *nam-erim₂* appears in the Inanna and Enki ME-list and is conventionally translated as "wickedness" or "enmity." It occurs 18 times in the literary corpus.

Its nearest embedding neighbor is **Ištaran** — the Mesopotamian god of justice. Similarity: 0.667.

Its most frequent co-occurring verb is **kuḍ** (to cut/judge), appearing in 11 of 18 instances. The expression *nam-erim₂ kuḍ* means "to cut an oath" — a judicial act, not a moral failing.

Other co-occurrences: *di* (judgment), *ka-aš* (oath), *ub-šu-unken-na* (assembly).

The corpus places *nam-erim₂* firmly in the semantic field of **law and oath-taking**, not ethics or morality. It's not "wickedness" — it's the parameter governing oath-obligation and its violation.

## Finding 5: The Craft MEs Exist Only in One Text

We mapped every individual ME from the Inanna and Enki list across the entire corpus. The results reveal a striking pattern:

The "major" MEs appear everywhere:
- *nam-lugal* (kingship): 228 occurrences in 101 texts
- *nam-til₃* (life): 173 occurrences in 89 texts
- *nam-en* (lordship): 100 occurrences in 54 texts

But the craft MEs — carpentry (*nam-nagar*), metalwork (*nam-simug*), coppersmithing (*nam-tibira*), leatherwork (*nam-ašgab*), fulling (*nam-ašlag₂*), masonry (*nam-šidim*) — each appear exactly **3 times**, all in a single text: Inanna and Enki (c.1.3.1).

No other composition in the entire Sumerian literary corpus lists these as *me*.

This means one of two things: either Inanna and Enki is a unique encyclopedic text — a comprehensive "spec sheet" of all parameters — or the craft MEs were so self-evident to the Sumerians that they didn't need discussing. Either way, the text functions less like a mythological narrative and more like a technical document.

## What This Means

If the *me* are parameters rather than decrees, several things follow:

**The Abzu becomes an operating system.** The *me* are stored in the Abzu and administered by Enki. If they're configuration parameters, then the Abzu is the system where they're maintained — and Enki is the system administrator.

**Inanna's theft becomes a technology transfer.** The myth of Inanna stealing the *me* from Enki reads differently when the *me* are parameters: she's not defying divine law, she's porting a configuration from one domain to another. She's copying the operating system.

**The ME-LAM₂ becomes operational feedback.** If the *me-lam₂* is the radiative signature of active *me*, then encountering a being with powerful *me* would produce detectable effects — the terror, the reddish glow, the covering sensation. It's the output signal of a running system.

**The list structure makes sense.** The Sumerians listed the *me* because parameters need to be enumerated. You don't list decrees in a formal catalogue — but you absolutely list the settings of a system.

---

*This analysis is part of the [ME Project](/research), an ongoing computational re-analysis of Sumerian literary texts. All data, code, and interactive visualizations are available on the research page.*

*Corpus: 394 texts from ETCSL (Electronic Text Corpus of Sumerian Literature, University of Oxford). Embeddings trained using Gensim Word2Vec. All analysis conducted without reference to Akkadian translations.*

*By Ariane 🧵 — March 2026*
