# Photo & Media Guidelines for Antique Collection Website

## Overview

This document outlines the photography workflow, image optimization, and hosting considerations for the antique collection website. The primary capture device is a **SANOTO jewelry lightbox with integrated turntable**, supplemented by USB microscope for detail shots.

---

## 1. Capture Workflow

### 1.1 Equipment Setup

| Equipment | Purpose | Settings |
|-----------|---------|----------|
| SANOTO TB200/TB300 lightbox | Main product shots, 360° spins | Speed: slow, Background: black or white |
| iPhone (with ProRAW if available) | Primary camera | 48MP mode, fixed exposure |
| USB microscope | Maker's marks, hallmarks, patina details | 20-200x magnification |
| Color checker card | Color consistency (optional) | Include in first shot of session |

### 1.2 Shot List Per Object

For each antique, capture the following:

```
object-name/
├── hero.jpg              # Main beauty shot (front, best angle)
├── spin/                 # 360° rotation sequence
│   ├── 001.jpg          # 0°
│   ├── 002.jpg          # 10°
│   └── ...              # Continue to 360° (36 frames)
├── details/             # Close-up shots
│   ├── signature.jpg    # Maker's mark, signature
│   ├── hallmark.jpg     # Any stamps or hallmarks
│   ├── patina.jpg       # Interesting wear/aging
│   └── texture.jpg      # Material texture
├── microscope/          # Ultra-close details
│   ├── mark-10x.jpg
│   └── mark-50x.jpg
└── context.jpg          # Object with scale reference (optional)
```

### 1.3 SANOTO Lightbox Best Practices

**For crisp product shots:**
- Clean the turntable surface before each object
- Use black background for gold/brass items, white for silver/dark items
- Position object at center of turntable
- Lock phone exposure before starting rotation (tap & hold on iPhone)
- Use 2-second timer to avoid shake

**For 360° spins:**
- Set turntable to slowest continuous rotation
- Record video at 4K 30fps
- One full rotation = ~15-20 seconds ideal
- Extract frames later OR shoot individual stills at 10° intervals

**Limitations to be aware of:**
- The enclosed lightbox creates flat, shadowless lighting
- Fine surface texture may be less visible than with directional light
- Maximum object size limited by box dimensions

---

## 2. Image Processing Pipeline

### 2.1 Raw Processing (if shooting RAW/ProRAW)

```
Lightroom/Capture One settings:
├── White balance: Match to color checker or neutral gray
├── Exposure: Adjust for white/black background clipping
├── Contrast: +10 to +20 (compensate for flat lightbox lighting)
├── Clarity: +15 to +25 (recover surface detail)
├── Sharpening: Amount 40, Radius 1.0, Detail 25
└── Export: sRGB, 16-bit TIFF for archival
```

### 2.2 Batch Processing Script

For consistent processing across hundreds of items:

```bash
#!/bin/bash
# process-images.sh - Batch convert and optimize images

INPUT_DIR="./raw"
OUTPUT_DIR="./processed"

# Process hero images
for file in "$INPUT_DIR"/*/hero.*; do
  filename=$(basename "$file")
  dirname=$(dirname "$file" | xargs basename)
  
  magick "$file" \
    -resize "2400x2400>" \
    -quality 85 \
    -strip \
    "$OUTPUT_DIR/$dirname/hero.jpg"
done
```

---

## 3. Web Optimization

### 3.1 Image Formats & Sizes

| Asset Type | Format | Dimensions | Quality | File Size Target |
|------------|--------|------------|---------|------------------|
| Hero image | WebP (JPEG fallback) | 1200x1200 | 80% | <150KB |
| Thumbnail | WebP | 400x400 | 75% | <30KB |
| Blur placeholder | WebP | 20x20 | 60% | <1KB |
| 360° spin frames | WebP | 800x800 | 70% | <50KB each |
| Detail shots | WebP | 1600x1600 | 85% | <200KB |
| Microscope | WebP/PNG | 1200x1200 | 90% | <300KB |
| Depth map (for 2.5D) | PNG (grayscale) | 1200x1200 | - | <100KB |

