const { Before, After } = require('@cucumber/cucumber')
let { setDefaultTimeout } = require('@cucumber/cucumber')
const utils = require("./utils")
const config = require("./browser.Config")
const path = require('path')
setDefaultTimeout(60 * 15000)

require('dotenv').config({
    path: path.join(__dirname, '../.env')
})

Before(async () => {
    let browser = await config.getBrowser()
    global.browser = browser
    await config.configureContext(browser)

    global.context.on('page', async (popup) => {
        await popup.waitForLoadState('load')
        await popup.bringToFront()
        global.page = popup
    })

    await global.page.evaluate(() => {
        document.querySelectorAll('a[target="_blank"]').forEach((link) => {
            link.setAttribute('target', '_blank')
        })
    })
})

After(async function (scenario) {
    let fileName = await utils.getNameFile(scenario)

    await utils.takeScreenshot(this, fileName)
    await global.page.close()
    if (global.browser) await global.browser.close()
    await utils.saveVideo(this, fileName)
})