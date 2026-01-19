#!/usr/bin/env node

/**
 * Design Consistency Audit Script
 * Checks for design token usage, spacing consistency, and pattern adherence
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ARCHIVE_DIR = join(__dirname, '..', 'archive');
const SRC_DIR = join(ARCHIVE_DIR, 'src');

// Design tokens from tailwind.config.mjs
const DESIGN_TOKENS = {
  colors: {
    valid: ['void', 'surface', 'surface-light', 'surface-elevated', 'border', 'border-light',
            'text', 'text-muted', 'text-dim', 'accent', 'accent-glow', 'gold', 'gold-glow',
            'white', 'black', 'transparent', 'current', 'inherit'],
    deprecated: ['gray', 'slate', 'zinc', 'neutral'], // Should use design tokens instead
  },
  spacing: {
    recommended: ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', '128', 'px'],
    arbitrary: /\[[\d.]+(px|rem|em|%)\]/g,
  },
  typography: {
    sizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
    arbitrarySizes: /text-\[[\d.]+(px|rem)\]/g,
    fonts: ['sans', 'mono', 'cuneiform'],
  },
  borderRadius: {
    valid: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    arbitrary: /rounded-\[[\d.]+(px|rem)\]/g,
  },
};

// Patterns to check for consistency
const PATTERNS = {
  cardPadding: {
    expected: ['p-4', 'p-5', 'p-6'],
    description: 'Card internal padding',
  },
  cardGap: {
    expected: ['gap-3', 'gap-4', 'gap-5', 'gap-6'],
    description: 'Card content spacing',
  },
  sectionSpacing: {
    expected: ['py-12', 'py-16', 'py-20', 'py-24'],
    description: 'Section vertical spacing',
  },
  borderOpacity: {
    expected: ['border-white/5', 'border-white/10', 'border-border'],
    description: 'Border styling',
  },
};

const issues = [];
const warnings = [];
const stats = {
  filesScanned: 0,
  arbitraryValues: 0,
  deprecatedColors: 0,
  inconsistentPatterns: 0,
};

function getAllFiles(dir, extensions = ['.astro', '.tsx', '.jsx', '.vue', '.css']) {
  const files = [];
  try {
    const items = readdirSync(dir);
    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        files.push(...getAllFiles(fullPath, extensions));
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (e) {
    // Directory doesn't exist or can't be read
  }
  return files;
}

function extractClasses(content) {
  const classPatterns = [
    /class="([^"]+)"/g,
    /class='([^']+)'/g,
    /className="([^"]+)"/g,
    /className='([^']+)'/g,
    /@apply\s+([^;]+);/g,
  ];

  const classes = new Set();
  for (const pattern of classPatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      match[1].split(/\s+/).forEach(c => classes.add(c.trim()));
    }
  }
  return Array.from(classes).filter(c => c.length > 0);
}

function checkArbitraryValues(classes, filePath) {
  const arbitraryPattern = /\[([\d.]+)(px|rem|em|%|vh|vw)\]/;
  const found = [];

  for (const cls of classes) {
    if (arbitraryPattern.test(cls)) {
      found.push(cls);
      stats.arbitraryValues++;
    }
  }

  if (found.length > 0) {
    warnings.push({
      type: 'arbitrary-value',
      file: filePath.replace(ARCHIVE_DIR, ''),
      message: `Arbitrary values found: ${found.join(', ')}`,
      suggestion: 'Consider using design tokens from tailwind.config.mjs',
    });
  }
}

function checkDeprecatedColors(classes, filePath) {
  const found = [];

  for (const cls of classes) {
    for (const deprecated of DESIGN_TOKENS.colors.deprecated) {
      if (cls.includes(`-${deprecated}-`) || cls.startsWith(`${deprecated}-`) || cls.includes(`bg-${deprecated}`) || cls.includes(`text-${deprecated}`)) {
        found.push({ class: cls, deprecated });
        stats.deprecatedColors++;
      }
    }
  }

  if (found.length > 0) {
    issues.push({
      type: 'deprecated-color',
      file: filePath.replace(ARCHIVE_DIR, ''),
      message: `Deprecated color tokens: ${found.map(f => f.class).join(', ')}`,
      suggestion: 'Use design tokens: void, surface, surface-light, text, text-muted, text-dim, accent, gold',
    });
  }
}

function checkBorderConsistency(classes, filePath) {
  const borderClasses = classes.filter(c => c.startsWith('border-'));
  const inconsistent = [];

  for (const cls of borderClasses) {
    // Check for inconsistent opacity values
    const opacityMatch = cls.match(/border-white\/(\d+)/);
    if (opacityMatch) {
      const opacity = parseInt(opacityMatch[1]);
      if (![5, 10].includes(opacity)) {
        inconsistent.push(cls);
      }
    }
  }

  if (inconsistent.length > 0) {
    warnings.push({
      type: 'border-inconsistency',
      file: filePath.replace(ARCHIVE_DIR, ''),
      message: `Non-standard border opacity: ${inconsistent.join(', ')}`,
      suggestion: 'Use border-white/5, border-white/10, or border-border',
    });
    stats.inconsistentPatterns++;
  }
}

function checkTypographyConsistency(classes, filePath) {
  const found = [];

  for (const cls of classes) {
    // Check for arbitrary font sizes
    if (DESIGN_TOKENS.typography.arbitrarySizes.test(cls)) {
      found.push(cls);
      // Reset regex lastIndex
      DESIGN_TOKENS.typography.arbitrarySizes.lastIndex = 0;
    }
  }

  if (found.length > 0) {
    warnings.push({
      type: 'arbitrary-typography',
      file: filePath.replace(ARCHIVE_DIR, ''),
      message: `Arbitrary font sizes: ${found.join(', ')}`,
      suggestion: 'Use standard Tailwind sizes: xs, sm, base, lg, xl, 2xl, etc.',
    });
  }
}

function checkSpacingConsistency(classes, filePath) {
  const spacingPattern = /^(p|m|gap|space|w|h)([xytblr]?)-\[/;
  const found = [];

  for (const cls of classes) {
    if (spacingPattern.test(cls)) {
      found.push(cls);
    }
  }

  if (found.length > 0) {
    warnings.push({
      type: 'arbitrary-spacing',
      file: filePath.replace(ARCHIVE_DIR, ''),
      message: `Arbitrary spacing values: ${found.join(', ')}`,
      suggestion: 'Use standard Tailwind spacing scale',
    });
  }
}

function scanFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const classes = extractClasses(content);

    if (classes.length === 0) return;

    stats.filesScanned++;

    checkArbitraryValues(classes, filePath);
    checkDeprecatedColors(classes, filePath);
    checkBorderConsistency(classes, filePath);
    checkTypographyConsistency(classes, filePath);
    checkSpacingConsistency(classes, filePath);
  } catch (e) {
    // File read error
  }
}

function generateReport() {
  const timestamp = new Date().toISOString().split('T')[0];

  let md = `# Design Consistency Audit Report\n\n`;
  md += `**Generated:** ${timestamp}\n\n`;
  md += `---\n\n`;

  // Summary
  md += `## Summary\n\n`;
  md += `| Metric | Count |\n`;
  md += `|--------|-------|\n`;
  md += `| Files Scanned | ${stats.filesScanned} |\n`;
  md += `| Issues (Must Fix) | ${issues.length} |\n`;
  md += `| Warnings (Should Review) | ${warnings.length} |\n`;
  md += `| Arbitrary Values | ${stats.arbitraryValues} |\n`;
  md += `| Deprecated Colors | ${stats.deprecatedColors} |\n`;
  md += `| Inconsistent Patterns | ${stats.inconsistentPatterns} |\n\n`;

  // Score calculation
  const totalChecks = stats.filesScanned;
  const issueWeight = issues.length * 3 + warnings.length;
  const score = Math.max(0, Math.round(100 - (issueWeight / totalChecks) * 10));

  const scoreEmoji = score >= 90 ? '🟢' : score >= 70 ? '🟡' : '🔴';
  md += `**Design Consistency Score:** ${scoreEmoji} ${score}/100\n\n`;

  md += `---\n\n`;

  // Issues
  if (issues.length > 0) {
    md += `## 🔴 Issues (Must Fix)\n\n`;
    issues.forEach((issue, i) => {
      md += `### ${i + 1}. ${issue.type}\n`;
      md += `**File:** \`${issue.file}\`\n\n`;
      md += `${issue.message}\n\n`;
      md += `> 💡 **Suggestion:** ${issue.suggestion}\n\n`;
    });
  }

  // Warnings
  if (warnings.length > 0) {
    md += `## 🟡 Warnings (Should Review)\n\n`;

    // Group warnings by type
    const grouped = {};
    warnings.forEach(w => {
      if (!grouped[w.type]) grouped[w.type] = [];
      grouped[w.type].push(w);
    });

    Object.entries(grouped).forEach(([type, items]) => {
      md += `### ${type} (${items.length} occurrences)\n\n`;
      md += `> 💡 **Suggestion:** ${items[0].suggestion}\n\n`;
      md += `| File | Details |\n`;
      md += `|------|----------|\n`;
      items.slice(0, 10).forEach(item => {
        md += `| \`${item.file}\` | ${item.message.substring(0, 60)}${item.message.length > 60 ? '...' : ''} |\n`;
      });
      if (items.length > 10) {
        md += `| ... | *and ${items.length - 10} more* |\n`;
      }
      md += `\n`;
    });
  }

  // Design Tokens Reference
  md += `---\n\n`;
  md += `## Design Tokens Reference\n\n`;
  md += `### Colors\n`;
  md += `\`\`\`\n`;
  md += `Background: void, surface, surface-light, surface-elevated\n`;
  md += `Borders:    border, border-light\n`;
  md += `Text:       text, text-muted, text-dim\n`;
  md += `Accent:     accent, accent-glow, gold, gold-glow\n`;
  md += `\`\`\`\n\n`;

  md += `### Typography\n`;
  md += `\`\`\`\n`;
  md += `Fonts:  font-sans (Space Grotesk), font-mono (JetBrains Mono), font-cuneiform\n`;
  md += `Sizes:  text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, ...\n`;
  md += `\`\`\`\n\n`;

  md += `### Spacing Guidelines\n`;
  md += `\`\`\`\n`;
  md += `Cards:     p-4 to p-6 internal, gap-3 to gap-5 content\n`;
  md += `Sections:  py-12 to py-24 vertical\n`;
  md += `Grids:     gap-4 to gap-8 between items\n`;
  md += `\`\`\`\n\n`;

  md += `### Border Patterns\n`;
  md += `\`\`\`\n`;
  md += `Standard:  border-border or border-white/10\n`;
  md += `Subtle:    border-white/5\n`;
  md += `Hover:     border-accent or border-accent-glow\n`;
  md += `\`\`\`\n`;

  return md;
}

async function main() {
  console.log('🎨 Design Consistency Audit\n');
  console.log('Scanning source files...\n');

  const files = getAllFiles(SRC_DIR);
  console.log(`Found ${files.length} files to scan\n`);

  for (const file of files) {
    scanFile(file);
  }

  const report = generateReport();
  const outputPath = join(__dirname, '..', 'DESIGN-AUDIT-REPORT.md');
  writeFileSync(outputPath, report);

  console.log('=== Summary ===\n');
  console.log(`Files Scanned:       ${stats.filesScanned}`);
  console.log(`Issues (Must Fix):   ${issues.length}`);
  console.log(`Warnings (Review):   ${warnings.length}`);
  console.log(`Arbitrary Values:    ${stats.arbitraryValues}`);
  console.log(`Deprecated Colors:   ${stats.deprecatedColors}`);
  console.log(`Pattern Issues:      ${stats.inconsistentPatterns}`);
  console.log('');

  const totalChecks = stats.filesScanned;
  const issueWeight = issues.length * 3 + warnings.length;
  const score = Math.max(0, Math.round(100 - (issueWeight / totalChecks) * 10));
  const scoreEmoji = score >= 90 ? '🟢' : score >= 70 ? '🟡' : '🔴';

  console.log(`Design Score: ${scoreEmoji} ${score}/100\n`);
  console.log(`✓ Report generated: DESIGN-AUDIT-REPORT.md\n`);

  if (issues.length > 0) {
    console.log('⚠️  Found issues that should be fixed for consistency.');
  }
}

main().catch(console.error);
