import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage  extends BasePage {

  async verifySearchResults(term: string) {
    const results = await this.page.$$('.s-result-item');
    for (const result of results) {
      const text = await result.innerText();
      if (!text.toLowerCase().includes(term.toLowerCase())) {
        throw new Error(`Search result does not contain "${term}"`);
      }
    }
  }

  async clickFirstProduct() {
    // Wait for the new page to open
    const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        this.page.click('.s-result-item h2 a >> nth=0')
    ]);

    // Wait for the new page to load
    await newPage.waitForLoadState();
    return newPage;
}

  async applyFilter(filterTitle: string, filterValue: string) {
    // First, try to find the specific filter section
    const filterSections = await this.page.locator(
      `(//*[@id="s-refinements"] //div[@class="a-section a-spacing-none"]//span[text()="${filterTitle}"]/ancestor::div[@class="a-section a-spacing-none"])[2]`
    );

    expect(filterSections).toBeTruthy

    let filterApplied = false;

    const filterValueElement = await filterSections.locator(`'${filterValue}'`)
    await filterValueElement.click();
    }

  async getResultsCount(): Promise<number> {
    await this.page.waitForLoadState('load')
    await this.page.locator('.s-result-item').first().isVisible()
    await this.page.locator('a-section a-spacing-small a-spacing-top-small').first().isVisible()
    const resultCountText = await this.page.textContent('.a-section.a-spacing-small.a-spacing-top-small');

    if (!resultCountText) {
      throw new Error('Results count information not found');
    }

    // regex to handle various formats and extract the number after "over" or "of" 
    const match = resultCountText.match(/(?:over\s+|of\s+)(\d{1,3}(?:,\d{3})*)\s+results/i);
    if (!match) {
      throw new Error('Unable to parse results count information');
    }

    return parseInt(match[1].replace(/,/g, ''), 10);
  }

  async verifyResultsContain(term: string): Promise<boolean> {
    const results = await this.page.$$('.a-size-mini s-line-clamp-1');
    for (const result of results) {
      const text = await result.innerText();
      if (!text.toLowerCase().includes(term.toLowerCase())) {
        return false;
      }
    }
    return true;
  }

  async verifyPriceRange(min: number, max: number): Promise<boolean> {
    await this.page.waitForSelector('.s-result-item');
    const prices = await this.page.$$eval('.a-price-whole', 
      elements => elements.map(el => parseInt(el.textContent?.replace(/,/g, '') || '0', 10)));
    return prices.every(price => price >= min && price <= max);
  }

  async setPriceRange(minPrice: number, maxPrice: number) {
// Wait for the price filter to be available
await this.page.waitForSelector('(//input[@type="range"])[1]');

// Set min price
await this.page.$eval('(//input[@type="range"])[1]', (el: HTMLInputElement, value: string) => {
  el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}, minPrice.toString());

// Set max price
await this.page.$eval('(//input[@type="range"])[2]', (el: HTMLInputElement, value: string) => {
  el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}, maxPrice.toString());
    
    // Click the "Go" button to apply the price range
    await this.page.click('.a-button-input[type="submit"]');
    
  }
}