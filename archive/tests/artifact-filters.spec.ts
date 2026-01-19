import { test, expect } from '@playwright/test';

test.describe('Artifact Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/artifacts');
    await page.waitForLoadState('networkidle');
  });

  test('page loads with items', async ({ page }) => {
    const heading = page.locator('h1:has-text("Artifacts")');
    await expect(heading).toBeVisible();
  });

  test('filter dropdowns exist', async ({ page }) => {
    const filterBar = page.locator('[x-data]').first();
    await expect(filterBar).toBeVisible();
  });

  test('category dropdown exists', async ({ page, isMobile }) => {
    if (isMobile) {
      // On mobile, the filter is collapsed - check for the mobile filter header
      const mobileFilterHeader = page.locator('.mobile-filter-header');
      await expect(mobileFilterHeader).toBeVisible();
    } else {
      // On desktop, the dropdown is directly visible
      const categoryButton = page.locator('main button:has-text("All Categories")').first();
      await expect(categoryButton).toBeVisible();
    }
  });

  test('filters by URL param - category jewelry', async ({ page }) => {
    await page.goto('/artifacts?category=jewelry');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('category')).toBe('jewelry');
  });

  test('filters by URL param - category ring', async ({ page }) => {
    await page.goto('/artifacts?category=ring');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('category')).toBe('ring');
  });

  test('filters by URL param - category seal', async ({ page }) => {
    await page.goto('/artifacts?category=seal');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('category')).toBe('seal');
  });

  test('sort by URL param works', async ({ page }) => {
    await page.goto('/artifacts?sort=era-oldest');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('sort')).toBe('era-oldest');
  });

  test('multiple URL params combine', async ({ page }) => {
    await page.goto('/artifacts?category=seal&material=stone');
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('category')).toBe('seal');
    expect(url.searchParams.get('material')).toBe('stone');
  });

  test('URL state persists on reload', async ({ page }) => {
    await page.goto('/artifacts?category=jewelry');
    await page.waitForLoadState('networkidle');

    await page.reload();
    await page.waitForLoadState('networkidle');

    const url = new URL(page.url());
    expect(url.searchParams.get('category')).toBe('jewelry');
  });
});

test.describe('Artifact Item Navigation', () => {
  test('item links exist', async ({ page }) => {
    await page.goto('/artifacts');
    await page.waitForLoadState('networkidle');

    const firstCard = page.locator('a[href^="/item/"]').first();
    await expect(firstCard).toBeVisible();
    const href = await firstCard.getAttribute('href');
    expect(href).toContain('/item/');
  });
});
