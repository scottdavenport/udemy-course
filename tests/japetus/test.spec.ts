import { test, expect } from '@playwright/test'

test.describe('Japetus Login', () => {
  test('Successful Login', async ({ page }) => {
    await page.goto('https://app.japet.us')
    await page.click('.login-button')
    // await page.click('text="Continue with Google"')
    await page.type('#username', 'support@japet.us')
    await page.click('#login-submit')
    await page.type('#password', 'XGW*rqa8tje1nmx2kpq')
    await page.click('#login-submit')
    await page.click('button[type="submit"]')
    await page.click('text="Go to My Issues"')
  })
})
