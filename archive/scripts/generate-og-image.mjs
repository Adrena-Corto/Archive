import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');
const outputPath = path.join(publicDir, 'og-image.png');

// Select featured images for the OG collage
const featuredImages = [
  'images/items/uruk-lapis-cylinder-seal/01.jpg',
  'images/items/marcus-aurelius-denarius-01/dscf4431.jpg',
  'images/items/hellenistic-gold-earring/01.jpg',
  'images/items/egyptian-scarab/01.jpg',
];

async function generateOgImage() {
  const width = 1200;
  const height = 630;
  const padding = 40;
  const imageSize = 200;
  const gap = 20;

  // Create dark background with gradient overlay
  const background = Buffer.from(`
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0f"/>
          <stop offset="100%" style="stop-color:#0f0f18"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#22d3ee"/>
          <stop offset="100%" style="stop-color:#06b6d4"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      <!-- Subtle grid pattern -->
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
      </pattern>
      <rect width="${width}" height="${height}" fill="url(#grid)"/>
      <!-- Accent line at bottom -->
      <rect x="0" y="${height - 4}" width="${width}" height="4" fill="url(#accent)"/>
    </svg>
  `);

  // Text overlay
  const textOverlay = Buffer.from(`
    <svg width="${width}" height="${height}">
      <style>
        .title { font-family: system-ui, -apple-system, sans-serif; font-weight: 600; fill: #f0f0f5; }
        .subtitle { font-family: ui-monospace, monospace; fill: #22d3ee; letter-spacing: 0.2em; }
        .tagline { font-family: system-ui, -apple-system, sans-serif; fill: #9ca3af; }
        .cuneiform { font-family: 'Noto Sans Cuneiform', system-ui; fill: #22d3ee; }
      </style>
      <text x="${padding}" y="120" class="subtitle" font-size="14">// THEANTIQUEARCHIVE.COM</text>
      <text x="${padding}" y="200" class="title" font-size="64">The Antique</text>
      <text x="${padding}" y="280" class="title" font-size="64">Archive</text>
      <text x="${padding}" y="340" class="tagline" font-size="22">Ancient Coins · Cylinder Seals · Historical Artifacts</text>
      <text x="${padding}" y="400" class="tagline" font-size="18">5,000 years of history · Hong Kong</text>
    </svg>
  `);

  // Load and resize collection images
  const imageComposites = [];
  const startX = width - padding - (imageSize * 2 + gap);
  const startY = (height - (imageSize * 2 + gap)) / 2;

  for (let i = 0; i < featuredImages.length; i++) {
    const imagePath = path.join(publicDir, featuredImages[i]);
    if (fs.existsSync(imagePath)) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = startX + col * (imageSize + gap);
      const y = startY + row * (imageSize + gap);

      const resizedImage = await sharp(imagePath)
        .resize(imageSize, imageSize, { fit: 'cover' })
        .toBuffer();

      // Create rounded rectangle mask
      const roundedMask = Buffer.from(`
        <svg width="${imageSize}" height="${imageSize}">
          <rect x="0" y="0" width="${imageSize}" height="${imageSize}" rx="8" ry="8" fill="white"/>
        </svg>
      `);

      const maskedImage = await sharp(resizedImage)
        .composite([{ input: roundedMask, blend: 'dest-in' }])
        .png()
        .toBuffer();

      imageComposites.push({
        input: maskedImage,
        left: x,
        top: y,
      });
    }
  }

  // Compose final image
  await sharp(background)
    .composite([
      { input: textOverlay, blend: 'over' },
      ...imageComposites,
    ])
    .png()
    .toFile(outputPath);

  console.log(`✓ Generated OG image: ${outputPath}`);
}

generateOgImage().catch(console.error);
