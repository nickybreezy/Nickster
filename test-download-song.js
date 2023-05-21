const { chromium } = require('playwright');

describe('Download Song', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Download song from Spotify', async () => {
    await page.goto('https://nickster.vercel.app/');

    // Perform actions to search and select the song
    await page.click('button[data-testid="search-button"]');
    await page.fill('input[data-testid="search-input"]', 'sza');
    await page.press('input[data-testid="search-input"]', 'Enter');
    await page.click('button[data-testid="download-button"]');

    // Wait for the download to complete
    await page.waitForEvent('download');

    // Assertions or further actions
    // ...
  });
});
