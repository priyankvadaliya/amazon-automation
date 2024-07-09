import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {
  async verifyProductDetails() {
    await this.page.waitForSelector('#productTitle');
    await this.page.waitForSelector('#price_inside_buybox');
  }

  async getProductTitle() {
    return await this.page.locator('#productTitle').innerText();
}

  async getProductPrice() {
      const priceText = await this.page.locator('.a-price-whole').first().innerText();
      return Number(priceText.replace(/[^0-9.-]+/g, ''));
  }

  async getProductRating() {
      return await this.page.locator('#acrPopover .a-icon-alt').first().innerText();
  }

  async getStockStatus() {
      return await this.page.locator('#availability').innerText();
  }

  async getProductDescription() {
      await this.page.locator('#productDescription').scrollIntoViewIfNeeded();
      return await this.page.locator('#productDescription').innerText();
  }

  async addToCart() {
    await this.page.click('#add-to-cart-button');
  }

  async closeProductPage() {
      await this.page.close();
  }
}

