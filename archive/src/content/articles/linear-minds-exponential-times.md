---
title: "Linear Minds in Exponential Times"
description: "Humans think in straight lines. Progress moves in curves. From cylinder seals to AI agents, how civilization has repeatedly underestimated the pace of change—and what the current moment means."
publishDate: 2026-01-22
tags: [technology, history, AI, civilization, progress, philosophy]
featuredItems: [uruk-lapis-cylinder-seal]
---

A scribe in Uruk, around 3200 BCE, pressed a cylinder seal into wet clay to mark a shipment of barley. He could not have imagined that five thousand years later, his gesture—rolling a carved stone to create a unique, verifiable mark—would be echoed in digital signatures, cryptographic hashes, and blockchain transactions. The technology changed. The problem didn't.

We live in exponential times with linear minds.

## The Straight Line Illusion

Human intuition evolved for a world of gradual change. Our ancestors needed to predict where a thrown spear would land, when the river would flood, how many days until the fruit ripened. These problems are linear: cause follows effect in predictable proportion.

But technological progress doesn't work this way.

<div class="visualization-container" style="margin: 2rem 0;">
  <div class="vis-header">
    <span class="vis-label">// Linear vs. Exponential Intuition</span>
    <span class="vis-sublabel">How our brains mispredict change</span>
  </div>
  <svg viewBox="0 0 700 280" aria-label="Graph comparing linear and exponential growth curves">
    <defs>
      <linearGradient id="expGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" style="stop-color:#22d3ee;stop-opacity:0"/>
        <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:0.3"/>
      </linearGradient>
    </defs>
    <!-- Grid -->
    <line x1="60" y1="40" x2="560" y2="40" stroke="#2a2a3a" stroke-width="1"/>
    <line x1="60" y1="90" x2="560" y2="90" stroke="#2a2a3a" stroke-width="1"/>
    <line x1="60" y1="140" x2="560" y2="140" stroke="#2a2a3a" stroke-width="1"/>
    <line x1="60" y1="190" x2="560" y2="190" stroke="#2a2a3a" stroke-width="1"/>
    <line x1="60" y1="240" x2="560" y2="240" stroke="#2a2a3a" stroke-width="1"/>
    <!-- Y-axis labels -->
    <text x="50" y="44" fill="#52525b" font-size="9" text-anchor="end" font-family="JetBrains Mono, monospace">100x</text>
    <text x="50" y="94" fill="#52525b" font-size="9" text-anchor="end" font-family="JetBrains Mono, monospace">75x</text>
    <text x="50" y="144" fill="#52525b" font-size="9" text-anchor="end" font-family="JetBrains Mono, monospace">50x</text>
    <text x="50" y="194" fill="#52525b" font-size="9" text-anchor="end" font-family="JetBrains Mono, monospace">25x</text>
    <text x="50" y="244" fill="#52525b" font-size="9" text-anchor="end" font-family="JetBrains Mono, monospace">1x</text>
    <!-- X-axis labels -->
    <text x="60" y="260" fill="#52525b" font-size="9" text-anchor="middle" font-family="JetBrains Mono, monospace">0</text>
    <text x="185" y="260" fill="#52525b" font-size="9" text-anchor="middle" font-family="JetBrains Mono, monospace">5</text>
    <text x="310" y="260" fill="#52525b" font-size="9" text-anchor="middle" font-family="JetBrains Mono, monospace">10</text>
    <text x="435" y="260" fill="#52525b" font-size="9" text-anchor="middle" font-family="JetBrains Mono, monospace">15</text>
    <text x="560" y="260" fill="#52525b" font-size="9" text-anchor="middle" font-family="JetBrains Mono, monospace">20 yrs</text>
    <!-- Area under exponential curve -->
    <path d="M60,240 Q200,238 310,220 Q400,180 480,100 Q520,50 560,30 L560,240 Z" fill="url(#expGradient)"/>
    <!-- Linear expectation (dashed) -->
    <line x1="60" y1="240" x2="560" y2="140" stroke="#71717a" stroke-width="2" stroke-dasharray="8,4"/>
    <!-- Exponential reality -->
    <path d="M60,240 Q200,238 310,220 Q400,180 480,100 Q520,50 560,30" fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round"/>
    <!-- The gap at year 15 -->
    <line x1="435" y1="140" x2="435" y2="165" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="3,2"/>
    <circle cx="435" cy="140" r="4" fill="#fbbf24"/>
    <circle cx="435" cy="165" r="4" fill="#fbbf24"/>
    <text x="448" y="156" fill="#fbbf24" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="start">Gap</text>
    <!-- Labels outside chart area -->
    <text x="575" y="35" fill="#22d3ee" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="start">Exponential</text>
    <text x="575" y="47" fill="#22d3ee" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="start">reality</text>
    <text x="575" y="145" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="start">Linear</text>
    <text x="575" y="157" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="start">expectation</text>
  </svg>
  <div class="vis-footnote" style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; margin-top: 0.5rem;">
    At year 15, exponential growth has outpaced linear expectations by 3x. By year 20, the gap is 10x.
  </div>
