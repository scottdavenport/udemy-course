import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/Homepage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Account Activity', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)

    homePage.visit()
    homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
  })

  test('Account Activity - Savings', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/bank/account-activity.html')

    const savingsAccount = await page.locator(
      '#all_transactions_for_account tbody tr'
    )
    await expect(savingsAccount).toHaveCount(3)
  })

  test('Account Activity - Brokerage - No Result', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/bank/account-activity.html')
    await page.selectOption('#aa_accountId', '6')

    const element = await page.locator('#all_transactions_for_account .well')
    await expect(element).toBeVisible()
  })
})
