# Photography Workflow

## Quick Start

1. **Take photos** using the lightbox
2. **Drop files** into `inbox/` folder
3. **Tell Claude** what the item is
4. Claude will process, optimize, and add to the website

---

## Folder Structure

```
photography/
├── inbox/          # Drop raw photos here
├── processed/      # Claude moves optimized images here
├── archive/        # Original files backup
└── templates/      # YAML templates for new items
```

---

## What Photos to Take

### Minimum (2-3 shots)
| Shot | Description |
|------|-------------|
| **Hero** | Best angle, main beauty shot |
| **Alternate** | Different angle OR reverse side |
| **Detail** | Close-up of interesting feature (optional) |

### For Coins (2 required)
- `obverse.jpg` - Front/heads side
- `reverse.jpg` - Back/tails side

### For Cylinder Seals (2-3 shots)
- `hero.jpg` - The seal itself
- `impression.jpg` - Clay/plasticine roll impression
- `detail.jpg` - Close-up of carving (optional)

### For Rings (2-3 shots)
- `top.jpg` - Bezel/face view
- `side.jpg` - Profile view
- `inside.jpg` - Interior inscription if any

### For Jewelry/Other (2+ shots)
- `hero.jpg` - Main view
- Additional angles as needed

---

## File Naming (Optional)

You can name files however you want. Claude will rename them properly.

But if you want to be organized:
```
{item-type}-{description}-{view}.jpg

Examples:
coin-augustus-obverse.jpg
seal-akkadian-hero.jpg
ring-byzantine-top.jpg
```

---

## Image Requirements

| Aspect | Requirement |
|--------|-------------|
| Format | JPEG or HEIC (iPhone) |
| Size | Any (will be optimized) |
| Quality | Sharp, well-lit, in focus |
| Background | Clean (black or white from lightbox) |

---

## Workflow with Claude

1. Drop photos in `inbox/`
2. Message Claude: "New item: [description]"
3. Claude will:
   - Process and optimize images
   - Generate WebP versions
   - Create the item YAML file
   - Move to correct folders
   - Show you the result

---

## Tips

- **Lock exposure** on iPhone before shooting
- **Clean the turntable** between items
- **Use black background** for gold/brass
- **Use white background** for silver/dark items
- **Check focus** before moving to next item