</div>

When asked to estimate exponential growth, humans consistently underpredict. Show someone a graph doubling every year and ask where it will be in ten years. They'll guess maybe 20x. The actual answer is 1,024x.

This isn't stupidity. It's biology. Our neural hardware runs linear approximations because, for most of human history, they were close enough.

They aren't anymore.

## The Pattern Repeats

History shows a recurring pattern: a technology emerges that multiplies human capability, society initially underestimates its impact, then struggles to adapt as change accelerates beyond prediction.

### Writing: The First Information Technology

Around 3400 BCE, in the cities of southern Mesopotamia, administrators faced a problem: how to track goods, debts, and transactions across a complex urban economy. The solution was cuneiform—wedge-shaped marks pressed into clay—and the cylinder seal, a carved stone that created a unique, unforgeable signature when rolled across the clay surface.

<div class="collection-embed">
  <a href="/items/uruk-lapis-cylinder-seal">
    <div class="collection-embed-images grid-cols-2">
      <img src="/images/items/uruk-lapis-cylinder-seal/01.jpg" alt="Uruk period lapis lazuli cylinder seal" />
      <img src="/images/items/uruk-lapis-cylinder-seal/03.jpg" alt="Cylinder seal impression showing sheep" />
    </div>
  </a>
  <div class="collection-embed-info">
    <span class="collection-embed-label">From the Collection</span>
    <p class="collection-embed-caption">This lapis lazuli cylinder seal from the Uruk period (c. 3400-3000 BCE) represents one of humanity's earliest information technologies. The carved sheep weren't just decoration—they were a verifiable identity marker, the ancient equivalent of a digital signature.</p>
    <a href="/items/uruk-lapis-cylinder-seal" class="collection-embed-link">
      View full item details
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </a>
  </div>
</div>

What happened next wasn't linear. Writing didn't just help administrators count barley. It enabled law codes, literature, mathematics, astronomy, and historical memory. It allowed knowledge to accumulate across generations rather than dying with each scholar. The invention of writing didn't add to human capability—it multiplied it.

The Sumerians who carved the first cylinder seals could not have imagined the Epic of Gilgamesh, the Code of Hammurabi, or the astronomical tables of Babylon. They were solving a bookkeeping problem. They were inventing civilization.

### Printing: The Knowledge Multiplier

Johannes Gutenberg introduced movable type to Europe around 1440. The immediate use case was obvious: produce Bibles faster and cheaper than hand-copying. A reasonable person in 1450 might have predicted that printing would make books slightly more available to wealthy institutions.

What actually happened:

