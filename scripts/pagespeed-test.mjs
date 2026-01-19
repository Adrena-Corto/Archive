#!/usr/bin/env node

/**
 * Automated PageSpeed Insights testing script
 * Tests multiple pages and generates a report with actionable insights
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://acammm.github.io/archive';
const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

const PAGES = [
  { name: 'Homepage', url: `${BASE_URL}/` },
  { name: 'Coins', url: `${BASE_URL}/coins/` },
  { name: 'Artifacts', url: `${BASE_URL}/artifacts/` },
  { name: 'Articles', url: `${BASE_URL}/articles/` },
  { name: 'Sample Item', url: `${BASE_URL}/items/septimius-severus-denarius/` },
];

const STRATEGIES = ['mobile', 'desktop'];

async function testPage(url, strategy) {
  const apiUrl = `${API_URL}?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance`;

  console.log(`  Testing ${strategy}...`);

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`  Error testing ${strategy}:`, error.message);
    return null;
  }
}

function extractMetrics(data) {
  if (!data || !data.lighthouseResult) return null;

  const lighthouse = data.lighthouseResult;
  const audits = lighthouse.audits;

  return {
    performanceScore: Math.round(lighthouse.categories.performance.score * 100),
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
        savings: audit.displayValue || audit.details?.overallSavingsMs
          ? `${Math.round(audit.details.overallSavingsMs / 1000 * 10) / 10}s`
          : 'N/A',
        description: audit.description,
      }))
      .sort((a, b) => {
        const aMs = parseFloat(a.savings);
        const bMs = parseFloat(b.savings);
        return bMs - aMs;
      })
      .slice(0, 5),
    diagnostics: Object.entries(audits)
      .filter(([key, audit]) => audit.details?.type === 'diagnostic' && audit.score < 1)
      .map(([key, audit]) => ({
        title: audit.title,
        description: audit.description,
      }))
      .slice(0, 5),
  };
}

function generateMarkdown(results) {
  const timestamp = new Date().toISOString().split('T')[0];

  let md = `# PageSpeed Insights Report\n\n`;
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

      md += `### ${strategy.charAt(0).toUpperCase() + strategy.slice(1)}\n\n`;
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
        md += `**Diagnostics:**\n\n`;
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
    md += `| ${page.name} | ${mobile} | ${desktop} |\n`;
  });

  return md;
}

async function main() {
  console.log('Starting PageSpeed Insights tests...\n');

  const results = [];

  for (const page of PAGES) {
    console.log(`Testing: ${page.name}`);
    console.log(`URL: ${page.url}`);

    const pageResults = {
      name: page.name,
      url: page.url,
      results: {},
    };

    for (const strategy of STRATEGIES) {
      const data = await testPage(page.url, strategy);
      if (data) {
        pageResults.results[strategy] = extractMetrics(data);
      }
      // Delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    results.push(pageResults);
    console.log('  ✓ Complete\n');
  }

  // Generate markdown report
  const markdown = generateMarkdown(results);
  const outputPath = join(__dirname, '..', 'PAGESPEED-REPORT.md');
  writeFileSync(outputPath, markdown);

  console.log(`\n✓ Report generated: PAGESPEED-REPORT.md`);

  // Print summary to console
  console.log('\n=== Summary ===\n');
  results.forEach(page => {
    const mobile = page.results.mobile?.performanceScore || 'N/A';
    const desktop = page.results.desktop?.performanceScore || 'N/A';
    console.log(`${page.name.padEnd(15)} Mobile: ${String(mobile).padStart(3)}  Desktop: ${String(desktop).padStart(3)}`);
  });
}

main().catch(console.error);
