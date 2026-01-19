#!/usr/bin/env node

/**
 * Performance iteration workflow
 * 1. Run Lighthouse tests
 * 2. Analyze results
 * 3. Suggest fixes
 * 4. Apply fixes (with confirmation)
 * 5. Rebuild
 * 6. Retest
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

function run(cmd, options = {}) {
  console.log(`\n> ${cmd}`);
  try {
    return execSync(cmd, {
      encoding: 'utf-8',
      cwd: options.cwd || ROOT,
      stdio: options.silent ? 'pipe' : 'inherit'
    });
  } catch (error) {
    if (!options.ignoreError) throw error;
    return null;
  }
}

function analyzeLighthouseReport() {
  const reportPath = join(ROOT, 'LIGHTHOUSE-REPORT.md');
  const report = readFileSync(reportPath, 'utf-8');

  const issues = [];

  // Parse scores
  const scoreRegex = /\| (\w+.*?) \| 🟡? (\d+) \| 🟡? (\d+) \|/g;
  let match;
  while ((match = scoreRegex.exec(report))) {
    const [, page, mobile, desktop] = match;
    if (mobile < 90 || desktop < 90) {
      issues.push({
        page,
        mobile: parseInt(mobile),
        desktop: parseInt(desktop),
      });
    }
  }

  // Parse LCP issues
  if (report.includes('LCP: 4.')) {
    issues.push({ type: 'High LCP on mobile', severity: 'high' });
  }

  // Parse TBT issues
  if (report.includes('TBT: 120 ms') || report.includes('TBT: 140 ms')) {
    issues.push({ type: 'High TBT on mobile', severity: 'medium' });
  }

  // Parse CSS issues
  if (report.includes('Reduce unused CSS')) {
    issues.push({ type: 'Unused CSS', severity: 'medium' });
  }

  return issues;
}

function suggestFixes(issues) {
  console.log('\n📋 Issues Found:\n');
  issues.forEach((issue, i) => {
    if (issue.page) {
      console.log(`${i + 1}. ${issue.page}: Mobile ${issue.mobile}, Desktop ${issue.desktop}`);
    } else {
      console.log(`${i + 1}. ${issue.type} (${issue.severity})`);
    }
  });

  console.log('\n💡 Recommended Fixes:\n');
  console.log('1. Add fetchpriority="high" to LCP images');
  console.log('2. Preload critical images');
  console.log('3. Defer non-critical JavaScript');
  console.log('4. Use PurgeCSS to remove unused CSS');
  console.log('5. Optimize image loading strategy');
}

async function main() {
  console.log('🚀 Performance Iteration Workflow\n');
  console.log('This will:');
  console.log('1. Run Lighthouse tests');
  console.log('2. Analyze results');
  console.log('3. Suggest fixes');
  console.log('');

  // Step 1: Run Lighthouse
  console.log('\n📊 Step 1: Running Lighthouse tests...\n');
  run('node scripts/lighthouse-test.mjs');

  // Step 2: Analyze
  console.log('\n🔍 Step 2: Analyzing results...\n');
  const issues = analyzeLighthouseReport();

  if (issues.length === 0) {
    console.log('✅ No performance issues found! All pages scoring 90+\n');
    return;
  }

  // Step 3: Suggest fixes
  suggestFixes(issues);

  console.log('\n📝 Next Steps:\n');
  console.log('Review the report at: LIGHTHOUSE-REPORT.md');
  console.log('Implement the suggested fixes');
  console.log('Run this script again to verify improvements');
}

main().catch(console.error);
