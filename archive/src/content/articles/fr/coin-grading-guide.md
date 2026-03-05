---
title: "Comprendre les Grades des Pièces : Du TTB à SPL"
description: "Un guide pratique de l'échelle standard de classement des pièces, ce que signifie chaque grade et comment évaluer l'usure sur les pièces anciennes."
publishDate: 2025-01-11
tags: [monnaies, classement, guide, collection]
featuredItems: [septimius-severus-denarius]
---

Le classement des pièces est en partie science, en partie art. Comprendre l'échelle standard vous aide à évaluer les pièces avec précision — et à éviter de payer trop cher pour des pièces qui ne correspondent pas à leur description.

---

## L'Échelle de Sheldon

Le classement moderne des pièces utilise l'échelle de Sheldon, un système numérique de 1 à 70. Pour les pièces anciennes, nous utilisons généralement les grades adjectivaux qui correspondent aux plages de cette échelle :

| Grade | Plage Sheldon | Signification |
| ----- | ------------- | ------------- |
| Médiocre (M) | 1 | À peine identifiable |
| Passable (P) | 2 | Largement usée, lisse |
| Assez Bien (AB) | 3 | Fortement usée, contour visible |
| Bien (B) | 4-6 | Design principal visible, plat |
| Très Bien (TB) | 8-10 | Design clair, usure majeure |
| Beau (Be) | 12-15 | Usure modérée, détails émergeant |
| Très Beau (TB+) | 20-35 | Légère usure sur les hauts reliefs |
| Superbe (SUP) | 40-45 | Légère usure, la plupart des détails nets |
| Près de Neuf (PN) | 50-58 | Trace d'usure seulement |
| Fleur de Coin (FC) | 60-70 | Pas d'usure (non circulée) |

> **Référence rapide :** La plupart des pièces anciennes collectables se situent dans la plage TB à SUP. Tout ce qui est en dessous de TB peut être difficile à attribuer ; tout ce qui est au-dessus de SUP commande des primes significatives.

---

## Ce qu'il Faut Rechercher

### Hauts Reliefs

Chaque design de pièce a des "hauts reliefs" — des zones qui dépassent et s'usent en premier. Sur les portraits, cela signifie généralement :

- Cheveux au-dessus du front
- Pommettes et nez
- Détails de l'oreille
- Éléments de couronne ou de guirlande

Sur les revers, regardez :

- Genoux et bras étendus des figures debout
- Plumes d'aigle sur la poitrine et les pointes d'ailes
- Détails architecturaux
- Lettres de la légende

