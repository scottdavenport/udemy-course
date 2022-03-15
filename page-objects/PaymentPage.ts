import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class PaymentPage extends AbstractPage {
  // readonly page: Page
  readonly payeeSelectBox: Locator
  readonly payeeDetailButton: Locator
  readonly payeeDetails: Locator
  readonly amountInput: Locator
  readonly dateInput: Locator
  readonly descriptionInput: Locator
  readonly payButton: Locator
  readonly alertContent: Locator

  constructor(page: Page) {
    // this.page = page
    super(page)
    this.payeeSelectBox = page.locator('#sp_payee')
    this.payeeDetailButton = page.locator('#sp_get_payee_details')
    this.payeeDetails = page.locator('#sp_payee_details')
    this.amountInput = page.locator('#sp_amount')
    this.dateInput = page.locator('#sp_date')
    this.descriptionInput = page.locator('#sp_description')
    this.payButton = page.locator('#pay_saved_payees')
    this.alertContent = page.locator('#alert_content > span')
  }

  async createPayment() {
    await this.payeeSelectBox.selectOption('bofa')
    await this.payeeDetailButton.click()
    await expect(this.payeeDetails).toBeVisible()
    await this.amountInput.type('100')
    await this.dateInput.type('2022-10-10')
    await this.descriptionInput.type('Payment for dinner')
    await this.payButton.click()
  }

  async checkSuccessMessage() {
    await expect(this.alertContent).toBeVisible()
    await expect(this.alertContent).toHaveText(
      'The payment was successfully submitted.'
    )
  }

  async goToPaymentPage() {
    await this.page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
  }
}
