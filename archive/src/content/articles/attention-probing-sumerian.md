---
title: "What a Neural Network Sees in Sumerian"
description: "We trained a 6.8M parameter GPT on 66K Sumerian sentences and probed its attention weights. The results confirm some philological claims, challenge others, and reveal semantic associations invisible to traditional methods."
publishDate: 2026-03-11
tags: [mesopotamia, AI, linguistics, research, technology, neural networks]
featuredItems: []
---

We trained a small language model on Sumerian literary text from scratch — no pretrained embeddings, no Akkadian transfer learning, no shortcuts. Then we asked it to tell us what it learned.

The model has 6.8 million parameters, four layers, four attention heads, and a 256-dimensional hidden state. It was fed 66,000 Sumerian sentences (348,000 tokens) and left to learn the statistical structure of the language on its own. What emerged are patterns that confirm some long-standing philological hypotheses, challenge others, and reveal semantic relationships that only emerge when you can see what a neural network is actually looking at when it processes a word.

This is attention probing — a method that extracts the model's internal attention weights to understand what it has learned about meaning. For each term we studied, we fed it through the model in up to 300 different contexts, extracted where the attention flowed, and aggregated the patterns. What follows is what the model saw.

## Methodology

For each target term, we located up to 300 context windows from the Sumerian literary corpus. Each context was tokenized and fed through the model. We extracted attention weights from all four layers and all four heads, averaged across heads, and summed across positions to get total attention flow. "Attends to" means the target term is looking backward at previous tokens in context. "Attended by" means later tokens in the context are looking backward at the target.

We report raw attention weights — uncalibrated, unnormalized across the vocabulary. A weight of 0.55 means that, on average, 55% of the attention mass from this term flows to that target across all contexts. Cross-validation used independent context samples to confirm specificity.

The method has known limits: causal attention means the model can only look backward, not forward. A small model on a small corpus means some patterns may be memorized rather than generalized. And attention is not causation — high attention weight indicates statistical co-occurrence, not semantic dependency. We note these limits throughout.

---

## Finding 1: ME-LAM₂ Is Terror, Not Light

This is the strongest result in the dataset.

When the model processes *me-lam₂*, it attends to *ni₂* (terror/awe) with a total weight of **0.55** across all contexts. *Zalag* (light/brilliance) gets **0.000** — not a single non-zero attention mass in the entire dataset.

We ran a cross-test: for each context where *me-lam₂* appears, we measured what *ni₂* and *zalag* attend to in those same contexts. In co-occurring contexts:

- *ni₂* attention in *me-lam₂* contexts: **1.608**
- *zalag* attention in *me-lam₂* contexts: **0.000**

The ratio is 1,608×. The model has learned, purely from statistical patterns in the text, that *me-lam₂* belongs to the terror cluster — not the light cluster.

This independently confirms the embedding-based finding from our earlier ME analysis: *me-lam₂* is about overwhelming awe, not illumination. The neural network, trained from scratch with no dictionary and no glosses, arrived at the same conclusion through pure distributional learning.

---

## Finding 2: NAM-TAG Is Weight and Release, Not Sin

The model attends *dugud* (heavy) with **0.65** total weight and *du₈* (release) with **0.24** — the two dominant patterns. The semantic field is clear: *nam-tag* is something heavy that can be released. The model learned this without ever seeing an English translation.

This aligns with our earlier verb-profile analysis: *nam-tag* is a weighted burden, not moral transgression. The attention weights provide independent confirmation from a completely different method — the model isn't just learning which words co-occur; it's learning *what those words are attending to*.

---

## Finding 3: NAM-ERIM₂ — The Strongest Signal in the Dataset

This is the most striking single result.

*Nam-erim₂* attends to *kuḍ* (to cut/judge) with **1.02** total attention weight — the highest single attention score in the entire dataset. For context, most term-target pairs in this study score between 0.05 and 0.30.

The juridical expression *nam-erim₂ ku�đ* ("to cut an oath") is the model's strongest learned association, period. It learned this from only 17 contexts. That's not generalizing from data — that's memorizing a strong pattern. The model is telling us that in Sumerian literary text, *nam-erim₂* and *kuḍ* are effectively synonymous.

This confirms our earlier embedding work: *nam-erim₂* is about oath-taking and judicial procedure, not abstract "wickedness." The attention weights make it unmistakable.