<div class="visualization-container" style="margin: 2rem 0;">
  <div class="vis-header">
    <span class="vis-label">// Progression de l'Usure : Hauts Reliefs du Portrait</span>
    <span class="vis-sublabel">Comment le détail disparaît du TTB au TB à mesure que les pièces circulent</span>
  </div>
  <svg viewBox="0 0 600 300" class="wear-heatmap" aria-label="Carte thermique montrant quelles zones d'un portrait de pièce s'usent en premier">
    <defs>
      <linearGradient id="wearScale" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#ef4444"/>
        <stop offset="33%" style="stop-color:#f97316"/>
        <stop offset="66%" style="stop-color:#eab308"/>
        <stop offset="100%" style="stop-color:#22d3ee"/>
      </linearGradient>
    </defs>
    <!-- Zone principale de la pièce -->
    <circle cx="180" cy="150" r="130" fill="none" stroke="#2a2a3a" stroke-width="2"/>
    <circle cx="180" cy="150" r="125" fill="#12121a"/>
    <!-- Profil schématique -->
    <g fill="none" stroke="#3a3a4a" stroke-width="1.5">
      <!-- Contour du crâne -->
      <path d="M120,220 Q95,190 100,150 Q105,110 130,85 Q160,60 200,65 Q235,70 250,95 Q260,120 255,155 Q250,190 230,215 Q200,235 160,230 Q135,225 120,220"/>
      <!-- Masse capillaire -->
      <path d="M130,85 Q160,60 200,65 Q235,70 250,95 Q245,75 220,65 Q180,55 145,70 Q125,80 130,85" fill="#1a1a24"/>
      <!-- Traits du visage -->
      <ellipse cx="195" cy="115" rx="15" ry="8"/>
      <path d="M230,130 Q245,145 235,165"/>
      <path d="M180,175 Q200,180 210,175"/>
      <ellipse cx="125" cy="150" rx="10" ry="15"/>
    </g>
    <!-- Zones d'usure avec indicateurs numérotés -->
    <!-- Zone 1 : Crête des cheveux (première à s'user) -->
    <ellipse cx="185" cy="72" rx="35" ry="12" fill="#ef4444" opacity="0.4"/>
    <circle cx="185" cy="72" r="10" fill="#ef4444" opacity="0.8"/>
    <text x="185" y="76" fill="#fff" font-size="11" font-family="JetBrains Mono, monospace" text-anchor="middle" font-weight="bold">1</text>
    <!-- Zone 2 : Arête du nez -->
    <ellipse cx="238" cy="148" rx="12" ry="22" fill="#ef4444" opacity="0.35"/>
    <circle cx="238" cy="148" r="10" fill="#ef4444" opacity="0.8"/>
    <text x="238" y="152" fill="#fff" font-size="11" font-family="JetBrains Mono, monospace" text-anchor="middle" font-weight="bold">2</text>
    <!-- Zone 3 : Pommette -->
    <ellipse cx="210" cy="130" rx="18" ry="22" fill="#f97316" opacity="0.35"/>
    <circle cx="210" cy="130" r="10" fill="#f97316" opacity="0.8"/>
    <text x="210" y="134" fill="#fff" font-size="11" font-family="JetBrains Mono, monospace" text-anchor="middle" font-weight="bold">3</text>
    <!-- Zone 4 : Sourcil -->
    <ellipse cx="200" cy="100" rx="22" ry="10" fill="#f97316" opacity="0.3"/>
    <circle cx="200" cy="100" r="10" fill="#f97316" opacity="0.8"/>
    <text x="200" y="104" fill="#fff" font-size="11" font-family="JetBrains Mono, monospace" text-anchor="middle" font-weight="bold">4</text>
    <!-- Zone 5 : Oreille (modérée) -->
    <ellipse cx="125" cy="150" rx="14" ry="20" fill="#eab308" opacity="0.3"/>
    <circle cx="125" cy="150" r="10" fill="#eab308" opacity="0.8"/>
    <text x="125" y="154" fill="#12121a" font-size="11" font-family="JetBrains Mono, monospace" text-anchor="middle" font-weight="bold">5</text>
    <!-- Zone 6 : Nuque/arrière (dernière à s'user) -->
    <ellipse cx="145" cy="200" rx="28" ry="22" fill="#22d3ee" opacity="0.25"/>
    <circle cx="145" cy="200" r="10" fill="#22d3ee" opacity="0.8"/>
    <text x="145" y="204" fill="#12121a" font-size="11" font-family="JetBrains Mono, monospace" text-anchor="middle" font-weight="bold">6</text>
    <!-- Panneau de légende à droite -->
    <rect x="340" y="30" width="240" height="230" rx="4" fill="#0a0a0f" stroke="#2a2a3a" stroke-width="1"/>
    <text x="360" y="55" fill="#a1a1aa" font-size="10" font-family="JetBrains Mono, monospace" font-weight="bold">SÉQUENCE D'USURE</text>
    <!-- Éléments de légende -->
    <circle cx="360" cy="85" r="8" fill="#ef4444"/>
    <text x="360" y="89" fill="#fff" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">1</text>
    <text x="380" y="89" fill="#ef4444" font-size="10" font-family="JetBrains Mono, monospace">Crête des cheveux</text>
    <text x="380" y="101" fill="#71717a" font-size="8" font-family="JetBrains Mono, monospace">Plate au TB</text>
    <circle cx="360" cy="125" r="8" fill="#ef4444"/>
    <text x="360" y="129" fill="#fff" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">2</text>
    <text x="380" y="129" fill="#ef4444" font-size="10" font-family="JetBrains Mono, monospace">Pointe du nez</text>
    <text x="380" y="141" fill="#71717a" font-size="8" font-family="JetBrains Mono, monospace">S'adoucit au Be</text>
    <circle cx="360" cy="165" r="8" fill="#f97316"/>
    <text x="360" y="169" fill="#fff" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">3</text>
    <text x="380" y="169" fill="#f97316" font-size="10" font-family="JetBrains Mono, monospace">Pommette</text>
    <text x="380" y="181" fill="#71717a" font-size="8" font-family="JetBrains Mono, monospace">Montre l'usure au TB+</text>
    <circle cx="470" cy="85" r="8" fill="#f97316"/>
    <text x="470" y="89" fill="#fff" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">4</text>
    <text x="490" y="89" fill="#f97316" font-size="10" font-family="JetBrains Mono, monospace">Sourcil</text>
    <text x="490" y="101" fill="#71717a" font-size="8" font-family="JetBrains Mono, monospace">Lisse au Be</text>
    <circle cx="470" cy="125" r="8" fill="#eab308"/>
    <text x="470" y="129" fill="#12121a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">5</text>
    <text x="490" y="129" fill="#eab308" font-size="10" font-family="JetBrains Mono, monospace">Oreille</text>
    <text x="490" y="141" fill="#71717a" font-size="8" font-family="JetBrains Mono, monospace">Détail au TB+</text>
    <circle cx="470" cy="165" r="8" fill="#22d3ee"/>
    <text x="470" y="169" fill="#12121a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">6</text>
    <text x="490" y="169" fill="#22d3ee" font-size="10" font-family="JetBrains Mono, monospace">Nuque</text>
    <text x="490" y="181" fill="#71717a" font-size="8" font-family="JetBrains Mono, monospace">Zone protégée</text>
    <!-- Barre d'échelle d'usure -->
    <rect x="360" y="210" width="200" height="12" rx="2" fill="url(#wearScale)"/>
    <text x="360" y="235" fill="#ef4444" font-size="8" font-family="JetBrains Mono, monospace">PREMIER</text>
    <text x="560" y="235" fill="#22d3ee" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="end">DERNIER</text>
    <text x="460" y="235" fill="#71717a" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">séquence d'usure →</text>
  </svg>
  <div class="vis-footnote" style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; margin-top: 0.5rem;">
    Lors du classement, vérifiez d'abord les zones 1-2 — si elles montrent du détail, la pièce est probablement TB+ ou mieux.
  </div>
</div>

---

## Grade par Grade

<div class="collection-embed">
  <a href="/item/marcus-aurelius-denarius-01">
    <div class="collection-embed-images grid-cols-2">
      <img src="/images/items/marcus-aurelius-denarius-01/dscf4431.jpg" alt="Avers du denier de Marc Aurèle" />
      <img src="/images/items/marcus-aurelius-denarius-01/dscf4432.jpg" alt="Revers du denier de Marc Aurèle" />
    </div>
  </a>
  <div class="collection-embed-info">
    <span class="collection-embed-label">De la Collection</span>
    <p class="collection-embed-caption">Denier de Marc Aurèle — portrait à l'avers (gauche) et revers montrant Providentia (droite). Notez le détail du portrait et la clarté de la légende lors de l'évaluation du grade.</p>
    <a href="/item/marcus-aurelius-denarius-01" class="collection-embed-link">
      Voir les détails complets de l'objet
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </a>
  </div>
</div>

### La Pièce TB

Une pièce **Très Bien** montre un design clair et complet mais avec une platitude significative. Sur un denier romain :

- Portrait identifiable, mais mèches de cheveux fusionnées
- Légende complète et lisible
- Figures du revers visibles mais manquant de détails fins
- Surfaces pouvant montrer des rayures ou de la porosité

> TB représente le "grade honnête du collectionneur" — abordable, attribuable et historiquement intéressante sans prétendre être plus qu'elle n'est.

### La Pièce Beau

**Beau** marque la transition où le détail commence à émerger. Vous verrez :

- Certaines mèches de cheveux se séparant
- Traits du visage gagnant en définition
- Figures du revers montrant les plis des vêtements
- Aspect général plus net

### La Pièce TB+

**Très Beau** est où les pièces anciennes commencent à devenir passionnantes. Attendez-vous à :

- Détail capillaire clair, bien que les hauts reliefs montrent de l'usure
- Légendes nettes avec pleines empattements
- Détails du revers largement complets
- Caractère de surface original visible

> La plupart des pièces anciennes de qualité musée se situent dans la plage TB+-SUP.

### La Pièce SUP

Les pièces **Superbe** ne montrent que légère usure sur les points les plus hauts :

- Détail capillaire presque complet
- Traits du visage nets
- Légendes parfaitement frappées
- Revers presque tel que frappé

En SUP, vous voyez la pièce presque comme son propriétaire original l'a vue.

### La Pièce PN

**Près de Neuf** est rare pour les pièces anciennes. Ces pièces montrent :

- Trace d'usure seulement, parfois juste de la friction
- Plein brillant de frappe (si le métal le préserve)
- Détail de frappe complet
- Marques de contact minimales

Les vraies pièces anciennes PN sont rares et commandent des primes significatives.

---

## Classement Ancien vs. Moderne

Les pièces anciennes présentent des défis uniques que les pièces modernes n'ont pas :

| Facteur | Défi |
| ------- | ---- |
| **Qualité du frappe** | Une pièce mal frappée peut sembler usée mais n'a jamais eu de détail à perdre |
| **Conditions de surface** | Porosité, nettoyage, retouche affectent l'apparence séparément de l'usure |
| **Centrage** | Les frappes désaxées coupent les légendes — défaut de production, pas d'usure |
| **Variation des coins** | Même empereur, style de portrait différent d'un coin à l'autre |

La compétence clé est de distinguer l'*usure* du *frappe faible* et des *dommages* de la *patine*.

---

## Conseils Pratiques

1. **Comparez, comparez, comparez.** Étudiez les archives de ventes aux enchères et les livres de référence. Votre œil s'améliore avec l'exposition.

2. **Faites confiance à votre première impression.** Si une pièce semble "fatiguée", elle est probablement de grade inférieur à ce que suggèrent les hauts reliefs.

3. **L'éclairage compte.** Examinez les pièces sous une lumière diffuse et cohérente. La lumière directionnelle dure cache l'usure.

4. **En cas de doute, classez de manière conservatrice.** Il vaut mieux être agréablement surpris que déçu.

5. **La certification a ses limites.** Les services de classement tiers (NGC, PCGS) fournissent une cohérence pour les pièces modernes mais le classement ancien reste plus subjectif.

---

## Le Facteur d'Attrait Visuel

Au-delà du grade technique, "l'attrait visuel" capture l'attractivité globale :

| Positif | Négatif |
| -------- | -------- |
| Patine ou tonnage agréable | Nettoyage agressif |
| Frappe nette et centrée | Frappe faible ou désaxée |
| Surfaces luisantes | Porosité ou piqûres |
| Style de coin attractif | Coins grossiers ou usés |
| Marques de contact minimales | Rayures, entailles, coupes d'essai |

> Une pièce TB avec un superbe attrait visuel peut être plus désirable qu'une pièce techniquement SUP avec des problèmes. Collectionnez ce qui vous parle, mais comprenez ce que vous achetez.