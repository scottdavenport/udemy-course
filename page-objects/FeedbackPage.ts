import { expect, Locator, Page } from '@playwright/test'

export class FeedbackPage {
  // this is the page object for the feedback page.
  // These are the things found on the page.
  readonly page: Page
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly subjectInput: Locator
  readonly commentInput: Locator
  readonly resetButton: Locator
  readonly submitButton: Locator
  readonly feedbackTitle: Locator

  // This is the constructor for the page object.
  // It takes the page object as a parameter.
  constructor(page: Page) {
    this.page = page
    this.nameInput = page.locator('#name')
    this.emailInput = page.locator('#email')
    this.subjectInput = page.locator('#subject')
    this.commentInput = page.locator('#comment')
    this.resetButton = page.locator('input[name="clear"]')
    this.submitButton = page.locator('input[type="submit"]')
    this.feedbackTitle = page.locator('#feedback-title')
  }

  async fillForm(
    name: string,
    email: string,
    subject: string,
    comment: string
  ) {
    await this.nameInput.type(name)
    await this.emailInput.type(email)
    await this.subjectInput.type(subject)
    await this.commentInput.type(comment)
  }

  async clickResetButton() {
    await this.resetButton.click()
  }

  async submitForm() {
    await this.submitButton.click()
  }

  async checkFeedbackTitle() {
    await expect(this.nameInput).toBeEmpty()
    await expect(this.commentInput).toBeEmpty()
  }

  async feedbackFormSent() {
    await expect(this.feedbackTitle).toBeVisible()
  }
}
