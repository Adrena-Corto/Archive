---
title: "Building The Antique Archive: From Lightbox to Browser"
description: "How a finance engineer with a childhood spent digging for relics in northern France built a modern archive for ancient objects—using AI tools, a lightbox, and flat files."
publishDate: 2026-01-21
tags: [meta, photography, technology, collecting, behind-the-scenes]
---

I started collecting as a kid in northern France, digging random holes in fields with a shovel—no metal detector, just intuition and stubbornness. World War I and II relics were everywhere: shell casings, buttons, buckles, fragments of a continent's violent century. Three decades later, I have over 1,500 objects, a proper Deus XP detector, and a problem: how do you catalog, photograph, and share a collection this size?

<figure style="margin: 2rem 0;">
  <img src="/images/articles/building-the-archive/hero-detecting.jpg" alt="Metal detecting in a field at sunset in northern France" style="width: 100%; border-radius: 8px;" />
  <figcaption style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #71717a; margin-top: 0.75rem; text-align: center;">Evening detecting session in the fields of northern France</figcaption>
</figure>

The answer, it turns out, is to build something yourself.

## The Problem with Existing Tools

I tried the obvious solutions. Notion databases with photos crammed into cells. Spreadsheets that became unwieldy after fifty entries. Instagram, where my carefully photographed coins disappeared into an algorithmic feed designed for engagement, not preservation. Collection management apps that couldn't accommodate the fields I needed or the relationships between objects I wanted to track.