<div id="gutenberg-chart" class="visualization-container" style="margin: 2rem 0;">
  <div class="vis-header">
    <span class="vis-label">// Books Printed in Europe</span>
    <span class="vis-sublabel">Watch each era shrink as the next arrives</span>
  </div>
  <div style="position: relative; height: 220px; background: #0a0a0f; border-radius: 4px; overflow: hidden; padding: 1rem;">
    <div id="gut-bar-container" style="position: absolute; bottom: 40px; left: 0; right: 0; display: flex; align-items: flex-end; justify-content: center; gap: 8px; height: 150px;"></div>
    <div id="gut-label" style="position: absolute; bottom: 12px; left: 0; right: 0; text-align: center; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #71717a;"></div>
    <div style="position: absolute; top: 12px; right: 16px; font-family: 'JetBrains Mono', monospace;">
      <span style="font-size: 9px; color: #52525b;">Output </span>
      <span id="gut-counter" style="font-size: 20px; color: #22d3ee;"></span>
    </div>
    <div style="position: absolute; top: 12px; left: 16px; font-family: 'JetBrains Mono', monospace;">
      <span style="font-size: 9px; color: #52525b;">Year </span>
      <span id="gut-year" style="font-size: 14px; color: #fbbf24;"></span>
    </div>
  </div>
  <div class="vis-footnote" style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; margin-top: 0.5rem; text-align: center;">
    Each bar starts full height, then shrinks to scale. 1000x increase in 150 years.
  </div>
</div>

