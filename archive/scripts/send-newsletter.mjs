#!/usr/bin/env node

/**
 * Newsletter Digest Script
 *
 * Creates a Buttondown draft for new articles and items.
 * Always creates a draft when there's new content - you handle the sending.
 *
 * Usage:
 *   node scripts/send-newsletter.mjs          # Create draft if new content
 *   node scripts/send-newsletter.mjs --dry-run # Preview without creating draft
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

dotenv.config({ path: path.join(rootDir, '.env') });

const STATE_FILE = path.join(rootDir, '.newsletter-state.json');
const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

// Load state
function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  } catch {
    return { lastSent: null, lastArticles: [], lastItems: [] };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// Get all articles
function getArticles() {
  const articlesDir = path.join(rootDir, 'src/content/articles');
  if (!fs.existsSync(articlesDir)) return [];

  return fs.readdirSync(articlesDir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const content = fs.readFileSync(path.join(articlesDir, f), 'utf-8');
      const match = content.match(/^---\n([\s\S]*?)\n---/);
      if (!match) return null;

      const frontmatter = match[1];
      const title = frontmatter.match(/title:\s*["']?(.+?)["']?\s*$/m)?.[1];
      const publishDate = frontmatter.match(/publishDate:\s*(.+)/)?.[1];
      const description = frontmatter.match(/description:\s*["']?(.+?)["']?\s*$/m)?.[1];
      const draft = frontmatter.match(/draft:\s*true/);

      if (draft) return null;

      return {
        id: f.replace('.md', ''),
        title,
        description,
        publishDate: new Date(publishDate),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.publishDate - a.publishDate);
}

// Get all items
function getItems() {
  const itemsDir = path.join(rootDir, 'src/data/items');
  if (!fs.existsSync(itemsDir)) return [];

  return fs.readdirSync(itemsDir)
    .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
    .map(f => {
      const content = fs.readFileSync(path.join(itemsDir, f), 'utf-8');
      const id = content.match(/^id:\s*(.+)/m)?.[1];
      const name = content.match(/^name:\s*["']?(.+?)["']?\s*$/m)?.[1];
      const category = content.match(/^category:\s*(.+)/m)?.[1];
      const era = content.match(/^era:\s*["']?(.+?)["']?\s*$/m)?.[1];

      // Get file creation time as proxy for "added date"
      const stat = fs.statSync(path.join(itemsDir, f));

      return { id, name, category, era, addedDate: stat.birthtime };
    })
    .filter(item => item.id && item.name);
}

// Find new content
function findNewContent(state) {
  const articles = getArticles();
  const items = getItems();

  const newArticles = articles.filter(a => !state.lastArticles.includes(a.id));
  const newItems = items.filter(i => !state.lastItems.includes(i.id));

  return { newArticles, newItems, allArticles: articles, allItems: items };
}

// Get thumbnail image for an item (uses -medium.webp variant for smaller file size)
function getItemImage(itemId) {
  const itemsDir = path.join(rootDir, 'src/data/items');
  const itemFile = path.join(itemsDir, `${itemId}.yaml`);

  if (!fs.existsSync(itemFile)) return null;

  const content = fs.readFileSync(itemFile, 'utf-8');
  const imagesMatch = content.match(/images:\s*\n((?:\s+-\s+.+\n?)+)/);
  if (!imagesMatch) return null;

  const firstImage = imagesMatch[1].match(/-\s+(.+)/)?.[1]?.trim();
  if (!firstImage) return null;

  // Use medium webp variant for smaller file size in emails
  const baseName = firstImage.replace(/\.(jpg|jpeg|png)$/i, '');
  return `https://theantiquearchive.com/images/items/${itemId}/${baseName}-medium.webp`;
}

// Generate catchy subject lines
function generateSubject(newArticles, newItems) {
  const subjectOptions = {
    articlesOnly: [
      `Fresh from the archive: ${newArticles[0]?.title}`,
      `New reading: ${newArticles[0]?.title}`,
      `Just published: ${newArticles[0]?.title}`,
    ],
    itemsOnly: [
      `New acquisition: ${newItems[0]?.name}`,
      `Just added to the collection`,
      `From the vault: ${newItems[0]?.name}`,
    ],
    both: [
      `New from the archive`,
      `This week's discoveries`,
      `Fresh additions to the collection`,
      `Dispatches from the archive`,
    ],
  };

  if (newArticles.length && newItems.length) {
    return subjectOptions.both[Math.floor(Math.random() * subjectOptions.both.length)];
  } else if (newArticles.length) {
    return subjectOptions.articlesOnly[0];
  } else {
    return subjectOptions.itemsOnly[0];
  }
}

// Generate email content
function generateEmail(newArticles, newItems) {
  const siteUrl = 'https://theantiquearchive.com';
  const subject = generateSubject(newArticles, newItems);

  let body = '';

  // Intro text
  const hasArticles = newArticles.length > 0;
  const hasItems = newItems.length > 0;

  if (hasArticles && hasItems) {
    body += `New writing and fresh acquisitions this week—coins, seals, and stories from the ancient world.\n\n`;
  } else if (hasArticles) {
    body += `New research and writing from the archive.\n\n`;
  } else if (hasItems) {
    body += `New pieces have joined the collection.\n\n`;
  }

  body += '---\n\n';

  // Featured items with images (show up to 3)
  if (hasItems) {
    const featuredItems = newItems.slice(0, 3);

    for (const item of featuredItems) {
      const imageUrl = getItemImage(item.id);

      if (imageUrl) {
        body += `[![${item.name}](${imageUrl})](${siteUrl}/item/${item.id})\n\n`;
      }

      body += `**[${item.name}](${siteUrl}/item/${item.id})**\n`;
      body += `${item.category}${item.era ? ` · ${item.era}` : ''}\n\n`;
    }

    if (newItems.length > 3) {
      body += `[+${newItems.length - 3} more items →](${siteUrl}/artifacts)\n\n`;
    }

    body += '---\n\n';
  }

  // Articles
  if (hasArticles) {
    body += `## Reading\n\n`;

    for (const article of newArticles) {
      body += `**[${article.title}](${siteUrl}/library/articles/${article.id})**\n`;
      if (article.description) {
        body += `${article.description}\n`;
      }
      body += '\n';
    }

    body += '---\n\n';
  }

  // Remaining items as list (if more than 3)
  if (newItems.length > 3) {
    body += `## Also Added\n\n`;
    for (const item of newItems.slice(3)) {
      body += `- [${item.name}](${siteUrl}/item/${item.id}) — ${item.category}\n`;
    }
    body += '\n---\n\n';
  }

  // Footer
  body += `[Browse the collection](${siteUrl}) · [Unsubscribe]({{ unsubscribe_url }})`;

  return { subject, body };
}

// Send via Buttondown API
async function sendEmail(subject, body, tags) {
  if (!BUTTONDOWN_API_KEY) {
    throw new Error('BUTTONDOWN_API_KEY not set in .env');
  }

  const response = await fetch('https://api.buttondown.email/v1/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject,
      body,
      status: 'draft', // Create as draft first, change to 'about_to_send' for immediate send
      included_tags: tags.length ? tags : undefined,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Buttondown API error: ${response.status} - ${JSON.stringify(error)}`);
  }

  return response.json();
}

// Main
async function main() {
  console.log('📬 Newsletter Digest Script\n');

  if (!BUTTONDOWN_API_KEY) {
    console.error('❌ BUTTONDOWN_API_KEY not found in .env');
    console.log('\nCreate .env file with:\n  BUTTONDOWN_API_KEY=your-key-here');
    process.exit(1);
  }

  const state = loadState();
  const { newArticles, newItems, allArticles, allItems } = findNewContent(state);

  console.log(`Found: ${newArticles.length} new articles, ${newItems.length} new items`);

  if (!newArticles.length && !newItems.length) {
    console.log('✓ No new content to send.');
    process.exit(0);
  }

  // Determine tags based on content type
  const tags = [];
  if (newArticles.length) tags.push('articles');
  if (newItems.length) tags.push('items');

  const { subject, body } = generateEmail(newArticles, newItems);

  console.log('\n--- Preview ---');
  console.log(`Subject: ${subject}`);
  console.log(`Tags: ${tags.join(', ') || 'all subscribers'}`);
  console.log(`\n${body}`);
  console.log('--- End Preview ---\n');

  if (dryRun) {
    console.log('🔍 Dry run - no email sent.');
    process.exit(0);
  }

  try {
    const result = await sendEmail(subject, body, tags);
    console.log(`✓ Email created as draft: ${result.id}`);
    console.log('  Go to buttondown.com/emails to review and send.');

    // Update state
    state.lastSent = new Date().toISOString();
    state.lastArticles = allArticles.map(a => a.id);
    state.lastItems = allItems.map(i => i.id);
    saveState(state);

    console.log('✓ State updated.');
  } catch (error) {
    console.error('❌ Failed to send:', error.message);
    process.exit(1);
  }
}

main();