### 3.2 Responsive Image Generation

Generate multiple sizes for responsive loading:

```bash
#!/bin/bash
# generate-responsive.sh

INPUT=$1
BASENAME=$(basename "$INPUT" .jpg)
OUTDIR="./output"

# Generate responsive sizes
magick "$INPUT" -resize 400x400 -quality 75 "$OUTDIR/${BASENAME}-sm.webp"
magick "$INPUT" -resize 800x800 -quality 80 "$OUTDIR/${BASENAME}-md.webp"
magick "$INPUT" -resize 1200x1200 -quality 80 "$OUTDIR/${BASENAME}-lg.webp"
magick "$INPUT" -resize 2400x2400 -quality 85 "$OUTDIR/${BASENAME}-xl.webp"

# Generate blur placeholder (LQIP)
magick "$INPUT" -resize 20x20 -quality 60 "$OUTDIR/${BASENAME}-placeholder.webp"

# Generate JPEG fallback for Safari <14
magick "$INPUT" -resize 1200x1200 -quality 80 "$OUTDIR/${BASENAME}-lg.jpg"
```

### 3.3 HTML Implementation

```html
<picture>
  <!-- WebP for modern browsers -->
  <source 
    type="image/webp"
    srcset="
      /images/item-sm.webp 400w,
      /images/item-md.webp 800w,
      /images/item-lg.webp 1200w,
      /images/item-xl.webp 2400w
    "
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  />
  <!-- JPEG fallback -->
  <img 
    src="/images/item-lg.jpg" 
    alt="Ming Dynasty vase, blue and white porcelain"
    loading="lazy"
    decoding="async"
    width="1200"
    height="1200"
    style="background: url(/images/item-placeholder.webp) no-repeat center; background-size: cover;"
  />
</picture>
```

---

## 4. 360° Spin Implementation

### 4.1 Frame Extraction from Video

```bash
#!/bin/bash
# extract-360-frames.sh

INPUT_VIDEO=$1
OUTPUT_DIR=$2
FRAMES=36  # Number of frames for full rotation

mkdir -p "$OUTPUT_DIR"

# Extract frames at equal intervals
ffmpeg -i "$INPUT_VIDEO" \
  -vf "select='not(mod(n,$(echo "scale=0; $(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 "$INPUT_VIDEO") / $FRAMES" | bc)))',setpts=N/FRAME_RATE/TB" \
  -vsync vfr \
  "$OUTPUT_DIR/frame-%03d.jpg"

# Convert to WebP and resize
for f in "$OUTPUT_DIR"/*.jpg; do
  magick "$f" -resize 800x800 -quality 70 "${f%.jpg}.webp"
  rm "$f"
done
```

### 4.2 Client-Side 360° Viewer

Lightweight vanilla JS implementation:

```javascript
// 360-viewer.js
class SpinViewer {
  constructor(container, frames, options = {}) {
    this.container = container;
    this.frames = frames;
    this.currentFrame = 0;
    this.loaded = new Set();
    this.sensitivity = options.sensitivity || 5;
    
    this.init();
  }

  init() {
    // Preload first frame immediately
    this.preloadFrame(0);
    
    // Lazy preload rest
    this.preloadAllFrames();
    
    // Setup interaction
    this.setupDrag();
    this.setupTouch();
  }

  preloadFrame(index) {
    return new Promise((resolve) => {
      if (this.loaded.has(index)) return resolve();
      
      const img = new Image();
      img.onload = () => {
        this.loaded.add(index);
        resolve();
      };
      img.src = this.frames[index];
    });
  }

  async preloadAllFrames() {
    for (let i = 0; i < this.frames.length; i++) {
      await this.preloadFrame(i);
    }
  }

  showFrame(index) {
    const normalized = ((index % this.frames.length) + this.frames.length) % this.frames.length;
    this.container.style.backgroundImage = `url(${this.frames[normalized]})`;
    this.currentFrame = normalized;
  }

  setupDrag() {
    let startX = 0;
    let dragging = false;

    this.container.addEventListener('mousedown', (e) => {
      dragging = true;
      startX = e.clientX;
      this.container.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      
      const delta = e.clientX - startX;
      if (Math.abs(delta) > this.sensitivity) {
        const direction = delta > 0 ? 1 : -1;
        this.showFrame(this.currentFrame + direction);
        startX = e.clientX;
      }
    });

    window.addEventListener('mouseup', () => {
      dragging = false;
      this.container.style.cursor = 'grab';
    });
  }

  setupTouch() {
    let startX = 0;

    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    this.container.addEventListener('touchmove', (e) => {
      const delta = e.touches[0].clientX - startX;
      if (Math.abs(delta) > this.sensitivity) {
        const direction = delta > 0 ? 1 : -1;
        this.showFrame(this.currentFrame + direction);
        startX = e.touches[0].clientX;
      }
    });
  }
}

// Usage
const viewer = new SpinViewer(
  document.querySelector('.spin-container'),
  Array.from({ length: 36 }, (_, i) => `/images/vase/spin/frame-${String(i + 1).padStart(3, '0')}.webp`)
);
```

---

## 5. Hosting Considerations

### 5.1 GitHub Pages Limitations

| Aspect | Limit | Concern for this project |
|--------|-------|-------------------------|
| Repo size | 1GB soft limit, 5GB hard | ⚠️ High-res images add up fast |
| File size | 100MB max | ✅ Should be fine |
| Bandwidth | 100GB/month | ⚠️ Image-heavy site may hit this |
| Build time | 10 min | ✅ Static site should be fine |

**Problem:** A collection of 200 items × ~2MB average = 400MB just for hero images. Add 360° spins and you're looking at 2-5GB easily.

### 5.2 Recommended Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        RECOMMENDED SETUP                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   GitHub Pages (or Vercel/Netlify)                             │
│   └── Static HTML/CSS/JS only                                  │
│       └── ~5-10MB total                                        │
│                                                                 │
│   Cloudflare R2 / Backblaze B2 / AWS S3                        │
│   └── All images and media                                     │
│       └── Served via CDN                                       │
│       └── Much cheaper than traditional hosting                │
│                                                                 │
│   Optional: Cloudflare Images                                  │
│   └── On-the-fly resizing                                      │
│   └── Automatic WebP conversion                                │
│   └── $5/month for 100K images                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Cost Comparison

| Solution | Storage Cost | Bandwidth Cost | Notes |
|----------|--------------|----------------|-------|
| GitHub Pages | Free | Free (100GB/mo) | Limited, may throttle |
| Cloudflare R2 | $0.015/GB/mo | Free egress | Best value for images |
| Backblaze B2 + CF | $0.005/GB/mo | Free via CF | Cheapest storage |
| AWS S3 + CloudFront | $0.023/GB/mo | $0.085/GB | Most features |
| Vercel Blob | $0.15/GB/mo | Included | Easy but pricey |
| Cloudflare Images | $5/100K images | Included | Best for dynamic resize |

**Recommendation for your project:**
- **Small collection (<50 items):** GitHub Pages is fine, optimize images aggressively
- **Medium collection (50-200 items):** Cloudflare R2 for images, GitHub for site
- **Large collection (200+ items):** Cloudflare R2 + Cloudflare Images for on-the-fly transforms

### 5.4 Cloudflare R2 Setup

```javascript
// upload-to-r2.js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFile } from 'fs/promises';
import { glob } from 'glob';

const R2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

async function uploadImages() {
  const files = await glob('./processed/**/*.{webp,jpg,png}');
  
  for (const file of files) {
    const key = file.replace('./processed/', '');
    const body = await readFile(file);
    
    await R2.send(new PutObjectCommand({
      Bucket: 'antique-collection',
      Key: key,
      Body: body,
      ContentType: `image/${file.split('.').pop()}`,
      CacheControl: 'public, max-age=31536000, immutable',
    }));
    
    console.log(`Uploaded: ${key}`);
  }
}

uploadImages();
```

