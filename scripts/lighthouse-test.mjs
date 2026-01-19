#!/usr/bin/env node

/**
 * Local Lighthouse testing script
 * Tests pages using local Lighthouse runner
 */

import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://theantiquearchive.com';

const PAGES = [
  { name: 'Homepage', url: `${BASE_URL}/`, slug: 'homepage' },
  { name: 'Coins', url: `${BASE_URL}/coins/`, slug: 'coins' },
  { name: 'Artifacts', url: `${BASE_URL}/artifacts/`, slug: 'artifacts' },
  { name: 'Articles', url: `${BASE_URL}/library/articles/`, slug: 'articles' },
  { name: 'Sample Item', url: `${BASE_URL}/item/marcus-aurelius-denarius-01/`, slug: 'item' },
];

async function checkLighthouse() {
  try {
    await execAsync('npx lighthouse --version');
    return true;
  } catch {
    console.log('Installing Lighthouse...');
    try {
      await execAsync('npm install -g lighthouse', { timeout: 60000 });
      return true;
    } catch (error) {
      console.error('Failed to install Lighthouse:', error.message);
      return false;
    }
  }
}

async function runLighthouse(url, slug, strategy) {
  const outputDir = join(__dirname, '..', '.lighthouse');
  const outputFile = join(outputDir, `${slug}-${strategy}.json`);

  // Create output directory if it doesn't exist
  try {
    await execAsync(`mkdir -p "${outputDir}"`);
  } catch (error) {
    // Directory might already exist
  }

  const preset = strategy === 'mobile' ? 'perf' : 'desktop';
  const formFactor = strategy === 'mobile' ? 'mobile' : 'desktop';

  const cmd = `npx lighthouse "${url}" \
    --preset=${preset} \
    --screenEmulation.mobile=${strategy === 'mobile'} \
    --formFactor=${formFactor} \
    --only-categories=performance \
    --output=json \
    --output-path="${outputFile}" \
    --chrome-flags="--headless --no-sandbox" \
    --quiet`;

  try {
    await execAsync(cmd, { timeout: 120000, maxBuffer: 10 * 1024 * 1024 });
    return outputFile;
  } catch (error) {
    console.error(`  Error running Lighthouse: ${error.message}`);
    return null;
  }
}

function parseResults(jsonPath) {
  try {
    const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    const audits = data.audits;
    const categories = data.categories;

    return {
      performanceScore: Math.round(categories.performance.score * 100),
      metrics: {
        fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
        lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
        tbt: audits['total-blocking-time']?.displayValue || 'N/A',
        cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
        si: audits['speed-index']?.displayValue || 'N/A',
      },
      opportunities: Object.entries(audits)
        .filter(([key, audit]) => audit.details?.type === 'opportunity' && audit.score < 1)
        .map(([key, audit]) => ({
          title: audit.title,
          savings: audit.displayValue || (audit.details?.overallSavingsMs
            ? `${Math.round(audit.details.overallSavingsMs / 1000 * 10) / 10}s`
            : 'N/A'),
          description: audit.description,
        }))
        .sort((a, b) => {
          const aMs = parseFloat(a.savings);
          const bMs = parseFloat(b.savings);
          return bMs - aMs;
        })
        .slice(0, 5),
      diagnostics: Object.entries(audits)
        .filter(([key, audit]) => audit.details?.type !== 'opportunity' && audit.score !== null && audit.score < 1)
        .map(([key, audit]) => ({
          title: audit.title,
          description: audit.description,
        }))
        .slice(0, 5),
    };
  } catch (error) {
    console.error(`  Error parsing results: ${error.message}`);
    return null;
  }
}

