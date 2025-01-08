
const path = require('path');
const headless = process.env.HEADLESS === 'true' ? true : false;
const recordVideo = process.env.VIDEO === 'true' ? true : false;
const browserType = process.env.BROWSER_TYPE || 'chromium';
const device = process.env.DEVICE || 'chromium';
const isMobile =  process.env.MOBILE === 'true' ? true : false;
const config = require('../playwright.config');

const getBrowser = async () => {
    const browser = await require('@playwright/test')[browserType].launch({
        headless: headless,
    });
    return browser;
};

const configureContext = async (browser) => {
    let devices = isMobile ? device : browserType;
    let contextOptions = config.projects.find(project => project.name === devices)?.use || {};
    contextOptions.ignoreHTTPSErrors = true;
    if (recordVideo) {
        contextOptions.recordVideo = { dir: './videos/' };
    }
    let context = await browser.newContext(contextOptions);
    global.context = context;
    global.page = await context.newPage();
};

module.exports = {
    getBrowser,
    configureContext
};