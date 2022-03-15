import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/Homepage'
import { LoginPage } from '../../page-objects/LoginPage'
import { TransferPage } from '../../page-objects/TransferPage'

test.describe('Transfer Funds', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let transferPage: TransferPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    transferPage = new TransferPage(page)

    homePage.visit()
    homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
  })

  test('Transfer Funds', async ({ page }) => {
    transferPage.goToTransferPage()
    transferPage.fillForm('2', '3', '100', 'Transfer test')
    transferPage.submitForm()
    transferPage.verifyTransfer()
    await transferPage.verifyTransferSuccess()
  })
})
