---
title: "Against All Odds: How Ancient Objects Survive"
description: "The improbable mathematics of survival—why the ancient objects in museums represent a tiny fraction of what once existed, and the accidents that preserved them."
publishDate: 2026-01-20
tags: [collecting, preservation, archaeology, history, survival]
featuredItems: [uruk-lapis-cylinder-seal]
---

Consider a cylinder seal carved in southern Mesopotamia around 3200 BCE. Over the next five thousand years, it would witness the rise and fall of Sumer, Akkad, Babylon, Assyria, and Persia. It would outlast Alexander's empire and Rome's. It would survive the Arab conquests, the Mongol invasions, and the Ottoman centuries. And somehow, against mathematics that should have reduced it to dust or slag, it would end up in a collector's hand in the twenty-first century.

How?

## The Mathematics of Destruction

The survival of any ancient object is statistically improbable. Every year an object exists, it faces risks: fire, flood, earthquake, war, theft, recycling, simple neglect. These risks compound over centuries.

<div class="math-box">
  <div class="math-label">Compound Survival Probability</div>
  <div class="math-formula">
    P<sub>survival</sub> = (1 - r)<sup>n</sup>
  </div>
  <div class="math-explanation">
    Where <em>r</em> = annual risk of destruction, <em>n</em> = years elapsed
  </div>
</div>

If an object faces even a modest 0.5% annual risk of destruction, the mathematics are brutal:

<div class="visualization-container" style="margin: 2rem 0;">
  <div class="vis-header">
    <span class="vis-label">// Survival Probability Over Time</span>
    <span class="vis-sublabel">0.5% annual destruction risk</span>
  </div>
  <svg viewBox="0 0 600 300" class="survival-chart" aria-label="Exponential decay chart showing survival probability over 5000 years">
    <!-- Grid lines -->
    <defs>
      <linearGradient id="gridFade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#22d3ee;stop-opacity:0.2"/>
        <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:0.05"/>
      </linearGradient>
      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#22d3ee;stop-opacity:0.3"/>
        <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:0"/>
      </linearGradient>
    </defs>
    <!-- Y-axis grid -->
    <line x1="60" y1="40" x2="580" y2="40" stroke="url(#gridFade)" stroke-width="1"/>
    <line x1="60" y1="90" x2="580" y2="90" stroke="url(#gridFade)" stroke-width="1"/>
    <line x1="60" y1="140" x2="580" y2="140" stroke="url(#gridFade)" stroke-width="1"/>
    <line x1="60" y1="190" x2="580" y2="190" stroke="url(#gridFade)" stroke-width="1"/>
    <line x1="60" y1="240" x2="580" y2="240" stroke="#22d3ee" stroke-width="1" opacity="0.3"/>
    <!-- Y-axis labels -->
    <text x="55" y="44" fill="#a1a1aa" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">100%</text>
    <text x="55" y="94" fill="#a1a1aa" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">75%</text>
    <text x="55" y="144" fill="#a1a1aa" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">50%</text>
    <text x="55" y="194" fill="#a1a1aa" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">25%</text>
    <text x="55" y="244" fill="#a1a1aa" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">0%</text>
    <!-- X-axis labels -->
    <text x="60" y="265" fill="#a1a1aa" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">0</text>
    <text x="190" y="265" fill="#a1a1aa" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">1000</text>
    <text x="320" y="265" fill="#a1a1aa" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">2000</text>
    <text x="450" y="265" fill="#a1a1aa" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">3000</text>
    <text x="580" y="265" fill="#a1a1aa" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">5000 yrs</text>
    <!-- Area fill under curve -->
    <path d="M60,40 Q120,42 150,60 Q200,100 250,140 Q300,175 350,200 Q420,225 500,235 L580,238 L580,240 L60,240 Z" fill="url(#areaGradient)"/>
    <!-- Main decay curve: P = (0.995)^n, scaled to chart -->
    <path d="M60,40 Q120,42 150,60 Q200,100 250,140 Q300,175 350,200 Q420,225 500,235 L580,238"
          fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Key data points -->
    <circle cx="60" cy="40" r="4" fill="#22d3ee"/>
    <circle cx="190" cy="143" r="4" fill="#22d3ee"/>
    <circle cx="320" cy="212" r="4" fill="#22d3ee"/>
    <circle cx="580" cy="238" r="4" fill="#fbbf24"/>
    <!-- Annotations -->
    <text x="70" y="32" fill="#22d3ee" font-size="10" font-family="JetBrains Mono, monospace">100%</text>
    <text x="200" y="138" fill="#a1a1aa" font-size="10" font-family="JetBrains Mono, monospace">~0.7%</text>
    <text x="330" y="207" fill="#a1a1aa" font-size="10" font-family="JetBrains Mono, monospace">~0.005%</text>
    <text x="505" y="230" fill="#fbbf24" font-size="10" font-family="JetBrains Mono, monospace">~0.00000002%</text>
    <!-- X-axis title -->
    <text x="320" y="290" fill="#71717a" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">Years Since Creation</text>
  </svg>
