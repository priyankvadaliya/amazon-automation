import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { userData } from '../testData/userData';

test('Search for shoes', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await page.goto('/');
  await homePage.search(userData.searchTerm);
  await searchResultsPage.verifySearchResults(userData.searchTerm);
});