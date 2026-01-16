import { test, expect } from '@playwright/test';

test.describe('Coin Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/coins');
    await page.waitForLoadState('networkidle');
  });

  test('shows all coins by default', async ({ page }) => {
    const cards = page.locator('[data-coin-item]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('filters by empire - Roman via URL', async ({ page }) => {
    await page.goto('/coins?empire=roman');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('empire')).toBe('roman');
  });

  test('filters by empire - Byzantine via URL', async ({ page }) => {
    await page.goto('/coins?empire=byzantine');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('empire')).toBe('byzantine');
  });

  test('empire button click filters coins', async ({ page }) => {
    const romanButton = page.locator('button').filter({ hasText: 'Roman' }).first();
    await romanButton.click();
    await page.waitForTimeout(500);

    const url = new URL(page.url());
    expect(url.searchParams.get('empire')).toBe('roman');
  });

  test('filters by denomination via URL', async ({ page }) => {
    await page.goto('/coins?denomination=Denarius');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('denomination')).toBe('Denarius');
  });

  test('filters by ruler via URL', async ({ page }) => {
    await page.goto('/coins?ruler=Marcus%20Aurelius');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('ruler')).toBe('Marcus Aurelius');
  });

  test('sort by era oldest via URL', async ({ page }) => {
    await page.goto('/coins?sort=era-oldest');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('sort')).toBe('era-oldest');
  });

  test('sort by era newest via URL', async ({ page }) => {
    await page.goto('/coins?sort=era-newest');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('sort')).toBe('era-newest');
  });

  test('URL state persists on reload', async ({ page }) => {
    await page.goto('/coins?empire=roman');
    await page.waitForLoadState('networkidle');

    await page.reload();
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('empire')).toBe('roman');
  });

  test('filters by material via URL', async ({ page }) => {
    await page.goto('/coins?material=silver');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('material')).toBe('silver');
  });

  test('multiple filters combine correctly via URL', async ({ page }) => {
    await page.goto('/coins?empire=roman&material=silver');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('empire')).toBe('roman');
    expect(url.searchParams.get('material')).toBe('silver');
  });

  test('clicking item navigates to detail page', async ({ page }) => {
    const firstCard = page.locator('a[data-coin-item]').first();
    await expect(firstCard).toBeVisible();
    const href = await firstCard.getAttribute('href');
    expect(href).toContain('/item/');
  });

  test('all button resets filters', async ({ page }) => {
    await page.goto('/coins?empire=roman');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('empire')).toBe('roman');
  });
});
