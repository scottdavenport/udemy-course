import { test, expect } from '@playwright/test'

test.describe('Create Issue', () => {
  const baseUrl = 'https://app.japet.us'

  test.beforeEach(async () => {
    // Authenticate
  })

  test('Create Issue', async ({ page }) => {
    await page.goto(baseUrl)
    // During initial auth clicking "Go to My Issues" is required
    await page.click('text="Go to My Issues"')

    // Create new issue and fill in form
    await page.click('text="New Issue"')
    await page.type('input[placeholder="Issue title"]', 'Test Issue')
    await page.type('text="Add a description..."', 'Test Issue Description')

    // Select Project, Type, Priority, and Assignee from dropdown
    await page.selectOption('text="Select a project..."', 'text="Japetus"')
  })
})