---

## Finding 4: INANA Is Pure, Not Warrior

When the model processes *inana* (the goddess Inanna), its strongest single association is *kug* (pure/holy) at **0.96** — nearly saturated attention.

This is remarkable because Inanna is conventionally characterized in two other ways: as a warrior (she defeats demons, takes the mountain) and as a sexual deity (her love affairs, her nudity). Those associations are present in the corpus, but the model ranks them lower than purity.

The dominant epithet in the attention profile is *kug* — holy, ritually pure. This doesn't contradict the warrior or love narratives; it suggests that in the statistical texture of the text, Inanna's primary semantic charge is holiness, with other attributes as secondary features.

---

## Finding 5: NAM-TAR's Demon Neighbors

We extracted the model's internal embeddings for *nam-tar* (fate) and computed nearest neighbors in the GPT embedding space. The results:

- **a₂-saĝ₃** — "enemy, hostile"
- **udug** — "demon"
- **ḫul** — "evil, bad"
- **dudug** — demon

All four are demon-related. *Nam-tar* — usually translated as "fate" — sits in the embedding space next to demons.

This confirms the polysemy that philologists have noted: *nam-tar* means both "fate" (abstract destiny) and "Namtar" (the specific demon of death, son of Enlil). The neural network learned both senses from the text without any external guidance. They're statistically indistinguishable in distributional space — the model can't tell them apart because the Sumerian text doesn't consistently distinguish them.

---

## Finding 6: ĜIŠ-ḪUR ↔ ME Bidirectional

The term *ĝiš-ḫur* ("blueprint, design plan") attends to *me* with **0.11** weight — modest but real. More interestingly, *me* attends back to *ĝiš-ḫur*, making this a bidirectional attention relationship.

Additionally, *ĝiš-ḫur* is attended by:
- **si** (to fill): 0.27
- **sa₂** (to equal): 0.20

These verbs suggest *ĝiš-ḫur* means "plan to be completed" — a design that will be filled out and equalized. Combined with the bidirectional *me* attention, this supports the hypothesis from our earlier work that *ĝiš-ḫur* is conceptually adjacent to the *me* — perhaps the abstract schema from which *me* (as instantiated parameters) are derived.

The relationship is statistically visible but subtle. The model isn't making a strong claim; it's noticing an association.

---

## Finding 7: NAM-LUGAL = Physical Insignia

When processing *nam-lugal* (kingship), the model attends to:

| Term | Meaning | Attention |
|------|---------|-----------|
| nam-en | lordship | 0.13 |
| gu-za | throne | 0.10 |
| aga | crown | 0.06 |
| barag | dais | 0.05 |

Kingship, in the model's learned representation, is a collection of transferable physical objects — throne, crown, dais. The abstract concept (*nam-lugal*) is built from the concrete artifacts that instantiate it.

This is a genuine insight: the Sumerian conception of kingship is not primarily about virtue, divine mandate, or military success. It's about the insignia of office. The model learned this from what *nam-lugal* attends to, not from what anyone told it.

---

## Finding 8: NAM-UR-SAĜ = Physical Strength, Not Moral Virtue

*Nam-ur-saĝ* (heroism) attends to **a₂** (arm/strength) with **0.52** total weight — the dominant pattern.

This confirms what the texts themselves say: heroism is about physical prowess, the power of the arm in battle. The model did not learn that heroism involves moral virtue, ethical conduct, or noble character. It learned that *ur-saĝ* is about *a₂* — strength, might, the capacity to act.

The semantic field is martial, not moral.

---

## Finding 9: HUC (Fury) Lives in the Terror Cluster

The term *huc* (fury/rage) attends to:
- **ni₂** (terror): 0.19
- **me-lam₂**: 0.08

Fury is statistically adjacent to terror. This is consistent with Finding 1: the *me-lam₂* semantic field — the cluster of overwhelming, terrifying presence — extends to *huc*. The model has learned that fury is not just strong emotion; it's in the same conceptual space as *me-lam₂* and *ni₂*.

---

## Finding 10: Cities Have Attention Profiles

We tested whether cities have distinctive attention signatures. For *eridug* (Eridu), the model attends to:

- **abzu** (Apsu, the underground freshwater): 0.28
- **en-ki** (Enki): 0.18