</div>

After 1,000 years, roughly 0.7% of objects survive. After 2,000 years, that drops to 0.005%. After 5,000 years? Approximately **two in every hundred million** objects remain.

We have no precise numbers—we can't count what no longer exists—but the evidence is stark:

**Bronze sculpture:** The ancient sources tell us that Lysippos, Alexander the Great's court sculptor, created over 1,500 bronze statues. Not one survives. When the travel writer Pausanias visited Olympia in the 2nd century CE, he counted 69 bronze statues of Olympic victors from the 5th century BCE alone. Thirteen of their bases have been found. The statues themselves are gone.

Fewer than 200 bronze sculptures from the entire Hellenistic period survive today. Everything else was melted—for coins, cannons, cannonballs, or new sculptures commemorating whoever destroyed the old ones.

**Ancient literature:** Scholars estimate that roughly 80% of all Greek and Roman literature has been lost. The Library of Alexandria, at its peak holding perhaps 400,000 scrolls, suffered repeated catastrophes: Caesar's fire in 48 BCE, Christian destruction of the Serapeum in 391 CE, neglect and dispersal over centuries. But even if that library had been perfectly preserved, most ancient texts would still be lost—because texts existed in limited copies, and papyrus doesn't last.

**Coins:** Here the survival rate is better, because coins were produced in millions and made of durable metal. Yet even coins were systematically recycled. Old currency was melted when new emperors took power. Economic crises drove people to spend their savings. We have perhaps one coin in a thousand from antiquity—maybe less.

