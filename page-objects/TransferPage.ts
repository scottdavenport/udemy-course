import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class TransferPage extends AbstractPage {
  // readonly page: Page
  readonly accountFrom: Locator
  readonly accountTo: Locator
  readonly amountInput: Locator
  readonly descriptionInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    // this.page = page
    super(page)
    this.accountFrom = page.locator('#tf_fromAccountId')
    this.accountTo = page.locator('#tf_toAccountId')
    this.amountInput = page.locator('#tf_amount')
    this.descriptionInput = page.locator('#tf_description')
    this.submitButton = page.locator('#btn_submit')
  }

  async goToTransferPage() {
    await this.page.goto(
      'http://zero.webappsecurity.com/bank/transfer-funds.html'
    )
  }

  async fillForm(
    fromAccount: string,
    toAccount: string,
    amount: string,
    description: string
  ) {
    await this.accountFrom.selectOption(fromAccount)
    await this.accountTo.selectOption(toAccount)
    await this.amountInput.type(amount)
    await this.descriptionInput.type(description)
  }

  async submitForm() {
    await this.submitButton.click()
  }

  async verifyTransfer() {
    const boardHeader = await this.page.locator('h2.board-header')
    await expect(boardHeader).toContainText('Verify')
    await this.page.click('#btn_submit')
  }

  async verifyTransferSuccess() {
    const message = await this.page.locator('.alert-success')
    await expect(message).toContainText(
      'You successfully submitted your transaction.'
    )
  }
}
