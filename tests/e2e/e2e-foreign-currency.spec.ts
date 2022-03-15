import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/Homepage'
import { LoginPage } from '../../page-objects/LoginPage'
import { CurrencyExchange } from '../../page-objects/CurrencyExchange'
import { Navbar } from '../../page-objects/components/Navbar'
import { Subnavbar } from '../../page-objects/components/Subnavbar'

test.describe('Foreign Currency Exchange', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let currencyExchange: CurrencyExchange
  let navbar: Navbar
  let subnavbar: Subnavbar

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    currencyExchange = new CurrencyExchange(page)
    navbar = new Navbar(page)
    subnavbar = new Subnavbar(page)

    homePage.visit()
    homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
  })

  test('Convert Foreign Currency', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
    await subnavbar.clickOnTab('purchaseForeignCurrency')

    currencyExchange.fillForm('GBP', '100')
    currencyExchange.checkSellRate()
    await currencyExchange.clickOnInDollars()
    currencyExchange.clickOnCalculate()
    currencyExchange.checkConversionAmount()
    currencyExchange.clickOnPurchaseButton()
    await currencyExchange.checkAlertContent()
  })
})
