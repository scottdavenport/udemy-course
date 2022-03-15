import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class CurrencyExchange extends AbstractPage {
  // readonly page: Page
  readonly currencyExchange: Locator
  readonly sellRate: Locator
  readonly amountInput: Locator
  readonly inDollars: Locator
  readonly calculateButton: Locator
  readonly conversionAmount: Locator
  readonly purchaseButton: Locator
  readonly alertContent: Locator

  constructor(page: Page) {
    //this.page = page
    super(page)
    this.currencyExchange = page.locator('#pc_currency')
    this.sellRate = page.locator('#sp_sell_rate')
    this.amountInput = page.locator('#pc_amount')
    this.inDollars = page.locator('#pc_inDollars_true')
    this.calculateButton = page.locator('#pc_calculate_costs')
    this.conversionAmount = page.locator('#pc_conversion_amount')
    this.purchaseButton = page.locator('#purchase_cash')
    this.alertContent = page.locator('#alert_content')
  }

  async fillForm(currency: string, amount: string) {
    await this.currencyExchange.type(currency)
    await this.amountInput.type(amount.toString())
  }

  async checkSellRate() {
    await this.page.waitForSelector('#sp_sell_rate')
  }

  async clickOnInDollars() {
    await this.inDollars.click()
  }

  async clickOnCalculate() {
    await this.calculateButton.click()
  }
  async checkConversionAmount() {
    await this.page.waitForSelector('#pc_conversion_amount')
  }

  async clickOnPurchaseButton() {
    await this.purchaseButton.click()
  }

  async checkAlertContent() {
    await expect(this.alertContent).toBeVisible()
    await expect(this.alertContent).toHaveText(
      'Foreign currency cash was successfully purchased.'
    )
  }
}
