import { BasePage } from './BasePage';

export class CartPage extends BasePage {

    async navigate() {
        await this.page.click('#nav-cart');

        await this.page.waitForSelector('.sc-list-item-content', { state: 'visible' });
    }
    async getCartItemTitle() {
        await this.page.waitForSelector('.a-truncate-cut', { state: 'visible' });
        const titleElement = await this.page.locator('.sc-product-title .a-truncate-cut').first();
        return await titleElement.innerText();
    }

    async getCartItemPrice() {
        const priceText = await this.page.locator('.sc-product-price').first().innerText();
        return Number(priceText.replace(/[^0-9.-]+/g, ''));
    }

    async getQuantity() {
        return await this.page.locator('.a-dropdown-prompt').first().innerText();
    }

    async getSubtotal() {
        const subtotalText = await this.page.locator('#sc-subtotal-amount-activecart .sc-price').innerText();
        return Number(subtotalText.replace(/[^0-9.-]+/g, ''));
    }

    async isProceedToBuyButtonVisible() {
        return await this.page.locator('#sc-buy-box-ptc-button').isVisible();
    }

    async removeFirstItem() {
        await this.page.click('input[value="Delete"]');
    }

    async isCartEmpty() {
        return await this.page.locator('text= was removed from Shopping Cart.').isVisible();

    }
}