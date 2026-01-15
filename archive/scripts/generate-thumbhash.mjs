#!/usr/bin/env node
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, relative } from 'path';
import sharp from 'sharp';
import { rgbaToThumbHash } from 'thumbhash';

const IMAGES_DIR = './public/images/items';
const OUTPUT_FILE = './src/data/thumbhash-manifest.json';

async function getImageFiles(dir) {
  const items = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await getImageFiles(fullPath));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(item.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function generateThumbHash(imagePath) {
  const image = sharp(imagePath);
  const { data, info } = await image
    .resize(100, 100, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const hash = rgbaToThumbHash(info.width, info.height, data);
  return Buffer.from(hash).toString('base64');
}

async function main() {
  console.log('Scanning for images...');
  const imageFiles = await getImageFiles(IMAGES_DIR);
  console.log(`Found ${imageFiles.length} images`);

  const manifest = {};

  for (const imagePath of imageFiles) {
    const relativePath = relative('./public', imagePath);
    try {
      const hash = await generateThumbHash(imagePath);
      manifest['/' + relativePath] = hash;
      console.log(`✓ ${relativePath}`);
    } catch (err) {
      console.error(`✗ ${relativePath}: ${err.message}`);
    }
  }

  await writeFile(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  console.log(`\nWrote ${Object.keys(manifest).length} hashes to ${OUTPUT_FILE}`);
}

main().catch(console.error);
