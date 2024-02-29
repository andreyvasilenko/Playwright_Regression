import dotenv from "dotenv";
import { PlaywrightTestConfig } from '@playwright/test';

// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const environment = process.env.TEST_ENV || 'dev';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './specs',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */  
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  // reporter: 'allure-playwright',
  environment: process.env.TEST_ENV || 'dev',
  password: 'Test012!',
  username: environment === 'stageRCM' ? "avasylenko_qa" : environment === 'stageFCC' ? "AndriiQA" : "Andrii",

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    //
    baseURL: environment === 'stageRCM' ? "https://deploytest-dev.axgsolutions.com" : environment === 'stageFCC' ? "https://fcc-stage.axgsolutions.com" : "https://amp-dev-p2a.azurewebsites.net",
    // baseURL: environment === 'stage' ? "https://stage.help.bunch.capital/en" : environment === 'prod' ? "https://help.bunch.capital/en" : "https://help.bunch.capital/en",

    // username: environment === 'stageRCM' ? "AndriiQA" : environment === 'stageFCC' ? "AndriiQA" : "Andrii",
    // password: 'Test012!',
    //

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