---

## 6. 2.5D Depth Effect (Optional Enhancement)

For items where you want the parallax/depth effect without full 3D:

### 6.1 Generate Depth Maps

Using AI depth estimation:

```python
# generate-depth.py
from transformers import pipeline
from PIL import Image
import numpy as np

depth_estimator = pipeline("depth-estimation", model="depth-anything/Depth-Anything-V2-Small-hf")

def generate_depth_map(image_path, output_path):
    image = Image.open(image_path)
    result = depth_estimator(image)
    
    depth = result["depth"]
    depth_array = np.array(depth)
    
    # Normalize to 0-255
    depth_normalized = ((depth_array - depth_array.min()) / 
                        (depth_array.max() - depth_array.min()) * 255).astype(np.uint8)
    
    depth_image = Image.fromarray(depth_normalized)
    depth_image.save(output_path)

# Usage
generate_depth_map("hero.jpg", "hero-depth.png")
```

### 6.2 Three.js Depth Shader

```javascript
// depth-parallax.js
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform sampler2D uDepth;
  uniform vec2 uMouse;
  uniform float uStrength;
  varying vec2 vUv;

  void main() {
    float depth = texture2D(uDepth, vUv).r;
    vec2 displacement = uMouse * depth * uStrength;
    vec4 color = texture2D(uTexture, vUv + displacement);
    gl_FragColor = color;
  }
`;

function createDepthEffect(container, imageSrc, depthSrc) {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(imageSrc);
  const depth = textureLoader.load(depthSrc);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: texture },
      uDepth: { value: depth },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uStrength: { value: 0.02 },
    },
    vertexShader,
    fragmentShader,
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    material.uniforms.uMouse.value.set(x, y);
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
```

---

## 7. File Organization

### 7.1 Source Files (Keep locally / backup drive)

```
/archive/
├── raw/                          # Original camera files
│   └── {item-id}/
│       ├── hero.dng
│       ├── spin-video.mov
│       └── details/
├── processed/                    # Full-resolution processed
│   └── {item-id}/
│       ├── hero.tiff
│       └── ...
└── catalog.json                  # Master metadata file
```

### 7.2 Web-Ready Files (Deploy to CDN)

```
/public/images/
├── {item-id}/
│   ├── hero-sm.webp             # 400px
│   ├── hero-md.webp             # 800px
│   ├── hero-lg.webp             # 1200px
│   ├── hero-placeholder.webp    # 20px blur
│   ├── hero-depth.png           # Depth map (optional)
│   ├── spin/
│   │   ├── 001.webp
│   │   └── ...
│   └── details/
│       ├── signature.webp
│       └── ...
└── _catalog/
    ├── thumbnails/              # All thumbnails in one folder
    │   ├── {item-id}.webp
    │   └── ...
    └── manifest.json            # Image manifest for preloading
```

### 7.3 Metadata Schema

```json
{
  "id": "ming-vase-001",
  "title": "Blue and White Porcelain Vase",
  "dynasty": "Ming",
  "period": "Wanli (1572-1620)",
  "dimensions": {
    "height": 24.5,
    "width": 12.0,
    "unit": "cm"
  },
  "materials": ["porcelain", "cobalt blue glaze"],
  "provenance": "Acquired at Christie's Hong Kong, 2019",
  "condition": "Excellent, minor wear to base",
  "images": {
    "hero": "ming-vase-001/hero-lg.webp",
    "thumbnail": "_catalog/thumbnails/ming-vase-001.webp",
    "spinFrames": 36,
    "details": ["signature", "base-mark", "glaze-detail"],
    "hasDepthMap": true
  },
  "tags": ["porcelain", "blue-white", "ming", "vase"],
  "dateAdded": "2024-01-15"
}
```

---

## 8. Automation Scripts

### 8.1 Full Processing Pipeline

```bash
#!/bin/bash
# process-item.sh - Complete pipeline for one item

