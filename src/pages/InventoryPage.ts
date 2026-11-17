import { type Locator, type Page, expect } from '@playwright/test';
import { toSlug } from './utils';

export class InventoryPage {
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.title).toHaveText('Products');
  }

  addToCartButton(productName: string): Locator {
    return this.page.getByTestId(`add-to-cart-${toSlug(productName)}`);
  }

  removeButton(productName: string): Locator {
    return this.page.getByTestId(`remove-${toSlug(productName)}`);
  }

  async addToCart(productName: string) {
    await this.addToCartButton(productName).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