<script type="module">
(function() {
  const container = document.getElementById('gutenberg-chart');
  const barContainer = document.getElementById('gut-bar-container');
  const labelEl = document.getElementById('gut-label');
  const counterEl = document.getElementById('gut-counter');
  const yearEl = document.getElementById('gut-year');

  if (!container || !barContainer) return;

  const data = [
    { year: '1400', value: 1000, label: 'Manuscripts copied by hand', color: '#71717a' },
    { year: '1460', value: 15000, label: 'First printed books appear', color: '#22d3ee' },
    { year: '1480', value: 100000, label: 'Printing spreads across Europe', color: '#22d3ee' },
    { year: '1500', value: 500000, label: 'More books than all prior history', color: '#22d3ee' },
    { year: '1550', value: 1000000, label: 'Information explosion', color: '#22d3ee' },
  ];

  let bars = [];
  let running = false;
  let visible = false;

  function formatNum(n) {
    if (n >= 1000000) return (n/1000000).toFixed(0) + 'M';
    if (n >= 1000) return (n/1000).toFixed(0) + 'K';
    return n.toString();
  }

  function reset() {
    barContainer.innerHTML = '';
    bars = [];
    labelEl.textContent = '';
    counterEl.textContent = '';
    yearEl.textContent = '';
  }

  async function animate() {
    if (running) return;
    running = true;
    reset();

    const maxHeight = 140;

    for (let i = 0; i < data.length; i++) {
      const d = data[i];

      // Smooth year transition
      yearEl.style.transition = 'opacity 0.2s';
      yearEl.style.opacity = '0.5';
      await new Promise(r => setTimeout(r, 100));
      yearEl.textContent = d.year;
      yearEl.style.opacity = '1';

      labelEl.textContent = d.label;

      // Animate counter smoothly
      const startVal = i > 0 ? data[i-1].value : 0;
      const duration = 600;
      const startTime = Date.now();

      while (Date.now() - startTime < duration) {
        const progress = (Date.now() - startTime) / duration;
        const eased = 1 - Math.pow(1 - progress, 2);
        const current = Math.round(startVal + (d.value - startVal) * eased);
        counterEl.textContent = formatNum(current) + '/yr';
        await new Promise(r => setTimeout(r, 16));
      }
      counterEl.textContent = formatNum(d.value) + '/yr';

      // Create new bar - grow from 0 to full height
      const bar = document.createElement('div');
      bar.style.cssText = `
        width: 50px;
        height: 0px;
        background: ${d.color};
        border-radius: 4px 4px 0 0;
        transition: height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        opacity: 0.9;
      `;
      barContainer.appendChild(bar);
      bars.push({ el: bar, value: d.value });

      // Trigger grow animation
      await new Promise(r => setTimeout(r, 20));
      bar.style.height = maxHeight + 'px';

      await new Promise(r => setTimeout(r, 500));

      // If there's a next item, rescale all bars smoothly
      if (i < data.length - 1) {
        await new Promise(r => setTimeout(r, 600));

        const nextMax = data[i + 1].value;

        // Rescale all existing bars with smooth transition
        for (const b of bars) {
          b.el.style.transition = 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
          const newHeight = Math.max(2, (b.value / nextMax) * maxHeight);
          b.el.style.height = newHeight + 'px';
        }

        await new Promise(r => setTimeout(r, 600));
      }
    }

    // Hold final state
    labelEl.textContent = '1000× increase in 150 years';
    await new Promise(r => setTimeout(r, 2500));

    // Fade out and restart
    barContainer.style.transition = 'opacity 0.5s';
    barContainer.style.opacity = '0';
    await new Promise(r => setTimeout(r, 600));
    barContainer.style.opacity = '1';

    running = false;

    // Auto-loop if still visible
    if (visible) {
      await new Promise(r => setTimeout(r, 300));
      animate();
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      visible = entry.isIntersecting;
      if (visible && !running) {
        animate();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(container);
})();
</script>

Within a century: the Protestant Reformation (enabled by pamphlet distribution), the Scientific Revolution (enabled by shared research), the spread of literacy beyond clergy, and the eventual collapse of information monopolies that had governed society for a millennium.

The Church, which had controlled the production and interpretation of texts for centuries, understood immediately that something dangerous was happening. But understanding didn't help. You can't unpublish a book. You can't un-spread an idea. The technology had escaped.

## The Current Moment

We are living through another such transition. The technology this time is artificial intelligence—specifically, the emergence of language models capable of generating human-quality text, code, and reasoning.

The initial framing was modest: chatbots that could answer questions, coding assistants that could complete functions, writing tools that could draft emails. Useful, certainly. Revolutionary? The consensus in 2022 was skeptical.

Then the curve bent upward.

### The Feedback Loop

The breakthrough isn't just better models. It's what happens when AI systems start improving AI systems.

Consider the development pipeline for software. Traditionally: human writes code, human reviews code, human tests code, human deploys code. Each step requires human attention, human time, human judgment. The throughput is limited by human bandwidth.

Now introduce AI at each step. AI drafts code. AI reviews code. AI writes tests. AI identifies bugs. Humans supervise, but the bottleneck shifts. Where once a team might complete ten features per month, they might now complete fifty. The same humans, amplified by AI collaborators, produce more.

<div class="visualization-container" style="margin: 2rem 0;">
  <div class="vis-header">
    <span class="vis-label">// The Amplification Loop</span>
    <span class="vis-sublabel">How AI multiplies development throughput</span>
  </div>
  <svg viewBox="0 0 600 200" aria-label="Diagram showing the AI amplification feedback loop">
    <defs>
      <marker id="loopArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#22d3ee"/>
      </marker>
      <marker id="loopArrowGold" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#fbbf24"/>
      </marker>
    </defs>
    <!-- Traditional loop (top) -->
    <text x="300" y="25" fill="#71717a" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle">Traditional: Human → Human → Human</text>
    <rect x="80" y="35" width="80" height="30" rx="4" fill="#1a1a24" stroke="#52525b" stroke-width="1"/>
    <text x="120" y="54" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Write</text>
    <rect x="200" y="35" width="80" height="30" rx="4" fill="#1a1a24" stroke="#52525b" stroke-width="1"/>
    <text x="240" y="54" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Review</text>
    <rect x="320" y="35" width="80" height="30" rx="4" fill="#1a1a24" stroke="#52525b" stroke-width="1"/>
    <text x="360" y="54" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Test</text>
    <rect x="440" y="35" width="80" height="30" rx="4" fill="#1a1a24" stroke="#52525b" stroke-width="1"/>
    <text x="480" y="54" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Deploy</text>
    <line x1="160" y1="50" x2="195" y2="50" stroke="#52525b" stroke-width="1"/>
    <line x1="280" y1="50" x2="315" y2="50" stroke="#52525b" stroke-width="1"/>
    <line x1="400" y1="50" x2="435" y2="50" stroke="#52525b" stroke-width="1"/>
    <!-- Amplified loop (bottom) -->
    <text x="300" y="100" fill="#22d3ee" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle">Amplified: Human + AI → AI → AI → Human validates</text>
    <!-- Central human node -->
    <circle cx="300" cy="150" r="25" fill="#1a1a24" stroke="#fbbf24" stroke-width="2"/>
    <text x="300" y="154" fill="#fbbf24" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Human</text>
    <!-- AI agent nodes -->
    <circle cx="150" cy="150" r="20" fill="#1a1a24" stroke="#22d3ee" stroke-width="1.5"/>
    <text x="150" y="154" fill="#22d3ee" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">AI</text>
    <circle cx="220" cy="120" r="20" fill="#1a1a24" stroke="#22d3ee" stroke-width="1.5"/>
    <text x="220" y="124" fill="#22d3ee" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">AI</text>
    <circle cx="380" cy="120" r="20" fill="#1a1a24" stroke="#22d3ee" stroke-width="1.5"/>
    <text x="380" y="124" fill="#22d3ee" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">AI</text>
    <circle cx="450" cy="150" r="20" fill="#1a1a24" stroke="#22d3ee" stroke-width="1.5"/>
    <text x="450" y="154" fill="#22d3ee" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">AI</text>
    <circle cx="220" cy="180" r="20" fill="#1a1a24" stroke="#22d3ee" stroke-width="1.5"/>
    <text x="220" y="184" fill="#22d3ee" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">AI</text>
    <circle cx="380" cy="180" r="20" fill="#1a1a24" stroke="#22d3ee" stroke-width="1.5"/>
    <text x="380" y="184" fill="#22d3ee" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">AI</text>
    <!-- Connections -->
    <line x1="170" y1="150" x2="275" y2="150" stroke="#22d3ee" stroke-width="1" marker-end="url(#loopArrow)"/>
    <line x1="237" y1="128" x2="275" y2="145" stroke="#22d3ee" stroke-width="1" marker-end="url(#loopArrow)"/>
    <line x1="325" y1="145" x2="363" y2="128" stroke="#22d3ee" stroke-width="1" marker-end="url(#loopArrow)"/>
    <line x1="325" y1="150" x2="430" y2="150" stroke="#22d3ee" stroke-width="1" marker-end="url(#loopArrow)"/>
    <line x1="237" y1="172" x2="275" y2="155" stroke="#22d3ee" stroke-width="1" marker-end="url(#loopArrow)"/>
    <line x1="325" y1="155" x2="363" y2="172" stroke="#22d3ee" stroke-width="1" marker-end="url(#loopArrow)"/>
  </svg>
  <div class="vis-footnote" style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; margin-top: 0.5rem;">
    One human directing multiple AI agents can explore solution spaces that would take a traditional team months.
  </div>
</div>

But here's where it gets interesting. This amplification applies to AI development itself.

AI systems help researchers write papers, analyze results, generate hypotheses, and debug training runs. The tools that build AI are themselves improved by AI. This is the feedback loop that technologists have discussed theoretically for decades—and it's now happening.

### The Ralph Loop

<figure style="margin: 2rem 0; text-align: center;">
  <img src="/images/articles/linear-minds/ralph-wiggum.webp" alt="Ralph Wiggum from The Simpsons" style="max-width: 280px; border-radius: 8px; display: block; margin: 0 auto;" />
  <figcaption style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #71717a; margin-top: 0.75rem;">The insight: even simple agents, running in parallel, can solve complex problems.</figcaption>
</figure>

A curious insight has emerged from the practice of AI-assisted development: you don't always need the smartest model. Sometimes you need many adequate ones.

The pattern goes like this: rather than waiting for a single genius AI to solve a complex problem, you spawn dozens of simpler agents, each exploring a different approach in parallel. Most fail. Some succeed. The successes are combined, evaluated, refined. The collective intelligence of many "Ralph Wiggums"—each individually limited but together covering vast solution spaces—outperforms single sophisticated attempts.

<div class="visualization-container" style="margin: 2rem 0;">
  <div class="vis-header">
    <span class="vis-label">// Parallel Exploration vs. Serial Genius</span>
    <span class="vis-sublabel">Two paths to problem-solving</span>
  </div>
  <svg viewBox="0 0 600 260" aria-label="Diagram comparing serial expert approach to parallel exploration approach">
    <!-- Serial approach (left) -->
    <text x="150" y="25" fill="#71717a" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle">Serial: One Expert</text>
    <rect x="100" y="40" width="100" height="40" rx="4" fill="#1a1a24" stroke="#a855f7" stroke-width="2"/>
    <text x="150" y="65" fill="#a855f7" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle">Expert AI</text>
    <line x1="150" y1="80" x2="150" y2="100" stroke="#a855f7" stroke-width="1.5"/>
    <rect x="100" y="100" width="100" height="30" rx="4" fill="#1a1a24" stroke="#52525b" stroke-width="1"/>
    <text x="150" y="120" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Attempt 1</text>
    <line x1="150" y1="130" x2="150" y2="145" stroke="#52525b" stroke-width="1"/>
    <rect x="100" y="145" width="100" height="30" rx="4" fill="#1a1a24" stroke="#52525b" stroke-width="1"/>
    <text x="150" y="165" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Attempt 2</text>
    <line x1="150" y1="175" x2="150" y2="190" stroke="#52525b" stroke-width="1"/>
    <rect x="100" y="190" width="100" height="30" rx="4" fill="#1a1a24" stroke="#52525b" stroke-width="1"/>
    <text x="150" y="210" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Attempt 3...</text>
    <text x="150" y="245" fill="#52525b" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Time: Sequential</text>
    <!-- Parallel approach (right) -->
    <text x="450" y="25" fill="#22d3ee" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle">Parallel: Many Explorers</text>
    <!-- Spawning node -->
    <rect x="400" y="40" width="100" height="40" rx="4" fill="#1a1a24" stroke="#fbbf24" stroke-width="2"/>
    <text x="450" y="65" fill="#fbbf24" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle">Orchestrator</text>
    <!-- Spawn lines -->
    <line x1="420" y1="80" x2="340" y2="110" stroke="#22d3ee" stroke-width="1"/>
    <line x1="435" y1="80" x2="390" y2="110" stroke="#22d3ee" stroke-width="1"/>
    <line x1="450" y1="80" x2="450" y2="110" stroke="#22d3ee" stroke-width="1"/>
    <line x1="465" y1="80" x2="510" y2="110" stroke="#22d3ee" stroke-width="1"/>
    <line x1="480" y1="80" x2="560" y2="110" stroke="#22d3ee" stroke-width="1"/>
    <!-- Agent nodes -->
    <circle cx="340" cy="125" r="15" fill="#1a1a24" stroke="#22d3ee" stroke-width="1"/>
    <text x="340" y="129" fill="#22d3ee" font-size="7" font-family="JetBrains Mono, monospace" text-anchor="middle">A1</text>
    <circle cx="390" cy="125" r="15" fill="#1a1a24" stroke="#22d3ee" stroke-width="1"/>
    <text x="390" y="129" fill="#22d3ee" font-size="7" font-family="JetBrains Mono, monospace" text-anchor="middle">A2</text>
    <circle cx="450" cy="125" r="15" fill="#1a1a24" stroke="#22d3ee" stroke-width="1"/>
    <text x="450" y="129" fill="#22d3ee" font-size="7" font-family="JetBrains Mono, monospace" text-anchor="middle">A3</text>
    <circle cx="510" cy="125" r="15" fill="#1a1a24" stroke="#22d3ee" stroke-width="1"/>
    <text x="510" y="129" fill="#22d3ee" font-size="7" font-family="JetBrains Mono, monospace" text-anchor="middle">A4</text>
    <circle cx="560" cy="125" r="15" fill="#1a1a24" stroke="#ef4444" stroke-width="1"/>
    <text x="560" y="129" fill="#ef4444" font-size="7" font-family="JetBrains Mono, monospace" text-anchor="middle">A5</text>
    <!-- Results -->
    <line x1="340" y1="140" x2="340" y2="165" stroke="#22d3ee" stroke-width="1"/>
    <line x1="390" y1="140" x2="390" y2="165" stroke="#ef4444" stroke-width="1"/>
    <line x1="450" y1="140" x2="450" y2="165" stroke="#22d3ee" stroke-width="1"/>
    <line x1="510" y1="140" x2="510" y2="165" stroke="#ef4444" stroke-width="1"/>
    <line x1="560" y1="140" x2="560" y2="165" stroke="#ef4444" stroke-width="1"/>
    <text x="340" y="180" fill="#22d3ee" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">success</text>
    <text x="390" y="180" fill="#ef4444" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">fail</text>
    <text x="450" y="180" fill="#22d3ee" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">success</text>
    <text x="510" y="180" fill="#ef4444" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">fail</text>
    <text x="560" y="180" fill="#ef4444" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">fail</text>
    <!-- Merge -->
    <line x1="340" y1="190" x2="400" y2="210" stroke="#22d3ee" stroke-width="1"/>
    <line x1="450" y1="190" x2="400" y2="210" stroke="#22d3ee" stroke-width="1"/>
    <rect x="350" y="210" width="100" height="30" rx="4" fill="#1a1a24" stroke="#22d3ee" stroke-width="2"/>
    <text x="400" y="230" fill="#22d3ee" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Best merged</text>
    <text x="450" y="255" fill="#52525b" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Time: Parallel</text>
  </svg>
  <div class="vis-footnote" style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; margin-top: 0.5rem;">
    Parallel exploration finds solutions faster by covering more ground, even when individual agents are less sophisticated.
  </div>
</div>

This inverts a long-held assumption in AI development: that progress requires ever-more-powerful individual models. It turns out that architecture—how you orchestrate many agents—matters as much as raw capability. A well-coordinated swarm of modest models can outperform a single brilliant one.

The implications ripple outward. If parallel exploration beats serial genius, then the constraint on AI capability isn't just model quality—it's our ability to orchestrate agents effectively. And that's a problem humans are good at solving.

## The Singularity Question

The word "singularity" gets thrown around carelessly. In mathematics, a singularity is a point where a function becomes undefined—approaches infinity, divides by zero, ceases to behave predictably. In technological forecasting, it refers to a hypothetical moment when AI improvement becomes so rapid that human prediction becomes meaningless.

Are we approaching that point?

The honest answer: we don't know. But the honest answer is also that we wouldn't necessarily know if we were.

<div class="math-box">
  <div class="math-label">The Prediction Horizon Problem</div>
  <div class="math-formula">
    Error<sub>prediction</sub> = 2<sup>n/T</sup>
  </div>
  <div class="math-explanation">
    Where <em>n</em> = months ahead, <em>T</em> = doubling time in months<br/>
    At 24 months with monthly doubling: 2<sup>24</sup> = 16,777,216x error
  </div>
</div>

The scribes of Uruk couldn't predict the Epic of Gilgamesh. Gutenberg couldn't predict the Reformation. We may be equally blind to what AI enables.

What we can say: the feedback loop is real. AI systems are contributing to AI development. The pace of capability improvement has not slowed. And our linear intuitions are probably wrong about what happens next.

## What the Objects Teach Us

Every ancient object represents a moment of technological sophistication that seemed permanent to those who made it. The bureaucrat pressing his cylinder seal into clay was using cutting-edge information technology. The mint worker striking a denarius was participating in a standardized economic system that spanned continents. They lived in the future, as we do now.

And yet their futures became our past. Their innovations became our antiques. Their exponential curves flattened into historical footnotes.

This isn't pessimism. It's perspective.

The technologies that transform civilization don't announce themselves as transformative. They arrive as practical solutions to immediate problems—tracking grain shipments, printing Bibles, generating plausible text. The people deploying them don't feel like they're changing history. They feel like they're doing their jobs.

The cylinder seal in my collection was a tool. Someone used it to sign documents, mark property, authenticate transactions. The carver who made it was solving a client's problem, not inventing civilization. But civilization emerged anyway, from a million such practical acts multiplying across time.

We are living through another such multiplication. The models are tools. The developers are solving problems. And something is emerging that none of us fully understand.

Linear minds in exponential times.

We've been here before. The curve always wins.
