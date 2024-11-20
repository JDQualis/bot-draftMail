const { expect } = require('@playwright/test');
const { waitForDialog } = require('@playwright/test');
const assert = require('node:assert').strict


const elements = require("./objDemoblaze").demoblazeLocators
const formulario = elements.formulario1

class PageDemoblaze {
    async navigate() {
        await global.page.goto(process.env.WEB_URL,)
    }

    async clickProduct(productName) {
        await elements.cardProduct().filter({ hasText: productName }).click()
    };

    async addToCart() {
        await elements.addProductToCart().click();
        const dialog = await waitForDialog;
        if (dialog && !dialog.handled()) {
            await dialog.accept();
        }
    }

    async clickHome(homeName) {
        await elements.homeNavBar().filter({ hasText: homeName }).click()
    };

    async visualize() {
        await elements.btnCart().click()
    }

    async createOrdenBuy() {
        await elements.verOrderCompra().click()
    }

    async typeName(data) {
        await elements.inputName().isVisible()
        await elements.inputName().fill(data)
    }

    async typeCountry(data) {
        await elements.inputCountry().fill(data);
    }

    async typeCity(data) {
        await elements.inputCity().fill(data);
    }

    async typeCard(data) {
        await elements.inputCard().fill(data);
    }

    async typeMonth(data) {
        await elements.inputMonth().fill(data);
    }

    async typeYear(data) {
        await elements.inputYear().fill(data);
    }

    fillFormBuy = async (json) => {
        await page.waitForURL('**/cart.html');
        await this.typeName(json.name);
        await this.typeCountry(json.country);
        await this.typeCity(json.city);
        await this.typeCard(json.card);
        await this.typeMonth(json.month);
        await this.typeYear(json.year);
    }

    async completeBuy() {
        await elements.btnBuy().click()
    }

    async validateBuy() {
        expect(await this.getText()).toEqual('Thank you for your purchase!')
    }

    async getText() {
        return await elements.lblValidateBuy().textContent()
    }
}

module.exports = new PageDemoblaze