<div class="visualization-container" style="margin: 2.5rem 0;">
  <div class="vis-header">
    <span class="vis-label">// Estimated Survival Rates by Material</span>
    <span class="vis-sublabel">Approximate % surviving to present day</span>
  </div>
  <div class="bar-chart" style="display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem 0;">
    <div class="bar-row" style="display: flex; align-items: center; gap: 1rem;">
      <span class="bar-label" style="width: 120px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #a1a1aa; text-align: right;">Bronze statues</span>
      <div class="bar-track" style="flex: 1; height: 24px; background: #1a1a24; border-radius: 4px; overflow: hidden; position: relative;">
        <div class="bar-fill" style="width: 0.01%; min-width: 3px; height: 100%; background: linear-gradient(90deg, #ef4444, #f87171); border-radius: 4px;"></div>
        <span class="bar-value" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #fbbf24;">~0.01%</span>
      </div>
    </div>
    <div class="bar-row" style="display: flex; align-items: center; gap: 1rem;">
      <span class="bar-label" style="width: 120px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #a1a1aa; text-align: right;">Papyri/scrolls</span>
      <div class="bar-track" style="flex: 1; height: 24px; background: #1a1a24; border-radius: 4px; overflow: hidden; position: relative;">
        <div class="bar-fill" style="width: 0.1%; min-width: 4px; height: 100%; background: linear-gradient(90deg, #f97316, #fb923c); border-radius: 4px;"></div>
        <span class="bar-value" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #fbbf24;">~0.1%</span>
      </div>
    </div>
    <div class="bar-row" style="display: flex; align-items: center; gap: 1rem;">
      <span class="bar-label" style="width: 120px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #a1a1aa; text-align: right;">Coins</span>
      <div class="bar-track" style="flex: 1; height: 24px; background: #1a1a24; border-radius: 4px; overflow: hidden; position: relative;">
        <div class="bar-fill" style="width: 1%; min-width: 8px; height: 100%; background: linear-gradient(90deg, #eab308, #facc15); border-radius: 4px;"></div>
        <span class="bar-value" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #fbbf24;">~0.1%</span>
      </div>
    </div>
    <div class="bar-row" style="display: flex; align-items: center; gap: 1rem;">
      <span class="bar-label" style="width: 120px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #a1a1aa; text-align: right;">Stone seals</span>
      <div class="bar-track" style="flex: 1; height: 24px; background: #1a1a24; border-radius: 4px; overflow: hidden; position: relative;">
        <div class="bar-fill" style="width: 5%; height: 100%; background: linear-gradient(90deg, #22d3ee, #67e8f9); border-radius: 4px;"></div>
        <span class="bar-value" style="position: absolute; left: calc(5% + 8px); top: 50%; transform: translateY(-50%); font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #22d3ee;">~1-5%</span>
      </div>
    </div>
    <div class="bar-row" style="display: flex; align-items: center; gap: 1rem;">
      <span class="bar-label" style="width: 120px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #a1a1aa; text-align: right;">Pottery sherds</span>
      <div class="bar-track" style="flex: 1; height: 24px; background: #1a1a24; border-radius: 4px; overflow: hidden; position: relative;">
        <div class="bar-fill" style="width: 15%; height: 100%; background: linear-gradient(90deg, #10b981, #34d399); border-radius: 4px;"></div>
        <span class="bar-value" style="position: absolute; left: calc(15% + 8px); top: 50%; transform: translateY(-50%); font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #10b981;">~10-20%</span>
      </div>
    </div>
  </div>
  <div class="vis-footnote" style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; margin-top: 0.5rem;">
    Note: These are rough estimates. True rates are unknowable—we can't count what's been destroyed.
  </div>
</div>

## The Five Paths to Survival

Objects that survive five thousand years do so through specific mechanisms:

### 1. Burial (Intentional)

Grave goods represent a large proportion of surviving antiquities. The dead took their possessions with them, and the living generally left tombs alone—at least until tomb robbing became profitable. Egyptian tombs, Mesopotamian graves, Chinese burial complexes: these are time capsules, sealed and forgotten.

But intentional burial goes beyond graves. During times of crisis, people hid their valuables. Coin hoards are "bundles of treasure that people buried to protect their savings during times of great violence and political strife." If the owner died or fled, the hoard stayed hidden—sometimes for millennia.

Researchers now use unrecovered coin hoards as a proxy for social instability. More hoards from a period mean more people who buried their wealth and never returned. The late Roman Republic shows this clearly: the clustering of hoards matches exactly when civil wars were culling the Roman populace.