function generateMarkdown(results) {
  const timestamp = new Date().toISOString().split('T')[0];

  let md = `# Lighthouse Performance Report\n\n`;
  md += `**Generated:** ${timestamp}\n\n`;
  md += `**Base URL:** ${BASE_URL}\n\n`;
  md += `---\n\n`;

  results.forEach(page => {
    md += `## ${page.name}\n\n`;
    md += `**URL:** ${page.url}\n\n`;

    ['mobile', 'desktop'].forEach(strategy => {
      const data = page.results[strategy];
      if (!data) {
        md += `### ${strategy.charAt(0).toUpperCase() + strategy.slice(1)}: Failed to load\n\n`;
        return;
      }

      const emoji = data.performanceScore >= 90 ? '🟢' : data.performanceScore >= 50 ? '🟡' : '🔴';

      md += `### ${strategy.charAt(0).toUpperCase() + strategy.slice(1)} ${emoji}\n\n`;
      md += `**Performance Score:** ${data.performanceScore}/100\n\n`;

      md += `**Core Web Vitals:**\n`;
      md += `- FCP: ${data.metrics.fcp}\n`;
      md += `- LCP: ${data.metrics.lcp}\n`;
      md += `- TBT: ${data.metrics.tbt}\n`;
      md += `- CLS: ${data.metrics.cls}\n`;
      md += `- Speed Index: ${data.metrics.si}\n\n`;

      if (data.opportunities.length > 0) {
        md += `**Top Opportunities:**\n\n`;
        data.opportunities.forEach((opp, i) => {
          md += `${i + 1}. **${opp.title}** (Save ~${opp.savings})\n`;
          md += `   - ${opp.description}\n\n`;
        });
      }

      if (data.diagnostics.length > 0) {
        md += `**Key Diagnostics:**\n\n`;
        data.diagnostics.forEach((diag, i) => {
          md += `${i + 1}. ${diag.title}\n`;
        });
        md += `\n`;
      }
    });

    md += `---\n\n`;
  });

  // Add summary
  md += `## Summary\n\n`;
  md += `| Page | Mobile | Desktop |\n`;
  md += `|------|--------|--------|\n`;
  results.forEach(page => {
    const mobile = page.results.mobile?.performanceScore || 'N/A';
    const desktop = page.results.desktop?.performanceScore || 'N/A';
    const mobileEmoji = mobile >= 90 ? '🟢' : mobile >= 50 ? '🟡' : mobile === 'N/A' ? '⚪' : '🔴';
    const desktopEmoji = desktop >= 90 ? '🟢' : desktop >= 50 ? '🟡' : desktop === 'N/A' ? '⚪' : '🔴';
    md += `| ${page.name} | ${mobileEmoji} ${mobile} | ${desktopEmoji} ${desktop} |\n`;
  });

  md += `\n`;
  md += `**Legend:** 🟢 Good (90+) | 🟡 Needs Improvement (50-89) | 🔴 Poor (<50)\n`;

  return md;
}

async function main() {
  console.log('Checking Lighthouse installation...');

  const hasLighthouse = await checkLighthouse();
  if (!hasLighthouse) {
    console.error('Failed to setup Lighthouse. Exiting.');
    process.exit(1);
  }

  console.log('\nStarting Lighthouse tests...\n');

  const results = [];

  for (const page of PAGES) {
    console.log(`Testing: ${page.name}`);
    console.log(`URL: ${page.url}`);

    const pageResults = {
      name: page.name,
      url: page.url,
      results: {},
    };

    for (const strategy of ['mobile', 'desktop']) {
      console.log(`  Running ${strategy} test...`);
      const jsonPath = await runLighthouse(page.url, page.slug, strategy);
      if (jsonPath) {
        pageResults.results[strategy] = parseResults(jsonPath);
        console.log(`  ✓ ${strategy} complete (Score: ${pageResults.results[strategy]?.performanceScore || 'N/A'})`);
      }
    }

    results.push(pageResults);
    console.log('');
  }

  // Generate markdown report
  const markdown = generateMarkdown(results);
  const outputPath = join(__dirname, '..', 'LIGHTHOUSE-REPORT.md');
  writeFileSync(outputPath, markdown);

  console.log(`✓ Report generated: LIGHTHOUSE-REPORT.md\n`);

  // Print summary to console
  console.log('=== Summary ===\n');
  results.forEach(page => {
    const mobile = page.results.mobile?.performanceScore || 'N/A';
    const desktop = page.results.desktop?.performanceScore || 'N/A';
    const mobileStr = String(mobile).padStart(3);
    const desktopStr = String(desktop).padStart(3);
    console.log(`${page.name.padEnd(15)} Mobile: ${mobileStr}  Desktop: ${desktopStr}`);
  });
}

main().catch(console.error);
