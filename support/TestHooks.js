const { Before, AfterAll, After } = require('@cucumber/cucumber')
let { setDefaultTimeout } = require('@cucumber/cucumber')
const utils = require("./utils");
const config = require("./browser.Config")
const path = require('path');
setDefaultTimeout(60 * 15000)

require('dotenv').config({
    path: path.join(__dirname, '../.env'),
});

Before(async () => {
    let browser = await config.getBrowser();
    global.browser = browser;
    await config.configureContext(browser);
});

After(async (scenario) => {
    let fileName = await utils.getNameFile(scenario)
    await utils.takeScreenshot(fileName);
    await global.page.close()
    if (global.browser) {
        await global.browser.close();
    }
    await utils.saveVideo(fileName)
});





