let demoblazeLocators = {
    cardProduct :() => page.locator('.card-title'),
    addProductToCart :() => page.locator("#tbodyid > div.row > div > a"),
    "formulario1":{
        cardProduct :() => page.locator('.card-title'),
    },
    "formulario2":{
        cardProduct :() => page.locator('.card-title'),
    },
    homeNavBar :() => page.locator('.nav-item'),
    btnCart :() => page.locator('#navbarExample > ul > li:nth-child(4)'),
    verOrderCompra :() => page.locator('#page-wrapper > div > div.col-lg-1 > button'),
    inputName :() => page.locator('#name'),
    inputCountry :() => page.locator('#country'),
    inputCity :() => page.locator('#city'),
    inputCard :() => page.locator('#card'),
    inputMonth :() => page.locator('#month'),
    inputYear :() => page.locator('#year'),
    btnBuy :() => page.locator('#orderModal > div > div > div.modal-footer > button.btn.btn-primary'),
    lblValidateBuy :() => page.locator('body > div.sweet-alert.showSweetAlert.visible >h2')
}
module.exports =
    {
        demoblazeLocators,
    }