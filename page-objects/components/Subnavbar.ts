import { Locator, Page } from '@playwright/test'

export class Subnavbar {
  readonly page: Page
  readonly paySavedPayee: Locator
  readonly addNewPayee: Locator
  readonly purchaseForeignCurrency: Locator

  constructor(page: Page) {
    this.page = page
    this.paySavedPayee = page.locator('text=Pay Saved Payee')
    this.addNewPayee = page.locator('text=Add New Payee')
    this.purchaseForeignCurrency = page.locator(
      'text=Purchase Foreign Currency'
    )
  }

  async clickOnTab(tabName) {
    switch (tabName) {
      case 'paySavedPayee':
        await this.paySavedPayee.click()
        break
      case 'addNewPayee':
        await this.addNewPayee.click()
        break
      case 'purchaseForeignCurrency':
        await this.purchaseForeignCurrency.click()
        break
      default:
        throw new Error(`${tabName} is not a valid tab name`)
    }
  }
}
