#!/usr/bin/env node

/**
 * Newsletter Digest Script
 *
 * Sends a weekly digest of new articles and items via Buttondown.
 * Respects a 7-day cooldown between sends.
 *
 * Usage:
 *   node scripts/send-newsletter.mjs          # Check and send if needed
 *   node scripts/send-newsletter.mjs --force  # Skip cooldown check
 *   node scripts/send-newsletter.mjs --dry-run # Preview without sending
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

dotenv.config({ path: path.join(rootDir, '.env') });

const STATE_FILE = path.join(rootDir, '.newsletter-state.json');
const COOLDOWN_DAYS = 7;
const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

const args = process.argv.slice(2);
const forceMode = args.includes('--force');
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

// Check cooldown
function canSend(state) {
  if (!state.lastSent) return true;

  const lastSent = new Date(state.lastSent);
  const daysSince = (Date.now() - lastSent.getTime()) / (1000 * 60 * 60 * 24);

  return daysSince >= COOLDOWN_DAYS;
}

// Find new content
function findNewContent(state) {
  const articles = getArticles();
  const items = getItems();

  const newArticles = articles.filter(a => !state.lastArticles.includes(a.id));
  const newItems = items.filter(i => !state.lastItems.includes(i.id));

  return { newArticles, newItems, allArticles: articles, allItems: items };
}

// Generate email content
function generateEmail(newArticles, newItems) {
  const siteUrl = 'https://theantiquearchive.com';

  let subject = 'New from The Antique Archive';
  if (newArticles.length && newItems.length) {
    subject = `New: ${newArticles.length} article${newArticles.length > 1 ? 's' : ''} & ${newItems.length} item${newItems.length > 1 ? 's' : ''}`;
  } else if (newArticles.length) {
    subject = `New Article: ${newArticles[0].title}`;
  } else if (newItems.length) {
    subject = `New in the Collection: ${newItems[0].name}`;
  }

  let body = '';

  if (newArticles.length) {
    body += '## New Articles\n\n';
    for (const article of newArticles) {
      body += `### [${article.title}](${siteUrl}/library/articles/${article.id})\n\n`;
      if (article.description) {
        body += `${article.description}\n\n`;
      }
    }
  }

  if (newItems.length) {
    body += '## New in the Collection\n\n';
    for (const item of newItems) {
      body += `- **[${item.name}](${siteUrl}/item/${item.id})** — ${item.category}${item.era ? `, ${item.era}` : ''}\n`;
    }
    body += '\n';
  }

  body += `---\n\n[View the full collection](${siteUrl}) | [Unsubscribe]({{ unsubscribe_url }})`;

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

  if (!forceMode && !canSend(state)) {
    const lastSent = new Date(state.lastSent);
    const nextSend = new Date(lastSent.getTime() + COOLDOWN_DAYS * 24 * 60 * 60 * 1000);
    console.log(`⏳ Cooldown active. Last sent: ${lastSent.toLocaleDateString()}`);
    console.log(`   Next send available: ${nextSend.toLocaleDateString()}`);
    console.log('   Use --force to override.');
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
