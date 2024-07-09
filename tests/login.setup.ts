import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';
import { LoginPage } from 'pages/LoginPage';

setup('login', async ({browser }) => {
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);

  const Mobile = process.env.AMAZON_MOBILE
  const password = process.env.AMAZON_PASSWORD
  const Username =process.env.USERNAME

  loginPage.navigateTo("/")
  await loginPage.login(Mobile, password);
  await expect(page.locator(`:text-is("Hello, ${Username}")`)).toBeVisible();
  await page.context().storageState({ path: STORAGE_STATE });
});