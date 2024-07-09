import { defineConfig } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

export const STORAGE_STATE = path.join(__dirname, 'user.json');

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [['list'], ['html']],
  retries: process.env.CI ? 2 : 0,
  fullyParallel: true,

  use: {
    baseURL: 'https://www.amazon.in',
    headless : false,
    screenshot:'only-on-failure',
    video : "retain-on-failure",
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },

    // this project runs all tests except the setup and logged in tests
    {
      name: 'e2e tests',
      testIgnore: ['**/*.setup.ts'],
      dependencies: ['setup'],
      use: {
        storageState: STORAGE_STATE,
      },
    },
  ],
});