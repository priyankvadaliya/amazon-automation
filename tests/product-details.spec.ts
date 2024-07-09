
import { userData } from '../testData/userData';
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';

test('Validate product details, add to cart, verify cart details, and remove item', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);

    // Navigate to Amazon and search for shoes
    await page.goto('/');
    await homePage.search(userData.searchTerm);

    // Click on the first product in the search results and get the new page
    const productDetailsPage = new ProductDetailsPage(await searchResultsPage.clickFirstProduct());

    // Validate product details on the product page
    let searchTerm = String(userData.searchTerm).toLowerCase()
    const productTitle = await productDetailsPage.getProductTitle();
    expect(productTitle.toLowerCase()).toContain(searchTerm);
    
    const productPrice = await productDetailsPage.getProductPrice();
    expect(productPrice).toBeGreaterThan(0);

    const productRating = await productDetailsPage.getProductRating();
    expect(productRating).toContain('out of 5 stars');

    const inStock = await productDetailsPage.getStockStatus();
    expect(inStock.toLowerCase()).toContain('in stock');

    const productDescription = await productDetailsPage.getProductDescription();
    expect(productDescription).toBeTruthy();

    const addedToCartMessage = await productDetailsPage.addToCart();

    // Close the product page and switch back to the main page
    await productDetailsPage.closeProductPage();
    await page.bringToFront();

    // Go to cart and verify the product details
    const cartPage = new CartPage(page);
    await cartPage.navigate();
    const cartItemTitle = await cartPage.getCartItemTitle();

    // Extract the first two words from the titles
    const extractFirstTwoWords = (title: string) => {
        return title.split(' ').slice(0, 2).join(' ').toLowerCase();
    };

    const productFirstTwoWords = extractFirstTwoWords(productTitle);
    const cartItemFirstTwoWords = extractFirstTwoWords(cartItemTitle);

    expect(cartItemFirstTwoWords).toBe(productFirstTwoWords);

    const cartItemPrice = await cartPage.getCartItemPrice();
    expect(cartItemPrice).toBeCloseTo(productPrice, 0);

    const quantity = await cartPage.getQuantity();
    expect(quantity).toBe('1');

    const subtotal = await cartPage.getSubtotal();
    expect(subtotal).toBeCloseTo(productPrice, 0);

    const isProceedToBuyButtonVisible = await cartPage.isProceedToBuyButtonVisible();
    expect(isProceedToBuyButtonVisible).toBeTruthy();

    // Remove the item from the cart
    await cartPage.removeFirstItem();

    // Verify that the cart is empty
    const isCartEmpty = await cartPage.isCartEmpty();
    expect(isCartEmpty).toBeTruthy();
});