<div class="visualization-container" style="margin: 2rem 0;">
  <div class="vis-header">
    <span class="vis-label">// Roman Coin Hoards vs. Civil Conflict</span>
    <span class="vis-sublabel">Unrecovered hoards correlate with periods of instability</span>
  </div>
  <svg viewBox="0 0 600 200" class="timeline-chart" aria-label="Timeline showing correlation between Roman civil conflicts and buried coin hoards">
    <!-- Timeline base -->
    <line x1="40" y1="140" x2="580" y2="140" stroke="#22d3ee" stroke-width="1" opacity="0.3"/>
    <!-- Era labels -->
    <text x="40" y="170" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace">100 BCE</text>
    <text x="175" y="170" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace">50 BCE</text>
    <text x="310" y="170" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace">0</text>
    <text x="445" y="170" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace">50 CE</text>
    <text x="560" y="170" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace">100 CE</text>
    <!-- Conflict periods (red bands) -->
    <rect x="85" y="20" width="40" height="120" fill="#ef4444" opacity="0.15" rx="2"/>
    <rect x="165" y="20" width="50" height="120" fill="#ef4444" opacity="0.2" rx="2"/>
    <rect x="260" y="20" width="35" height="120" fill="#ef4444" opacity="0.15" rx="2"/>
    <!-- Conflict labels -->
    <text x="105" y="15" fill="#ef4444" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">Social War</text>
    <text x="190" y="15" fill="#ef4444" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">Caesar's Wars</text>
    <text x="277" y="15" fill="#ef4444" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">Year of 4</text>
    <!-- Hoard density bars (cyan) -->
    <rect x="60" y="110" width="12" height="30" fill="#22d3ee" opacity="0.4" rx="1"/>
    <rect x="85" y="70" width="12" height="70" fill="#22d3ee" opacity="0.7" rx="1"/>
    <rect x="110" y="90" width="12" height="50" fill="#22d3ee" opacity="0.5" rx="1"/>
    <rect x="145" y="100" width="12" height="40" fill="#22d3ee" opacity="0.4" rx="1"/>
    <rect x="170" y="50" width="12" height="90" fill="#22d3ee" opacity="0.8" rx="1"/>
    <rect x="195" y="60" width="12" height="80" fill="#22d3ee" opacity="0.75" rx="1"/>
    <rect x="225" y="95" width="12" height="45" fill="#22d3ee" opacity="0.45" rx="1"/>
    <rect x="260" y="75" width="12" height="65" fill="#22d3ee" opacity="0.6" rx="1"/>
    <rect x="300" y="110" width="12" height="30" fill="#22d3ee" opacity="0.3" rx="1"/>
    <rect x="350" y="115" width="12" height="25" fill="#22d3ee" opacity="0.25" rx="1"/>
    <rect x="400" y="120" width="12" height="20" fill="#22d3ee" opacity="0.2" rx="1"/>
    <rect x="450" y="122" width="12" height="18" fill="#22d3ee" opacity="0.2" rx="1"/>
    <rect x="500" y="125" width="12" height="15" fill="#22d3ee" opacity="0.15" rx="1"/>
    <rect x="550" y="128" width="12" height="12" fill="#22d3ee" opacity="0.1" rx="1"/>
    <!-- Legend -->
    <rect x="400" y="35" width="12" height="12" fill="#22d3ee" opacity="0.6" rx="1"/>
    <text x="418" y="45" fill="#a1a1aa" font-size="9" font-family="JetBrains Mono, monospace">Hoards found</text>
    <rect x="400" y="55" width="12" height="12" fill="#ef4444" opacity="0.2" rx="1"/>
    <text x="418" y="65" fill="#a1a1aa" font-size="9" font-family="JetBrains Mono, monospace">Civil conflict</text>
  </svg>
  <div class="vis-footnote" style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; margin-top: 0.5rem;">
    Higher bars = more hoards. People buried wealth they never returned for.
  </div>
</div>

### 2. Burial (Accidental)

Earthquakes collapse buildings. Rivers flood and deposit silt. Volcanic eruptions bury whole cities. These disasters are catastrophic for the living but preservative for their possessions.

Pompeii is the famous example, but the pattern repeats globally. Mud slides at Çatalhöyük preserved Neolithic remains. The desertification of Egypt's climate preserved papyri that would have rotted in damper climates. The anaerobic muck at the bottom of harbors preserved wooden shipwrecks.

### 3. Continuous Use

Some objects survive because they never stopped being valuable. Gold jewelry gets melted and recast, but sometimes a piece is simply too beautiful to destroy. Gems pass from Roman to Byzantine to medieval to modern hands. Religious objects—icons, reliquaries, ceremonial vessels—are preserved by institutions that outlast empires.

### 4. Salvage and Shipwreck

The great bronze statues we do have mostly come from shipwrecks. The Riace Warriors, the Antikythera Youth, the Getty Bronze—all were lost at sea, probably while being transported as loot or merchandise, and preserved by cold, dark, oxygen-poor water.

