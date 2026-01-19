import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Key Pages', () => {
  test('homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });
  });

  test('coins page', async ({ page }) => {
    await page.goto('/coins');
    await page.waitForSelector('[data-coin-item]', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('coins.png', { fullPage: true });
  });

  test('artifacts page', async ({ page }) => {
    await page.goto('/artifacts');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('artifacts.png', { fullPage: true });
  });

  test('about page', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('about.png', { fullPage: true });
  });

  test('library page', async ({ page }) => {
    await page.goto('/library');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('library.png', { fullPage: true });
  });

  test('search page', async ({ page }) => {
    await page.goto('/search');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('search.png', { fullPage: true });
  });
});

test.describe('Visual Regression - Item Detail', () => {
  test('coin detail page', async ({ page }) => {
    await page.goto('/coins');
    await page.waitForSelector('[data-coin-item]', { timeout: 10000 });
    const firstItem = page.locator('[data-coin-item]').first();
    await firstItem.click();
    await page.waitForLoadState('networkidle');
    // Wait for blur placeholder images to fully load
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('item-detail.png', { fullPage: true, maxDiffPixels: 3000 });
  });
});

test.describe('Visual Regression - Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('homepage mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-mobile.png', { fullPage: true });
  });

  test('coins page mobile', async ({ page }) => {
    await page.goto('/coins');
    await page.waitForSelector('[data-coin-item]', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('coins-mobile.png', { fullPage: true });
  });
});
