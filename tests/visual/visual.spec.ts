import { test, expect } from '@playwright/test'

test.describe.only('Visual Regression Testing', () => {
  test('Full Page Snapshot', async ({ page }) => {
    await page.goto('https://www.example.com')
    expect(await page.screenshot()).toMatchSnapshot('homepage.png')
  })

  test('Single Element Snapshot', async ({ page }) => {
    await page.goto('https://www.example.com')
    const element = await page.$('h1')
    expect(await element.screenshot()).toMatchSnapshot('page-title.png')
  })
})
