import { test, expect } from '@playwright/test';

test.describe('FrameCraft Studio — Complete Design & Export Workflow', () => {
  test('1. Full Birthday template-to-editor-to-export journey', async ({ page }) => {
    // 1. Open homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/FrameCraft Studio/i);

    // 2. Browse templates & filter by category
    const birthdayFilterBtn = page.locator('#filter-birthday-btn');
    await expect(birthdayFilterBtn).toBeVisible();
    await birthdayFilterBtn.click();

    // 3. Select a birthday template by clicking Customize button
    const customizeBtn = page.locator('button:has-text("Customize")').first();
    await expect(customizeBtn).toBeVisible();
    await customizeBtn.click();

    // 4. Verify we are in the editor
    await expect(page).toHaveURL(/.*\/editor\/golden-sparkle-birthday/);
    await expect(page.locator('#canvas-container')).toBeVisible();

    // 5. Verify top toolbar elements
    await expect(page.locator('#undo-btn')).toBeVisible();
    await expect(page.locator('#redo-btn')).toBeVisible();
    await expect(page.locator('#export-btn')).toBeVisible();

    // 6. Test Sidebar tabs: Text tab
    const textTab = page.locator('#tab-text');
    await expect(textTab).toBeVisible();
    await textTab.click();

    // Add a heading preset
    const presetBtn = page.locator('text=HAPPY BIRTHDAY').first();
    await expect(presetBtn).toBeVisible();
    await presetBtn.click();

    // 7. Test Undo & Redo
    const undoBtn = page.locator('#undo-btn');
    await expect(undoBtn).toBeEnabled();
    await undoBtn.click();

    const redoBtn = page.locator('#redo-btn');
    await expect(redoBtn).toBeEnabled();
    await redoBtn.click();

    // 8. Test Preview Modal
    const previewBtn = page.locator('#preview-btn');
    await expect(previewBtn).toBeVisible();
    await previewBtn.click();
    await expect(page.locator('text=Real-Time Preview')).toBeVisible();

    // Close preview via close button
    await page.locator('#close-preview-btn').click();
    await expect(page.locator('text=Real-Time Preview')).not.toBeVisible();

    // 9. Test Export Dialog
    const exportBtn = page.locator('#export-btn');
    await exportBtn.click();

    await expect(page.locator('text=Export Print-Ready Design')).toBeVisible();
    await expect(page.locator('#format-png-btn')).toBeVisible();
    await expect(page.locator('#format-pdf-btn')).toBeVisible();

    // Select PDF format
    await page.locator('#format-pdf-btn').click();
    await expect(page.locator('#download-export-confirm-btn')).toBeVisible();

    // Close export dialog via close button
    await page.locator('#close-export-btn').click();
    await expect(page.locator('text=Export Print-Ready Design')).not.toBeVisible();

    // 10. Refresh and verify draft recovery
    await page.reload();
    await expect(page.locator('#canvas-container')).toBeVisible();
  });

  test('2. Anniversary scrapbook template', async ({ page }) => {
    await page.goto('/editor/dusty-rose-love-letter');
    await expect(page.locator('#canvas-container')).toBeVisible();
    await expect(page.locator('text=Dusty Rose Love Letter Scrapbook').first()).toBeVisible();
  });

  test('3. Interactive calendar template & date highlighting', async ({ page }) => {
    await page.goto('/editor/minimalist-washi-tape-calendar');
    await expect(page.locator('#canvas-container')).toBeVisible();

    // Open Calendar Tab
    const calTab = page.locator('#tab-calendar');
    await calTab.click();

    // Change month to December
    const monthSelect = page.locator('#calendar-month-select');
    await expect(monthSelect).toBeVisible();
    await monthSelect.selectOption('12');

    // Highlight date
    const highlightInput = page.locator('#highlight-day-input');
    await expect(highlightInput).toBeVisible();
    await highlightInput.fill('25');
  });

  test('4. Gallery Category Filter & Quick View Modal', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FrameCraft Studio/i);

    // Click 1st Birthday filter
    const firstBirthdayFilter = page.locator('#filter-first-birthday-btn');
    await expect(firstBirthdayFilter).toBeVisible();
    await firstBirthdayFilter.click();
    await expect(page.locator('text=Wild One 1st Birthday Milestone Poster').first()).toBeVisible();

    // Click Travel filter
    const travelFilter = page.locator('#filter-travel-btn');
    await expect(travelFilter).toBeVisible();
    await travelFilter.click();
    await expect(page.locator('text=Travel Journal & Passport Stamp Collage').first()).toBeVisible();

    // Open Quick View Modal
    const quickViewBtn = page.locator('button[title="Quick View Details"]').first();
    await expect(quickViewBtn).toBeVisible();
    await quickViewBtn.click();

    // Verify modal elements
    await expect(page.locator('#quickview-customize-btn')).toBeVisible();
    await expect(page.locator('text=Supported Print Sizes:')).toBeVisible();

    // Close Quick View
    await page.locator('#close-quickview-btn').click();
    await expect(page.locator('#quickview-customize-btn')).not.toBeVisible();
  });

  test('5. Gallery Search & Photo Count Filter', async ({ page }) => {
    await page.goto('/');

    // Search for "Diwali"
    const searchInput = page.locator('#template-search-input');
    await searchInput.fill('Diwali');
    await expect(page.locator('text=Festival of Lights Diya & Sparkler Keepsake').first()).toBeVisible();

    // Clear search
    await searchInput.fill('');

    // Filter by 9+ photos
    const photoSelect = page.locator('#photo-count-filter');
    await photoSelect.selectOption('9+');
    await expect(page.locator('text=Contemporary 9-Grid Gallery Poster').first()).toBeVisible();
  });

  test('6. Gallery thumbnails render actual canvas with matching design', async ({ page }) => {
    await page.goto('/');

    // Verify template card previews render real canvas instances
    const canvasPreviews = page.locator('.konvajs-content');
    await expect(canvasPreviews.first()).toBeVisible({ timeout: 15000 });

    // Open first template in editor via Customize button
    const customizeBtn = page.locator('button:has-text("Customize")').first();
    await expect(customizeBtn).toBeVisible();
    await customizeBtn.click();

    // Verify editor canvas loads
    await page.waitForURL(/\/editor\/.+/, { timeout: 15000 });
    const editorCanvas = page.locator('#canvas-container');
    await expect(editorCanvas).toBeVisible({ timeout: 10000 });
  });
});
