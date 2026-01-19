#!/usr/bin/env node

/**
 * Outreach Automation Script
 *
 * Semi-automated cold email system for patron outreach.
 * Uses Claude to personalize emails based on target research.
 *
 * Usage:
 *   node scripts/outreach/outreach.mjs research <target-id>  # Research a target
 *   node scripts/outreach/outreach.mjs draft <target-id>     # Draft personalized email
 *   node scripts/outreach/outreach.mjs review                # Review pending drafts
 *   node scripts/outreach/outreach.mjs send <target-id>      # Send approved email
 *   node scripts/outreach/outreach.mjs list                  # List all targets
 *   node scripts/outreach/outreach.mjs status                # Show outreach status
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, 'config.json');
const TARGETS_PATH = path.join(__dirname, 'targets.json');
const DRAFTS_DIR = path.join(__dirname, 'drafts');
const SENT_DIR = path.join(__dirname, 'sent');

// Ensure directories exist
[DRAFTS_DIR, SENT_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Load config
function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('❌ Config not found. Copy config.example.json to config.json and fill in your details.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
}

// Load targets
function loadTargets() {
  return JSON.parse(fs.readFileSync(TARGETS_PATH, 'utf-8'));
}

// Save targets
function saveTargets(data) {
  fs.writeFileSync(TARGETS_PATH, JSON.stringify(data, null, 2));
}

// Get target by ID
function getTarget(id) {
  const data = loadTargets();
  return data.targets.find(t => t.id === id);
}

// Update target
function updateTarget(id, updates) {
  const data = loadTargets();
  const idx = data.targets.findIndex(t => t.id === id);
  if (idx !== -1) {
    data.targets[idx] = { ...data.targets[idx], ...updates };
    saveTargets(data);
  }
}

// Call Claude API for personalization
async function callClaude(prompt, config) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.anthropic.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${error}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// Research a target
async function researchTarget(targetId) {
  const config = loadConfig();
  const target = getTarget(targetId);

  if (!target) {
    console.error(`❌ Target not found: ${targetId}`);
    return;
  }

  console.log(`🔍 Researching ${target.name}...`);

  const prompt = `You are researching a potential patron/contact for a cold email outreach.

Target: ${target.name} ${target.chineseName ? `(${target.chineseName})` : ''}
Type: ${target.type}
Known background: ${target.background}
Collection focus: ${target.collectionFocus ? target.collectionFocus.join(', ') : 'N/A'}
Sources: ${target.sources.join(', ')}

Please research and provide:
1. Any recent news or activities (last 2 years)
2. Specific pieces or donations they're known for
3. Their apparent values/motivations as a collector
4. Any mutual connections or shared interests with ancient coins, Mesopotamian seals, or historical jewelry
5. Best approach angle for outreach
6. Any contact information you can find (email, LinkedIn, etc.)

Format as structured notes that can be used for email personalization.`;

  try {
    const research = await callClaude(prompt, config);

    // Save research
    const researchPath = path.join(DRAFTS_DIR, `${targetId}-research.md`);
    fs.writeFileSync(researchPath, `# Research: ${target.name}\n\nGenerated: ${new Date().toISOString()}\n\n${research}`);

    console.log(`✅ Research saved to ${researchPath}`);
    console.log('\n' + research);

    updateTarget(targetId, { lastResearched: new Date().toISOString() });
  } catch (error) {
    console.error(`❌ Research failed: ${error.message}`);
  }
}

// Draft personalized email
async function draftEmail(targetId) {
  const config = loadConfig();
  const target = getTarget(targetId);

  if (!target) {
    console.error(`❌ Target not found: ${targetId}`);
    return;
  }

  // Check for research
  const researchPath = path.join(DRAFTS_DIR, `${targetId}-research.md`);
  let research = '';
  if (fs.existsSync(researchPath)) {
    research = fs.readFileSync(researchPath, 'utf-8');
  }

  console.log(`✍️  Drafting email for ${target.name}...`);

  const prompt = `You are drafting a cold email for patron outreach. Write a personalized, genuine email that doesn't feel automated.

SENDER INFO:
- Name: ${config.sender.name}
- Nationality: ${config.bio.nationality}
- Years in Hong Kong: ${config.bio.yearsInHK}
- Family: ${config.bio.family}
- Background: ${config.bio.background}
- Collection: ${config.bio.collectionSize} pieces - ${config.bio.collectionFocus}
- Vision: ${config.bio.vision}
- Website: ${config.site.url}
- Support page: ${config.site.supportUrl}
- Contact: Telegram ${config.sender.telegram}

TARGET INFO:
- Name: ${target.name} ${target.chineseName ? `(${target.chineseName})` : ''}
- Type: ${target.type}
- Background: ${target.background}
- Collection focus: ${target.collectionFocus ? target.collectionFocus.join(', ') : 'N/A'}
- Suggested angle: ${target.angle}
${research ? `\nRESEARCH NOTES:\n${research}` : ''}

GUIDELINES:
- Keep it under 250 words
- Open with something specific about THEM, not you
- Don't ask for money directly - offer connection
- Mention your tech/AI angle briefly (differentiator)
- Include one specific piece from your collection that connects to their interests
- End with a soft CTA (coffee, visit, advice)
- Tone: professional but warm, not stuffy
- NO emoji, no exclamation marks

OUTPUT FORMAT:
Subject: [subject line]

[email body]

---
Notes for sender: [any personalization tips or follow-up suggestions]`;

  try {
    const draft = await callClaude(prompt, config);

    // Save draft
    const draftPath = path.join(DRAFTS_DIR, `${targetId}-draft.md`);
    fs.writeFileSync(draftPath, `# Draft Email: ${target.name}\n\nGenerated: ${new Date().toISOString()}\nStatus: PENDING REVIEW\n\n${draft}`);

    console.log(`✅ Draft saved to ${draftPath}`);
    console.log('\n' + '='.repeat(60) + '\n');
    console.log(draft);
    console.log('\n' + '='.repeat(60));

    updateTarget(targetId, {
      status: 'drafted',
      lastDrafted: new Date().toISOString()
    });
  } catch (error) {
    console.error(`❌ Draft failed: ${error.message}`);
  }
}

// Review pending drafts
async function reviewDrafts() {
  const files = fs.readdirSync(DRAFTS_DIR).filter(f => f.endsWith('-draft.md'));

  if (files.length === 0) {
    console.log('📭 No pending drafts to review.');
    return;
  }

  console.log(`📋 Found ${files.length} draft(s):\n`);

  for (const file of files) {
    const targetId = file.replace('-draft.md', '');
    const target = getTarget(targetId);
    const content = fs.readFileSync(path.join(DRAFTS_DIR, file), 'utf-8');

    console.log(`\n${'='.repeat(60)}`);
    console.log(`📧 ${target?.name || targetId}`);
    console.log('='.repeat(60));
    console.log(content);
    console.log('='.repeat(60));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const answer = await new Promise(resolve => {
      rl.question('\n[A]pprove / [E]dit / [S]kip / [D]elete? ', resolve);
    });
    rl.close();

    switch (answer.toLowerCase()) {
      case 'a':
        updateTarget(targetId, { status: 'approved' });
        console.log('✅ Approved for sending');
        break;
      case 'd':
        fs.unlinkSync(path.join(DRAFTS_DIR, file));
        updateTarget(targetId, { status: 'pending' });
        console.log('🗑️  Draft deleted');
        break;
      case 'e':
        console.log(`📝 Edit the file at: ${path.join(DRAFTS_DIR, file)}`);
        console.log('   Then run review again to approve.');
        break;
      default:
        console.log('⏭️  Skipped');
    }
  }
}

// Send email via SMTP
async function sendEmail(targetId) {
  const config = loadConfig();
  const target = getTarget(targetId);

  if (!target) {
    console.error(`❌ Target not found: ${targetId}`);
    return;
  }

  if (!target.email) {
    console.error(`❌ No email address for ${target.name}. Add it to targets.json first.`);
    return;
  }

  const draftPath = path.join(DRAFTS_DIR, `${targetId}-draft.md`);
  if (!fs.existsSync(draftPath)) {
    console.error(`❌ No draft found. Run: node outreach.mjs draft ${targetId}`);
    return;
  }

  const draftContent = fs.readFileSync(draftPath, 'utf-8');

  // Parse subject and body from draft
  const subjectMatch = draftContent.match(/Subject: (.+)/);
  const bodyMatch = draftContent.match(/Subject: .+\n\n([\s\S]+?)(\n---|\n#|$)/);

  if (!subjectMatch || !bodyMatch) {
    console.error('❌ Could not parse draft. Check format.');
    return;
  }

  const subject = subjectMatch[1].trim();
  const body = bodyMatch[1].trim();

  console.log(`\n📧 Sending to: ${target.name} <${target.email}>`);
  console.log(`📋 Subject: ${subject}`);
  console.log('\n' + body.substring(0, 200) + '...\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const confirm = await new Promise(resolve => {
    rl.question('Send this email? [y/N] ', resolve);
  });
  rl.close();

  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ Cancelled');
    return;
  }

  // Use nodemailer for SMTP
  try {
    const nodemailer = await import('nodemailer');

    const transporter = nodemailer.default.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
      }
    });

    await transporter.sendMail({
      from: `"${config.sender.name}" <${config.sender.email}>`,
      to: target.email,
      subject: subject,
      text: body
    });

    // Move draft to sent
    const sentPath = path.join(SENT_DIR, `${targetId}-${Date.now()}.md`);
    fs.renameSync(draftPath, sentPath);

    // Update target status
    updateTarget(targetId, {
      status: 'sent',
      lastSent: new Date().toISOString()
    });

    console.log(`✅ Email sent successfully!`);
    console.log(`📁 Archived to ${sentPath}`);

  } catch (error) {
    if (error.code === 'ERR_MODULE_NOT_FOUND') {
      console.error('❌ nodemailer not installed. Run: npm install nodemailer');
    } else {
      console.error(`❌ Send failed: ${error.message}`);
    }
  }
}

// List all targets
function listTargets() {
  const data = loadTargets();

  console.log('\n📋 Outreach Targets\n');

  const tiers = [1, 2, 3, 4];
  const tierNames = {
    1: 'HNW Collectors',
    2: 'Numismatic Industry',
    3: 'Foundations',
    4: 'Museums'
  };

  for (const tier of tiers) {
    const tierTargets = data.targets.filter(t => t.tier === tier);
    if (tierTargets.length === 0) continue;

    console.log(`\n## Tier ${tier}: ${tierNames[tier]}`);
    console.log('-'.repeat(50));

    for (const t of tierTargets) {
      const status = {
        'pending': '⏳',
        'drafted': '📝',
        'approved': '✅',
        'sent': '📧',
        'responded': '💬'
      }[t.status] || '❓';

      const email = t.email ? '📫' : '❌';
      console.log(`${status} ${email} ${t.id.padEnd(25)} ${t.name}`);
    }
  }

  console.log('\n');
}

// Show status summary
function showStatus() {
  const data = loadTargets();

  const stats = {
    total: data.targets.length,
    pending: data.targets.filter(t => t.status === 'pending').length,
    drafted: data.targets.filter(t => t.status === 'drafted').length,
    approved: data.targets.filter(t => t.status === 'approved').length,
    sent: data.targets.filter(t => t.status === 'sent').length,
    responded: data.targets.filter(t => t.status === 'responded').length,
    withEmail: data.targets.filter(t => t.email).length
  };

  console.log('\n📊 Outreach Status\n');
  console.log(`Total targets:    ${stats.total}`);
  console.log(`With email:       ${stats.withEmail}`);
  console.log(`Pending:          ${stats.pending}`);
  console.log(`Drafted:          ${stats.drafted}`);
  console.log(`Approved:         ${stats.approved}`);
  console.log(`Sent:             ${stats.sent}`);
  console.log(`Responded:        ${stats.responded}`);
  console.log('\n');
}

// Main CLI
const [,, command, arg] = process.argv;

switch (command) {
  case 'research':
    if (!arg) {
      console.error('Usage: node outreach.mjs research <target-id>');
      process.exit(1);
    }
    await researchTarget(arg);
    break;

  case 'draft':
    if (!arg) {
      console.error('Usage: node outreach.mjs draft <target-id>');
      process.exit(1);
    }
    await draftEmail(arg);
    break;

  case 'review':
    await reviewDrafts();
    break;

  case 'send':
    if (!arg) {
      console.error('Usage: node outreach.mjs send <target-id>');
      process.exit(1);
    }
    await sendEmail(arg);
    break;

  case 'list':
    listTargets();
    break;

  case 'status':
    showStatus();
    break;

  default:
    console.log(`
Outreach Automation Script

Usage:
  node outreach.mjs research <target-id>  Research a target
  node outreach.mjs draft <target-id>     Draft personalized email
  node outreach.mjs review                Review pending drafts
  node outreach.mjs send <target-id>      Send approved email
  node outreach.mjs list                  List all targets
  node outreach.mjs status                Show outreach status

Setup:
  1. Copy config.example.json to config.json
  2. Fill in your SMTP credentials and Anthropic API key
  3. Add email addresses to targets.json as you find them

Workflow:
  1. node outreach.mjs list               # See all targets
  2. node outreach.mjs research betty-lo-kenneth-chu
  3. node outreach.mjs draft betty-lo-kenneth-chu
  4. Edit draft if needed in scripts/outreach/drafts/
  5. node outreach.mjs review             # Approve drafts
  6. node outreach.mjs send betty-lo-kenneth-chu
`);
}
