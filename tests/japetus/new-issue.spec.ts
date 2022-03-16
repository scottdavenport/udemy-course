import { test, expect } from '@playwright/test'

test.describe.only('Create Issue', () => {
  const loginUrl =
    'https://local.japet.us:3001/login-test-automation?'
  const logoutUrl = 'https://local.japet.us:3001/logout'

  test.beforeEach(async ({ page }) => {
    // Authenticate
    await page.goto(loginUrl)
  })

  test('Create Issue', async ({ page }) => {
    // During initial auth clicking "Go to My Issues" is required
    await page.click('text="Go to My Issues"')

    // Create new issue and fill in form
    await page.click('.pw-new-issue')
    await page.click('.pw-select-project')
    await page.click('.pw-combo-select.pw-10100')
    await page.click('.pw-select-issue-type')
    await page.click('.pw-combo-select.pw-10203')
    await page.click('.pw-select-issue-priority')
    await page.click('pw-combo-select.pw-2')
    await page.pause()
  })

  test.afterEach(async ({ page }) => {
    await page.goto(logoutUrl)
  })
})
