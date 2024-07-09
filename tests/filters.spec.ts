import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { userData } from '../testData/userData';

test('Apply filters', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await page.goto('/');
  await homePage.search(userData.searchTerm);
  
  // Get initial results count
  const initialCount = await searchResultsPage.getResultsCount();

  // Apply brand filter
  await searchResultsPage.applyFilter(userData.firstFilterTitle, userData.firstFilterOption);

  // Get results count after first filter
  const countAfterBrandFilter = await searchResultsPage.getResultsCount();

  // Verify that the results count has decreased
  expect(countAfterBrandFilter).toBeLessThan(initialCount);

  // Verify that all results contain i.e "Puma"
  const allResultsContainPuma = await searchResultsPage.verifyResultsContain(userData.firstFilterOption);
  expect(allResultsContainPuma).toBe(true);

  // Apply price range filter
  await searchResultsPage.setPriceRange(userData.maxStepValue, userData.maxStepValue);

  // Verify that all results are within the price range
  const allResultsInPriceRange = await searchResultsPage.verifyPriceRange(userData.minPrice, userData.maxPrice);
  await page.waitForLoadState('domcontentloaded')
  expect(allResultsInPriceRange).toBe(true);

  // Get results count after second filter
  const finalCount = await searchResultsPage.getResultsCount();

  // Verify that the results count has decreased further
  expect(finalCount).toBeLessThan(countAfterBrandFilter);

  // Final verification that all results still contain i.e "Puma"
  const finalResultsContainPuma = await searchResultsPage.verifyResultsContain(userData.firstFilterOption);
  expect(finalResultsContainPuma).toBe(true); 
});