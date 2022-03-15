import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe('feedback form', async () => {
  let homePage: HomePage
  let feedbackPage: FeedbackPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)

    await homePage.visit()
    await homePage.clickOnFeedback()
  })

  // Reset feedback form
  test('reset feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'Scottie',
      'scott@davco.com',
      'Feedback for you',
      'This is a test comment'
    )
    await feedbackPage.clickResetButton()
    await feedbackPage.checkFeedbackTitle()
  })
  // Submit feedback form
  test('submit feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'Scottie',
      'scott@davco.com',
      'Feedback for you',
      'This is a test comment'
    )
    await feedbackPage.submitForm()
    await feedbackPage.feedbackFormSent()
  })
})
