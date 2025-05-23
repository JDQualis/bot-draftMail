// @ts-check
const {defineConfig, devices} = require('@playwright/test')

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: './Features/*.feature',
    /* Maximum time one test can run for. */
    timeout: 60 * 10000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 10000,
    },
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
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    // use: {
    //   /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    //   actionTimeout: 0,
    //   /* Base URL to use in actions like `await page.goto('/')`. */
    //   // baseURL: 'http://localhost:3000',

    //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //   trace: 'on-first-retry',
    // },

    /* Configure projects for major browsers */
    projects: [

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
            },
        },

        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
        },

        {
            name: 'webkit',
            use: {...devices['Desktop Safari']},
        },

        /* Test against mobile viewports. */
         {
           name: 'MobileChrome',
           use: { ...devices['Pixel 5'],
                    isMobile: true },
         },
         {
           name: 'MobileSafari',
           use: { ...devices['iPhone 12'],
            isMobile: true
            },
        },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { channel: 'chrome' },
        // },
    ],

})
