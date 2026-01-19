import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');
const itemsDir = path.join(publicDir, 'images/items');

const THUMBNAIL_SIZES = [
  { suffix: '-thumb', width: 400, quality: 80 },
  { suffix: '-medium', width: 800, quality: 85 },
];

async function generateThumbnails() {
  const items = fs.readdirSync(itemsDir);
  let processed = 0;
  let skipped = 0;

  for (const itemId of items) {
    const itemDir = path.join(itemsDir, itemId);
    if (!fs.statSync(itemDir).isDirectory()) continue;

    const images = fs.readdirSync(itemDir).filter(f =>
      /\.(jpg|jpeg|png)$/i.test(f) && !f.includes('-thumb') && !f.includes('-medium')
    );

    for (const image of images) {
      const imagePath = path.join(itemDir, image);
      const ext = path.extname(image);
      const baseName = path.basename(image, ext);

      for (const size of THUMBNAIL_SIZES) {
        const outputName = `${baseName}${size.suffix}.webp`;
        const outputPath = path.join(itemDir, outputName);

        // Skip if already exists and is newer than source
        if (fs.existsSync(outputPath)) {
          const srcStat = fs.statSync(imagePath);
          const outStat = fs.statSync(outputPath);
          if (outStat.mtime > srcStat.mtime) {
            skipped++;
            continue;
          }
        }

        try {
          await sharp(imagePath)
            .resize(size.width, null, {
              fit: 'inside',
              withoutEnlargement: true
            })
            .webp({ quality: size.quality })
            .toFile(outputPath);
          processed++;
          console.log(`✓ ${itemId}/${outputName}`);
        } catch (e) {
          console.error(`✗ ${itemId}/${image}: ${e.message}`);
        }
      }
    }
  }

  console.log(`\nGenerated ${processed} thumbnails, skipped ${skipped} existing`);
}

generateThumbnails().catch(console.error);
