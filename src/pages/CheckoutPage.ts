import { type Locator, type Page, expect } from '@playwright/test';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface PriceSummary {
  itemTotal: string;
  tax: string;
  total: string;
}

/** Covers the three checkout screens: Your Information, Overview, Complete. */
export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(private readonly page: Page) {
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.subtotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
    this.completeHeader = page.getByTestId('complete-header');
    this.backHomeButton = page.getByTestId('back-to-products');
  }

  async expectInformationStep() {
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(this.firstName).toBeVisible();
  }

  async fillInformation(info: CustomerInfo) {
    await this.firstName.fill(info.firstName);
    await this.lastName.fill(info.lastName);
    await this.postalCode.fill(info.postalCode);
    await this.continueButton.click();
  }

  async expectOverviewStep() {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
  }

  async expectPriceSummary(expected: PriceSummary) {
    await expect(this.subtotal).toHaveText(`Item total: ${expected.itemTotal}`);
    await expect(this.tax).toHaveText(`Tax: ${expected.tax}`);
    await expect(this.total).toHaveText(`Total: ${expected.total}`);
  }

  async finish() {
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  async backHome() {
    await this.backHomeButton.click();
  }
}