ITEM_ID=$1
RAW_DIR="./archive/raw/$ITEM_ID"
PROC_DIR="./archive/processed/$ITEM_ID"
WEB_DIR="./public/images/$ITEM_ID"

mkdir -p "$PROC_DIR" "$WEB_DIR" "$WEB_DIR/spin" "$WEB_DIR/details"

echo "Processing $ITEM_ID..."

# 1. Process hero image
echo "  → Hero image..."
magick "$RAW_DIR/hero.dng" \
  -auto-level -modulate 100,105,100 \
  -unsharp 0x1+0.5+0 \
  "$PROC_DIR/hero.tiff"

# Generate responsive sizes
for size in 400:sm 800:md 1200:lg 2400:xl; do
  px=${size%:*}
  suffix=${size#*:}
  magick "$PROC_DIR/hero.tiff" -resize "${px}x${px}" -quality 80 "$WEB_DIR/hero-${suffix}.webp"
done

# Blur placeholder
magick "$PROC_DIR/hero.tiff" -resize 20x20 -quality 60 "$WEB_DIR/hero-placeholder.webp"

# 2. Extract 360 frames if video exists
if [ -f "$RAW_DIR/spin-video.mov" ]; then
  echo "  → Extracting spin frames..."
  ffmpeg -i "$RAW_DIR/spin-video.mov" -vf "fps=2" -q:v 2 "$PROC_DIR/spin/frame-%03d.jpg" 2>/dev/null
  
  # Keep only 36 evenly spaced frames
  total=$(ls "$PROC_DIR/spin/" | wc -l)
  step=$((total / 36))
  
  i=1
  for f in $(ls "$PROC_DIR/spin/" | awk "NR % $step == 1"); do
    magick "$PROC_DIR/spin/$f" -resize 800x800 -quality 70 "$WEB_DIR/spin/$(printf '%03d' $i).webp"
    ((i++))
    [ $i -gt 36 ] && break
  done
fi

# 3. Process detail shots
echo "  → Detail shots..."
for detail in "$RAW_DIR/details/"*; do
  name=$(basename "$detail" | sed 's/\.[^.]*$//')
  magick "$detail" -resize 1600x1600 -quality 85 "$WEB_DIR/details/${name}.webp"
done

# 4. Generate depth map (requires Python environment)
echo "  → Generating depth map..."
python3 generate-depth.py "$WEB_DIR/hero-lg.webp" "$WEB_DIR/hero-depth.png" 2>/dev/null

echo "Done: $ITEM_ID"
```

### 8.2 Batch Process All Items

```bash
#!/bin/bash
# process-all.sh

for dir in ./archive/raw/*/; do
  item_id=$(basename "$dir")
  ./process-item.sh "$item_id"
done

# Generate manifest
echo "Generating manifest..."
node generate-manifest.js

echo "All items processed!"
```

---

## 9. Quality Checklist

Before publishing each item:

- [ ] Hero image is sharp and well-exposed
- [ ] White balance is consistent with other items
- [ ] Background is clean (no dust, scratches visible)
- [ ] 360° spin is smooth (no jumps or missing frames)
- [ ] All detail shots are in focus
- [ ] Microscope images have scale reference noted
- [ ] WebP files are under target size limits
- [ ] Metadata JSON is complete and accurate
- [ ] Depth map generates correctly (if used)

---

## 10. Future Enhancements

### If you add photogrammetry later:

- Switch to open lighting setup for select items
- Capture 50-100 photos per object at varied angles
- Process with RealityCapture or Meshroom
- Export as GLB/GLTF for web embedding
- Use `<model-viewer>` for 3D display

### If you add a structured light 3D scanner:

- 积木易搭 Seal for small objects (10-300mm)
- Process with bundled software
- Export optimized mesh for web (Draco compression)
- Consider Sketchfab embedding for complex models

---

*Last updated: January 2026*