Nothing fit. The tools were either too rigid (fixed schemas that didn't understand the difference between a Roman denarius and a Sasanian stamp seal) or too chaotic (social media that scattered my collection across posts without structure). I wanted something that felt like a museum catalog but lived on the web. Something I owned completely.

So I built it.

## The Photography Problem

Before the website, there was the photography problem. Small, reflective, ancient metal objects are notoriously difficult to photograph well. The challenges:

**Reflections.** Silver and bronze are mirrors. Point a light at a denarius and you get a hot spot. Point it at a different angle and you lose definition in the legends. The surface texture that makes ancient coins beautiful—the toning, the patina, the evidence of age—disappears under harsh lighting.

**Scale.** A 19mm coin needs to fill the frame while remaining sharp across its entire surface. The depth of field at close distances becomes razor-thin.

**Color accuracy.** The warm gold of a late Roman solidus, the gray-green patina of an ancient bronze, the blue-black toning of a well-preserved denarius—these are the colors collectors care about. Get them wrong and the photograph lies.

**Consistency.** With hundreds of objects, I needed a repeatable process. Every photograph needed to look like it belonged to the same catalog.

### The Lightbox Solution

A SANOTO photo lightbox solved most of these problems at once. The diffused lighting from multiple angles eliminates harsh reflections while preserving surface detail. The neutral background provides consistency. The enclosed space means consistent color temperature.

<div class="visualization-container" style="margin: 2rem 0;">
  <div class="vis-header">
    <span class="vis-label">// Lighting: Direct vs. Diffused</span>
    <span class="vis-sublabel">Why lightboxes work for reflective objects</span>
  </div>
  <svg viewBox="0 0 600 240" aria-label="Diagram comparing direct lighting (harsh reflections) to diffused lighting (even coverage)">
    <defs>
      <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
      </marker>
    </defs>
    <text x="150" y="25" fill="#ef4444" font-size="12" font-family="JetBrains Mono, monospace" text-anchor="middle">Direct Light</text>
    <circle cx="150" cy="55" r="15" fill="#fbbf24" opacity="0.8"/>
    <line x1="150" y1="70" x2="150" y2="110" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,2"/>
    <line x1="135" y1="70" x2="120" y2="110" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,2"/>
    <line x1="165" y1="70" x2="180" y2="110" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,2"/>
    <ellipse cx="150" cy="140" rx="45" ry="15" fill="#3a3a4a" stroke="#52525b" stroke-width="1"/>
    <ellipse cx="150" cy="135" rx="8" ry="3" fill="#fbbf24" opacity="0.9"/>
    <text x="150" y="165" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Hot spot</text>
    <line x1="150" y1="125" x2="200" y2="90" stroke="#ef4444" stroke-width="1.5" marker-end="url(#arrowRed)"/>
    <text x="215" y="85" fill="#ef4444" font-size="9" font-family="JetBrains Mono, monospace">Glare</text>
    <rect x="100" y="190" width="100" height="24" rx="4" fill="#1a1a24" stroke="#ef4444" stroke-width="1"/>
    <text x="150" y="206" fill="#ef4444" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle">Lost detail</text>
    <text x="450" y="25" fill="#22d3ee" font-size="12" font-family="JetBrains Mono, monospace" text-anchor="middle">Diffused Light</text>
    <rect x="380" y="45" width="140" height="100" rx="4" fill="none" stroke="#22d3ee" stroke-width="1" opacity="0.5"/>
    <circle cx="400" cy="60" r="8" fill="#22d3ee" opacity="0.3"/>
    <circle cx="450" cy="55" r="8" fill="#22d3ee" opacity="0.3"/>
    <circle cx="500" cy="60" r="8" fill="#22d3ee" opacity="0.3"/>
    <circle cx="385" cy="95" r="6" fill="#22d3ee" opacity="0.2"/>
    <circle cx="515" cy="95" r="6" fill="#22d3ee" opacity="0.2"/>
    <line x1="400" y1="68" x2="430" y2="115" stroke="#22d3ee" stroke-width="0.5" opacity="0.4"/>
    <line x1="450" y1="63" x2="450" y2="115" stroke="#22d3ee" stroke-width="0.5" opacity="0.4"/>
    <line x1="500" y1="68" x2="470" y2="115" stroke="#22d3ee" stroke-width="0.5" opacity="0.4"/>
    <line x1="391" y1="95" x2="420" y2="120" stroke="#22d3ee" stroke-width="0.5" opacity="0.3"/>
    <line x1="509" y1="95" x2="480" y2="120" stroke="#22d3ee" stroke-width="0.5" opacity="0.3"/>
    <ellipse cx="450" cy="135" rx="45" ry="15" fill="#52525b" stroke="#71717a" stroke-width="1"/>
    <ellipse cx="450" cy="133" rx="35" ry="10" fill="#71717a" opacity="0.3"/>
    <text x="450" y="165" fill="#71717a" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Even coverage</text>
    <rect x="400" y="190" width="100" height="24" rx="4" fill="#1a1a24" stroke="#22d3ee" stroke-width="1"/>
    <text x="450" y="206" fill="#22d3ee" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle">Full detail</text>
  </svg>
</div>

### Camera Settings That Work

I'm a total beginner at photography. The camera—a Fujifilm X-T50 paired with the XF 30mm f/2.8 Macro lens—was chosen on a friend's recommendation and with AI guidance. After experimentation, these settings consistently produce sharp, accurate images:

<div class="visualization-container" style="margin: 2rem 0;">
  <div class="vis-header">
    <span class="vis-label">// Camera Settings Reference</span>
    <span class="vis-sublabel">Fujifilm X-T50 + XF 30mm f/2.8 Macro</span>
  </div>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding: 1rem 0;">
    <div style="background: #1a1a24; border-radius: 6px; padding: 1rem; text-align: center;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Mode</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 24px; color: #22d3ee; margin: 0.5rem 0;">A</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #a1a1aa;">Aperture Priority</div>
    </div>
    <div style="background: #1a1a24; border-radius: 6px; padding: 1rem; text-align: center;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Aperture</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 24px; color: #22d3ee; margin: 0.5rem 0;">f/5.6</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #a1a1aa;">Macro sweet spot</div>
    </div>
    <div style="background: #1a1a24; border-radius: 6px; padding: 1rem; text-align: center;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">ISO</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 24px; color: #22d3ee; margin: 0.5rem 0;">160</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #a1a1aa;">Base ISO, minimal noise</div>
    </div>
    <div style="background: #1a1a24; border-radius: 6px; padding: 1rem; text-align: center;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Focus</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 24px; color: #22d3ee; margin: 0.5rem 0;">MF</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #a1a1aa;">Manual + Peaking</div>
    </div>
    <div style="background: #1a1a24; border-radius: 6px; padding: 1rem; text-align: center;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Lens</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 24px; color: #22d3ee; margin: 0.5rem 0;">30mm</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #a1a1aa;">1:1 macro capable</div>
    </div>
    <div style="background: #1a1a24; border-radius: 6px; padding: 1rem; text-align: center;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Timer</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 24px; color: #22d3ee; margin: 0.5rem 0;">2s</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #a1a1aa;">Avoids camera shake</div>
    </div>
  </div>
  <div class="vis-footnote" style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; margin-top: 0.5rem;">
    The 30mm macro lens allows true 1:1 magnification. f/5.6 balances sharpness with sufficient depth of field for coin surfaces.
  </div>
</div>

The key insight: a dedicated macro lens changes everything. The XF 30mm f/2.8 Macro allows true 1:1 magnification—filling the frame with a small coin while maintaining edge-to-edge sharpness. At f/5.6, I get enough depth of field to keep the entire coin face in focus while staying in the lens's sharpest aperture range. Manual focus with focus peaking is essential—autofocus often grabs the wrong plane on reflective surfaces.

## The Tech Stack

With photographs sorted, I needed a home for them. My day job is C, C++, and Rust—building low-latency systems for finance. Web development isn't my world. But the modern stack, combined with AI assistance, made this feasible.

### Why Astro

An AI recommended Astro, and the recommendation was right. Astro generates static HTML at build time. No JavaScript framework running in the browser (unless you opt in). The result is fast—really fast—and simple to reason about.

For a collection archive, this is perfect. The content is mostly static. It doesn't need real-time updates or complex client-side state. It needs to load quickly, work everywhere, and be maintainable.

### YAML as Database

The items themselves live in YAML files—one per object. This was a deliberate choice against a "real" database:

<div class="visualization-container" style="margin: 2rem 0; padding: 0; overflow: hidden;">
  <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; background: #0a0a0f; border-bottom: 1px solid #2a2a3a;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    <span style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #fbbf24;">septimius-severus-denarius.yaml</span>
    <span style="margin-left: auto; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #52525b;">src/data/items/</span>
  </div>
  <div style="padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.6; background: #12121a;">
    <div><span style="color: #22d3ee;">id</span><span style="color: #52525b;">:</span> <span style="color: #a1a1aa;">septimius-severus-denarius</span></div>
    <div><span style="color: #22d3ee;">name</span><span style="color: #52525b;">:</span> <span style="color: #86efac;">"Septimius Severus Denarius"</span></div>
    <div><span style="color: #22d3ee;">category</span><span style="color: #52525b;">:</span> <span style="color: #a1a1aa;">coin</span></div>
    <div><span style="color: #22d3ee;">era</span><span style="color: #52525b;">:</span> <span style="color: #86efac;">"193-211 AD"</span></div>
    <div><span style="color: #22d3ee;">period</span><span style="color: #52525b;">:</span> <span style="color: #86efac;">"Roman Imperial"</span></div>
    <div><span style="color: #22d3ee;">material</span><span style="color: #52525b;">:</span> <span style="color: #a1a1aa;">silver</span></div>
    <div><span style="color: #22d3ee;">empire</span><span style="color: #52525b;">:</span> <span style="color: #a1a1aa;">roman</span></div>
    <div><span style="color: #22d3ee;">denomination</span><span style="color: #52525b;">:</span> <span style="color: #a1a1aa;">Denarius</span></div>
    <div><span style="color: #22d3ee;">ruler</span><span style="color: #52525b;">:</span> <span style="color: #a1a1aa;">Septimius Severus</span></div>
    <div><span style="color: #22d3ee;">condition</span><span style="color: #52525b;">:</span> <span style="color: #86efac;">"VF"</span></div>
    <div><span style="color: #22d3ee;">images</span><span style="color: #52525b;">:</span></div>
    <div style="padding-left: 1rem;"><span style="color: #52525b;">-</span> <span style="color: #a1a1aa;">obverse.jpg</span></div>
    <div style="padding-left: 1rem;"><span style="color: #52525b;">-</span> <span style="color: #a1a1aa;">reverse.jpg</span></div>
    <div><span style="color: #22d3ee;">tags</span><span style="color: #52525b;">:</span> <span style="color: #52525b;">[</span><span style="color: #a1a1aa;">roman, denarius, silver, severan</span><span style="color: #52525b;">]</span></div>
  </div>
</div>

Human-readable. Version-controllable with Git. No database server required. Adding a new item means creating a new text file. The build process reads all YAML files and generates the corresponding pages.

<div class="visualization-container" style="margin: 2rem 0;">
  <div class="vis-header">
    <span class="vis-label">// Data Pipeline</span>
    <span class="vis-sublabel">From photograph to published page</span>
  </div>
  <svg viewBox="0 0 600 180" aria-label="Pipeline diagram showing flow from camera to YAML to build to website">
    <defs>
      <marker id="arrowGray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#3a3a4a"/>
      </marker>
    </defs>
    <g transform="translate(30, 40)">
      <rect x="0" y="0" width="80" height="60" rx="4" fill="#1a1a24" stroke="#3a3a4a" stroke-width="1"/>
      <g transform="translate(28, 10)">
        <rect x="2" y="4" width="20" height="14" rx="2" fill="none" stroke="#71717a" stroke-width="1.5"/>
        <circle cx="12" cy="11" r="3" fill="none" stroke="#71717a" stroke-width="1.5"/>
        <path d="M17 4V2H7v2" fill="none" stroke="#71717a" stroke-width="1.5"/>
      </g>
      <text x="40" y="48" fill="#a1a1aa" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Capture</text>
    </g>
    <line x1="115" y1="70" x2="145" y2="70" stroke="#3a3a4a" stroke-width="1.5" marker-end="url(#arrowGray)"/>
    <g transform="translate(150, 40)">
      <rect x="0" y="0" width="80" height="60" rx="4" fill="#1a1a24" stroke="#3a3a4a" stroke-width="1"/>
      <text x="40" y="22" fill="#22d3ee" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle">magick</text>
      <text x="40" y="36" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">resize</text>
      <text x="40" y="48" fill="#a1a1aa" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Process</text>
    </g>
    <line x1="235" y1="70" x2="265" y2="70" stroke="#3a3a4a" stroke-width="1.5" marker-end="url(#arrowGray)"/>
    <g transform="translate(270, 40)">
      <rect x="0" y="0" width="80" height="60" rx="4" fill="#1a1a24" stroke="#22d3ee" stroke-width="1"/>
      <text x="40" y="22" fill="#fbbf24" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle">.yaml</text>
      <text x="40" y="36" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">+ metadata</text>
      <text x="40" y="48" fill="#a1a1aa" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Catalog</text>
    </g>
    <line x1="355" y1="70" x2="385" y2="70" stroke="#3a3a4a" stroke-width="1.5" marker-end="url(#arrowGray)"/>
    <g transform="translate(390, 40)">
      <rect x="0" y="0" width="80" height="60" rx="4" fill="#1a1a24" stroke="#3a3a4a" stroke-width="1"/>
      <text x="40" y="22" fill="#22d3ee" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle">astro</text>
      <text x="40" y="36" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">build</text>
      <text x="40" y="48" fill="#a1a1aa" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Generate</text>
    </g>
    <line x1="475" y1="70" x2="505" y2="70" stroke="#3a3a4a" stroke-width="1.5" marker-end="url(#arrowGray)"/>
    <g transform="translate(510, 40)">
      <rect x="0" y="0" width="80" height="60" rx="4" fill="#1a1a24" stroke="#22d3ee" stroke-width="1"/>
      <g transform="translate(28, 12)">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="#22d3ee" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <text x="40" y="48" fill="#a1a1aa" font-size="9" font-family="JetBrains Mono, monospace" text-anchor="middle">Publish</text>
    </g>
    <text x="70" y="125" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">Fujifilm</text>
    <text x="70" y="137" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">X-T50</text>
    <text x="190" y="125" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">2800px max</text>
    <text x="190" y="137" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">85% quality</text>
    <text x="310" y="125" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">Flat files</text>
    <text x="310" y="137" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">Git tracked</text>
    <text x="430" y="125" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">Static HTML</text>
    <text x="430" y="137" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">+ Pagefind</text>
    <text x="550" y="125" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">GitHub</text>
    <text x="550" y="137" fill="#52525b" font-size="8" font-family="JetBrains Mono, monospace" text-anchor="middle">Pages</text>
  </svg>
</div>

### Progressive Image Loading

Images are the heaviest part of any collection site. To keep the experience smooth, the site uses ThumbHash—a compact representation of an image as a blurry placeholder. When you load a page, you see the blur instantly while the real image downloads.

<div class="visualization-container" style="margin: 2rem 0; padding: 0; overflow: hidden;">
  <div style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: #1a1a24; border-bottom: 1px solid #2a2a3a;">
    <div style="display: flex; gap: 6px;">
      <div style="width: 12px; height: 12px; border-radius: 50%; background: #ef4444;"></div>
      <div style="width: 12px; height: 12px; border-radius: 50%; background: #fbbf24;"></div>
      <div style="width: 12px; height: 12px; border-radius: 50%; background: #22c55e;"></div>
    </div>
    <span style="flex: 1; text-align: center; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #52525b;">Terminal</span>
    <div style="width: 54px;"></div>
  </div>
  <div style="padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.8; background: #0a0a0f;">
    <div><span style="color: #52525b;"># Generate placeholders for all images</span></div>
    <div><span style="color: #22d3ee;">$</span> <span style="color: #a1a1aa;">node scripts/generate-thumbhash.mjs</span></div>
  </div>
</div>

This scans every image in the collection and generates a 28-byte hash that can be decoded client-side into a blurry approximation. The effect is subtle but significant: pages feel instant even on slow connections.

### Search

Pagefind handles search. At build time, it indexes every item page and generates a static search index. No server required—the search runs entirely in the browser against pre-built index files.

The result is fast, works offline, and costs nothing to operate.

## The AI-Assisted Workflow

This project wouldn't exist without AI. The AI wrote all the code. Every component, every style, every script. I don't know web development—CSS, JavaScript, Astro, Tailwind—none of it was in my toolbox before this project.

I'm a systems programmer. I write C++ for trading systems, Rust for performance-critical infrastructure. Web development was foreign territory. Without AI, I simply wouldn't have built this. The learning curve would have been months, maybe a year, to reach the level of polish I wanted.

Instead, I described what I wanted and got working code. When something broke, I asked why. When I wanted something different, I described it in plain language. The AI wrote it, I reviewed it, and together we iterated until it was right.

**The biggest innovation isn't the models themselves.** It's the tooling around them—the ability to give an AI access to your codebase, let it read files, propose edits, and iterate with you. Claude Code, running in my terminal, can see the same files I see. It can search, read, and propose changes. The feedback loop is measured in seconds, not hours.

This is a genuine shift. Complex projects that would have required hiring specialists or months of self-study are now accessible to anyone willing to learn alongside an AI collaborator.

### What I Brought, What AI Brought

The division of labor was clear:

**AI handled:**

- All the code. Components, layouts, styles, scripts, build configuration.
- Technical decisions within its domain. Which CSS approach, how to structure components, performance optimizations.
- Debugging. When something broke, I described the problem and AI fixed it.
- Learning on my behalf. I didn't need to understand Tailwind's utility classes in depth—I just needed to describe what I wanted.

**I handled:**

- Vision. What the site should feel like. The aesthetic I wanted.
- Domain knowledge. What fields matter for cataloging ancient objects. How collectors think about their items.
- Quality control. Knowing when something looked right versus when it needed another iteration.
- Content. The photographs, the descriptions, the research, the articles.

The result is a collaboration where the AI is far more than an assistant—it's the technical co-founder I couldn't have afforded to hire. But the soul of the project, the reason it exists and what it's for, that's human.

## What's Next

The archive is live, but it's not finished. Some plans:

### More of the Collection

I have 1,500+ objects. The archive currently shows a fraction. The photography workflow is the bottleneck—each piece needs to be photographed, processed, cataloged, and researched. It's meditative work, but it takes time.

### Articles and Research

Each object has a story. The cylinder seal from Uruk. The denarius that circulated when Marcus Aurelius ruled Rome. The Byzantine tetarteron from Constantine IX's debased coinage. I want to tell those stories, connecting individual pieces to the broader sweep of history.

### The Field Analyzer Project

This is the ambitious one. I've designed a portable device for field identification of metal detector finds:

- **XRF spectroscopy** for metal composition analysis
- **Computer vision** for pattern recognition and attribution
- **Phone connectivity** for processing power and storage
- **Geolocation** to map finds as they're discovered

The device would capture without requiring the phone present, storing data for later analysis. Imagine: dig up an unidentified bronze, scan it, and immediately know if it's Roman, Byzantine, or modern. See the alloy composition. Log the find location. Build a map of your detecting sites over time.

This requires partners—engineers with hardware experience, perhaps investors for prototyping. If you're reading this and the idea resonates, I'd love to hear from you.

### Community

The archive is personal, but it doesn't have to be solitary. I'm interested in connecting with other collectors, researchers, and builders. Maybe shared ownership models for significant pieces. Maybe collaborative cataloging. Maybe just conversations with people who care about these objects as much as I do.

---

Building this archive has been an unexpected pleasure. The intersection of ancient objects and modern technology, of childhood curiosity and adult engineering, of AI assistance and human judgment. The coins and seals don't know they live on the internet now. But they've survived millennia—a few more centuries in digital form seems like a reasonable next chapter.

<figure style="margin: 2rem 0;">
  <img src="/images/articles/building-the-archive/mosaic-collection.jpg" alt="Four photos showing the collecting journey: metal detector on beach with sand scoop, bowl of found coins and relics, fresh finds laid out on paper towel, and organized display cabinet with Roman fibulae, rings, and coins" style="width: 100%; border-radius: 8px;" />
  <figcaption style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #71717a; margin-top: 0.75rem; text-align: center;">From field to archive: equipment, fresh finds, and the organized collection</figcaption>
</figure>
