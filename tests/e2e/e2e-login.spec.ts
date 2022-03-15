import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel.only('Login and logout flow', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)

    await homePage.visit()
  })

  // Negative Scenarios
  test('Negative Scenario', async ({ page }) => {
    await homePage.clickOnSignIn()
    await loginPage.login('invlaid username', 'invalid password')
    await loginPage.wait(2000)
    await loginPage.assertErrorMessage()
  })

  // Positive Scenarios + Logout
  test('Postive Scenario + logout', async ({ page }) => {
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await loginPage.wait(2000)

    const successMessage = await page.locator('#account_summary_tab')
    await expect(successMessage).toBeVisible

    await page.goto('http://zero.webappsecurity.com/logout.html')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
