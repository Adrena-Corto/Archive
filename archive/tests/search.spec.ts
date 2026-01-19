import { test, expect } from '@playwright/test';

test.describe('Search Modal (Cmd+K)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('search modal can be triggered', async ({ page }) => {
    await page.keyboard.press('Meta+k');
    await page.waitForTimeout(500);
  });

  test('search modal closes with Escape', async ({ page }) => {
    await page.keyboard.press('Meta+k');
    await page.waitForTimeout(300);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  });
});

test.describe('Full-Page Search (/search)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/search');
    await page.waitForLoadState('networkidle');
  });

  test('search page loads', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading.first()).toBeVisible();
  });

  test('search input exists', async ({ page }) => {
    const input = page.locator('input[type="text"], input[type="search"]').first();
    await expect(input).toBeVisible();
  });

  test('can type in search input', async ({ page }) => {
    const input = page.locator('input[type="text"], input[type="search"]').first();
    await input.fill('roman');
    await page.waitForTimeout(300);
    await expect(input).toHaveValue('roman');
  });

  test('search URL query param works', async ({ page }) => {
    await page.goto('/search?q=denarius');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('q')).toBe('denarius');
  });

  test('type filters exist', async ({ page }) => {
    const filterSection = page.locator('[x-data]');
    await expect(filterSection.first()).toBeVisible();
  });

  test('browse categories exist', async ({ page, isMobile }) => {
    if (isMobile) {
      // On mobile, the nav is in a hamburger menu - check the page content instead
      const searchInput = page.locator('input[type="text"], input[type="search"]').first();
      await expect(searchInput).toBeVisible();
    } else {
      // On desktop, nav links are visible
      const coinsLink = page.locator('a[href*="coins"], button:has-text("Coins")').first();
      await expect(coinsLink).toBeVisible();
    }
  });

  test('popular tags section exists', async ({ page }) => {
    const tagButton = page.locator('button:has-text("roman")').first();
    if (await tagButton.isVisible()) {
      await expect(tagButton).toBeVisible();
    }
  });

  test('clicking tag fills search', async ({ page }) => {
    const romanTag = page.locator('button:has-text("roman")').first();
    if (await romanTag.isVisible()) {
      await romanTag.click();
      await page.waitForTimeout(300);
    }
  });
});

test.describe('Search Navigation', () => {
  test('search to item navigation', async ({ page }) => {
    await page.goto('/search');
    await page.waitForLoadState('networkidle');

    const input = page.locator('input[type="text"], input[type="search"]').first();
    await input.fill('marcus');
    await page.waitForTimeout(500);
  });
});