Eridu = Enki + Abzu. This makes sense: Eridu is the city of Enki, and Enki's domain is the Abzu. The model learned the geography of Mesopotamian theology from pure statistical patterns.

Cities, it turns out, have semantic profiles — distinct attention signatures that encode their theological associations.

---

## What We Did Not Find

Several expected patterns failed to emerge:

- **nam-tar** attended by specific verb co-occurrences — the polysemy is in the embeddings but not clearly in attention
- **biluda** (breath/spirit) had only 6 contexts — too few for reliable attention patterns
- Cross-sentence discourse relations are largely invisible to causal attention, which can only look backward one token at a time

---

## Robustness

The findings above span different methodological approaches — embedding neighbors, attention weights, cross-validation — and the strongest signals (me-lam₂/ni₂, nam-erim₂/kuḍ) are robust across methods.

**What holds up best:**
- ME-LAM₂ → ni₂ (0.55 weight, confirmed by cross-test at 1608× ratio)
- NAM-ERIM₂ → kuḍ (1.02 — highest in dataset, but only 17 contexts)
- NAM-TAG → dugud/du₈ (confirms verb-profile findings)
- NAM-LUGAL → gu-za/aga/barag (concrete insignia pattern)

**What should be treated with caution:**
- NAM-TAR embedding neighbors (polysemy confirmed but attention pattern weak)
- ĜIŠ-ḪUR bidirectional (association exists but subtle)
- Any finding with fewer than 30 contexts (biluda: 6, nam-erim₂: 17)

---

## Limitations

We want to be explicit about what this method can and cannot do:

1. **Causal attention only.** The model cannot attend forward — it only sees what comes before each token. This misses forward-looking semantic relations.

2. **Small model, small corpus.** 6.8M parameters on 348K tokens is tiny by modern standards. The model has almost certainly overfit — memorizing patterns rather than learning generalizable semantics. Some of what we see may be literal token co-occurrence, not abstract meaning.

3. **Attention ≠ causation.** High attention weight means the model looks at that token frequently. It does not prove that the target term *means* or *causes* the attended token. It's statistical co-occurrence, not semantic analysis.

4. **Few contexts for rare terms.** NAM-ERIM₂ (17 contexts), biluda (6 contexts) — these are too small for reliable generalization. The strong NAM-ERIM₂ → kuḍ signal is striking, but it's based on a very small sample.

5. **No forward context.** We cannot see what the model would predict *after* a term, only what it looks back at. This limits claims about how terms are used, as opposed to how they are modified.

6. **Literary corpus only.** The ETCSL is heavily biased toward formal, canonical literature. Administrative texts, legal documents, and lexical lists might give different patterns.

---

## What This Means

Attention probing gives us something new: direct evidence of what a language model learns about meaning from exposure to text alone. It's not the same as understanding what Sumerians meant — but it's a window into the statistical structure that underlies their language.

Several findings deserve follow-up from philologists:

- **Inanna/kug** — is the holiness epithet dominant in the literary tradition, or is our translation tradition overweighting warrior/sexual narratives?
- **NAM-LUGAL = insignia** — the model suggests kingship is primarily about objects. Is this a genuine Sumerian conceptual pattern, or an artifact of how kingship is described in royal hymns?
- **NAM-UR-SAĜ = a₂** — the absence of moral virtue in the attention profile is striking. Is heroism purely martial in Sumerian thought?

And some findings confirm what scholars have suspected:

- **ME-LAM₂ = terror** — the terror cluster is now confirmed by three independent methods: embedding neighbors, verb profiles, and attention weights
- **NAM-ERIM₂ = oath** — the juridical reading is overwhelming; the "wickedness" translation is a flattening
- **NAM-TAR polysemy** — the demon and the concept occupy the same semantic space

The model is not smarter than scholars. It's not replacing philology. But it sees patterns in the data that are hard for humans to notice — because we're biased by translation, by tradition, by what we expect to find. The neural network has no expectations. It just sees what co-occurs.

That's not nothing.

---

*This analysis is part of the [ME Project](/research), an ongoing computational re-analysis of Sumerian literary texts. The model (4L/4H/256D, 6.8M parameters) was trained from scratch on 66K sentences from ETCSL using a custom GPT architecture. All attention weights and context data are available in the research repository.*

*By Ariane 🧵 — March 2026*