It's a beautiful paradox: disaster preserved what peace would have destroyed. A statue that made it safely to Rome would eventually have been melted. The one that sank survived.

### 5. Mundane Indestructibility

Some objects survive simply because they're hard to destroy and not worth recycling. Pottery sherds have no resale value. Stone seals can't be melted. Carved gems are too small to bother with.

<div class="collection-embed">
  <a href="/items/uruk-lapis-cylinder-seal">
    <div class="collection-embed-images grid-cols-2">
      <img src="/images/items/uruk-lapis-cylinder-seal/01.jpg" alt="Uruk period lapis lazuli cylinder seal" />
      <img src="/images/items/uruk-lapis-cylinder-seal/03.jpg" alt="Cylinder seal impression showing sheep" />
    </div>
  </a>
  <div class="collection-embed-info">
    <span class="collection-embed-label">From the Collection</span>
    <p class="collection-embed-caption">This lapis lazuli cylinder seal from the Uruk period (c. 3400-3000 BCE) has survived over five thousand years. The deep blue stone, imported to Mesopotamia from Afghanistan, was carved with sheep—a scene that reflects the pastoral economy of early Sumer.</p>
    <a href="/items/uruk-lapis-cylinder-seal" class="collection-embed-link">
      View full item details
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </a>
  </div>
</div>

A cylinder seal like this survives because it's small enough to lose, hard enough to last, and useless enough that nobody bothered to destroy it. It wasn't worth stealing. It couldn't be melted down. It was probably buried with its owner or simply dropped and forgotten, covered by the slow accumulation of dirt over millennia.

## The Preservation Bias

Archaeologists speak of "preservation bias": the ways that differential survival distorts our understanding of the past.

Stone tools dominate museum collections not because ancient people mainly used stone tools—they probably used wood, fiber, and leather far more—but because organic materials rot. We think of ancient sculpture as white marble, but most Greek statues were bronze (now melted) and the marble ones were painted (the paint has flaked away).

The objects in any collection represent the survivors of a brutal selection process. They are not a random sample of ancient material culture. They are what was durable enough, hidden enough, or forgotten enough to persist.

<div id="survival-sim" class="simulation-container" style="margin: 2.5rem 0; padding: 1.5rem; background: #12121a; border: 1px solid #2a2a3a; border-radius: 8px;">
  <div class="vis-header" style="margin-bottom: 1rem;">
    <span class="vis-label">// Monte Carlo Survival Simulation</span>
    <span class="vis-sublabel">Watch 1,000 objects face the odds over millennia</span>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
    <div style="flex: 1; min-width: 200px;">
      <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #a1a1aa; margin-bottom: 0.25rem;">Annual Risk %</label>
      <input type="range" id="sim-risk" min="0.1" max="2" step="0.1" value="0.5" style="width: 100%; accent-color: #22d3ee;">
      <span id="sim-risk-val" style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #22d3ee;">0.5%</span>
    </div>
    <div style="flex: 1; min-width: 200px;">
      <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #a1a1aa; margin-bottom: 0.25rem;">Years to Simulate</label>
      <input type="range" id="sim-years" min="500" max="5000" step="500" value="3000" style="width: 100%; accent-color: #22d3ee;">
      <span id="sim-years-val" style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #22d3ee;">3000 years</span>
    </div>
  </div>
  <button id="sim-run-btn" style="background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); color: #0a0a0f; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 1rem;">Run Simulation</button>
  <div id="sim-grid" style="position: relative; height: 140px; background: #0a0a0f; border-radius: 4px; overflow: hidden; margin-bottom: 1rem; display: flex; flex-wrap: wrap; gap: 2px; padding: 8px; align-content: flex-start;"></div>
  <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; margin-bottom: 1rem;">
    <span>Year: <span id="sim-year" style="color: #22d3ee;">0</span></span>
  </div>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
    <div>
      <div id="sim-survivors" style="font-family: 'JetBrains Mono', monospace; font-size: 20px; color: #22d3ee;">1000</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em;">Survivors</div>
    </div>
    <div>
      <div id="sim-rate" style="font-family: 'JetBrains Mono', monospace; font-size: 20px; color: #fbbf24;">100%</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em;">Survival Rate</div>
    </div>
    <div>
      <div id="sim-theoretical" style="font-family: 'JetBrains Mono', monospace; font-size: 20px; color: #a1a1aa;">100%</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em;">Theoretical</div>
    </div>
  </div>
