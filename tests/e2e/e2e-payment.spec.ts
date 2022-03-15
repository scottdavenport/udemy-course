import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/Homepage'
import { LoginPage } from '../../page-objects/LoginPage'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe('New Payment', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let paymentPage: PaymentPage
  let navbar: Navbar

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)

    homePage.visit()
    homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
  })

  test('Send new payment', async ({ page }) => {
    paymentPage = new PaymentPage(page)
    navbar = new Navbar(page)

    await paymentPage.goToPaymentPage()
    // navbar doesn't work because of an error on the sample page
    // navbar.clickOnTab('payBills')
    await paymentPage.createPayment()
    await paymentPage.checkSuccessMessage()
  })
})
