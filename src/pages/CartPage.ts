import { type Locator, type Page, expect } from '@playwright/test';

export class CartPage {
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.items = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
  }

  item(productName: string): Locator {
    return this.items.filter({
      has: this.page.getByTestId('inventory-item-name').getByText(productName, { exact: true }),
    });
  }

  async expectItem(productName: string, quantity: number, price: string) {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    const row = this.item(productName);
    await expect(row).toHaveCount(1);
    await expect(row.getByTestId('item-quantity')).toHaveText(String(quantity));
    await expect(row.getByTestId('inventory-item-price')).toHaveText(price);
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