</div>

<script type="module">
(function() {
  const grid = document.getElementById('sim-grid');
  const riskInput = document.getElementById('sim-risk');
  const yearsInput = document.getElementById('sim-years');
  const riskVal = document.getElementById('sim-risk-val');
  const yearsVal = document.getElementById('sim-years-val');
  const runBtn = document.getElementById('sim-run-btn');
  const yearDisplay = document.getElementById('sim-year');
  const survivorsDisplay = document.getElementById('sim-survivors');
  const rateDisplay = document.getElementById('sim-rate');
  const theoreticalDisplay = document.getElementById('sim-theoretical');

  if (!grid) return;

  let objects = [];
  const N = 500;

  function initGrid() {
    grid.innerHTML = '';
    objects = [];
    for (let i = 0; i < N; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = 'width: 8px; height: 8px; border-radius: 1px; background: #22d3ee; transition: background 0.2s;';
      grid.appendChild(dot);
      objects.push({ el: dot, alive: true });
    }
    yearDisplay.textContent = '0';
    survivorsDisplay.textContent = N;
    rateDisplay.textContent = '100%';
    theoreticalDisplay.textContent = '100%';
  }

  riskInput.addEventListener('input', () => {
    riskVal.textContent = riskInput.value + '%';
  });

  yearsInput.addEventListener('input', () => {
    yearsVal.textContent = yearsInput.value + ' years';
  });

  runBtn.addEventListener('click', async () => {
    runBtn.disabled = true;
    runBtn.style.opacity = '0.5';
    runBtn.textContent = 'Simulating...';

    initGrid();

    const risk = parseFloat(riskInput.value) / 100;
    const totalYears = parseInt(yearsInput.value);
    const steps = 60;
    const stepSize = Math.ceil(totalYears / steps);

    for (let year = 0; year <= totalYears; year += stepSize) {
      yearDisplay.textContent = year;

      for (let i = 0; i < objects.length; i++) {
        if (objects[i].alive) {
          const surviveProb = Math.pow(1 - risk, stepSize);
          if (Math.random() > surviveProb) {
            objects[i].alive = false;
            objects[i].el.style.background = '#1a1a24';
          }
        }
      }

      const survivors = objects.filter(o => o.alive).length;
      survivorsDisplay.textContent = survivors;
      rateDisplay.textContent = ((survivors / N) * 100).toFixed(1) + '%';
      theoreticalDisplay.textContent = (Math.pow(1 - risk, year) * 100).toFixed(4) + '%';

      await new Promise(r => setTimeout(r, 50));
    }

    runBtn.disabled = false;
    runBtn.style.opacity = '1';
    runBtn.textContent = 'Run Again';
  });

  initGrid();
})();
</script>

## What It Means

Every ancient object in a museum or a private collection is a lottery winner. The odds against its survival were astronomical, and it beat them—usually through some combination of accident, disaster, and neglect.

This should change how we look at them. A coin from the reign of Marcus Aurelius isn't just a portrait of a dead emperor. It's one of perhaps a few thousand survivors from a mintage of millions. A scarab from New Kingdom Egypt isn't just an amulet. It's a message in a bottle that somehow bobbed across thirty-three centuries of chaos.

The cylinder seal at the top of this article was carved when writing was new, when the first cities were being invented, when the wheel was still a recent innovation. It passed through the hands of Sumerians, perhaps Akkadians, perhaps Babylonians. It survived the sack of cities we've forgotten the names of. And now it's here.

Against all odds.
