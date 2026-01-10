# Skill: Add Collection Item

Add a new antique item to the collection from raw photos.

## Trigger

User says: `/add-item` or "add new item" or shares photos with item description

## Input

- Raw photos (JPEG, HEIC, PNG) - provided as file paths or shared in chat
- Item description (name, era, origin, etc.)

## Workflow

### 1. Gather Information

Ask the user for any missing details:
- **Name**: What is this item?
- **Category**: coin | jewelry | ring | seal | misc
- **Era**: Date range (e.g., "300-200 BC")
- **Period**: Historical period (e.g., "Hellenistic")
- **Origin**: Geographic origin
- **Material**: gold | silver | bronze | serpentine | etc.
- **Dimensions**: Size description
- **Weight**: If known
- **Condition**: Condition grade
- **Description**: Detailed description (Claude can help write this)

### 2. Process Images

For each provided image:

```bash
# Generate item ID from name
ITEM_ID=$(echo "$NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')

# Create item folder
mkdir -p archive/public/images/items/$ITEM_ID

# Optimize images (using ImageMagick if available, or sips on macOS)
# Target: max 1400px, quality 85%, progressive JPEG
sips -Z 1400 --setProperty formatOptions 85 "$INPUT" --out "archive/public/images/items/$ITEM_ID/$OUTPUT_NAME.jpg"
```

Image naming conventions:
- Coins: `{id}-obverse.jpg`, `{id}-reverse.jpg`
- Seals: `{id}-hero.jpg`, `{id}-impression.jpg`
- Rings: `{id}-top.jpg`, `{id}-side.jpg`
- Other: `{id}-1.jpg`, `{id}-2.jpg`, etc.

### 3. Create Item YAML

Create `archive/src/data/items/{item-id}.yaml`:

```yaml
id: {item-id}
name: "{Item Name}"
category: {category}
era: "{date range}"
period: "{period name}"
origin: "{origin}"
material: {material}
weight: "{weight}"
dimensions: "{dimensions}"
condition: "{condition}"
description: "{description}"
images:
  - {image-1-filename}.jpg
  - {image-2-filename}.jpg
tags:
  - {tag1}
  - {tag2}
featured: false
```

### 4. Verify & Report

- Show the user the processed images (file paths)
- Display the generated YAML
- Confirm the item appears correctly
- Provide the URL: `/Archive/item/{item-id}`

## Example Session

**User**: /add-item
*[shares coin-front.jpg, coin-back.jpg]*
"This is a silver tetradrachm from Athens, around 450 BC"

**Claude**:
I'll add this Athenian tetradrachm to your collection.

Let me gather a few more details:
- **Weight**: Do you know the weight?
- **Condition**: How would you rate it? (Excellent/Good/Fair/Poor)
- **Any notable features**: Die variations, test cuts, etc.?

*[After user responds, Claude processes images and creates the item]*

Done! Your new item is live:
- **Item page**: /Archive/item/athenian-tetradrachm-owl
- **Images**: 2 photos optimized and added
- **Timeline**: Item will appear at 450 BC

## Notes

- Always backup original photos to `archive/photography/archive/`
- WebP conversion is optional (JPEG works fine for now)
- If ImageMagick isn't available, use macOS `sips` command
- Check that dimensions don't exceed 1400px for web performance
