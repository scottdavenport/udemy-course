import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from '../helpers'

test('Simple test', async ({ page }) => {
  await page.goto('https://example.com')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test('Clicking on elements @myTag', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html')
  await page.click('#signin_button')
  await page.click('text=Sign in')

  const errorMessage = await page.locator('.alert-error')
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.skip('Selectors', async ({ page }) => {
  // Text
  await page.click('text=some text')

  // CSS Selector
  await page.click('button')
  await page.click('#id')
  await page.click('.class')

  // Visible CSS Selector
  await page.click('.submit-button:visible')

  // Combinations
  await page.click('#username .first')

  // XPath
  await page.click('//button')
})

test.describe('My first test suite', () => {
  test('Working with inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')

    await page.type('#user_login', 'some username')
    await page.type('#user_password', 'some password')

    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test('Assertions @myTag', async ({ page }) => {
    await page.goto('https://example.com/')
    await expect(page).toHaveURL('https://example.com/')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })
})

test.describe.parallel.only('Hooks', () => {
  // Hooks will allow for repetitive actions to be performed before or after a test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/')
  })

  test('Screenshots', async ({ page }) => {
    // 1. load a website
    //await page.goto('https://example.com/')
    // 2. take a screenshot and save to file
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
  })

  test('Single element Screenshot', async ({ page }) => {
    // 1. load a website
    //await page.goto('https://example.com/')
    // 2. take a screenshot of a single element and save to file
    const element = await page.$('h1')
    await element.screenshot({ path: 'single_element_screenshot.png' })
  })
})

test('Custom helpers', async ({ page }) => {
  await loadHomepage(page)
  await assertTitle(page)
})
