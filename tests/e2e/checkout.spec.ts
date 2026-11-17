import { test, expect } from '@fixtures/pages.fixture';
import data from '@data/tc39.checkout.json';

const ADO_TC_URL = `https://dev.azure.com/Practice-mohan/Practice-claude/_workitems/edit/${data.adoTestCaseId}`;
const { product, priceSummary } = data;

test.describe('Checkout - end to end', () => {
  // One test per ADO data row (Microsoft.VSTS.TCM.LocalDataSource)
  for (const row of data.iterations) {
    test(
      `TC${data.adoTestCaseId} - Login, add product to cart and complete checkout [${row.username}]`,
      {
        tag: ['@TC39', '@smoke', '@e2e', '@checkout'],
        annotation: { type: 'ADO Test Case', description: ADO_TC_URL },
      },
      async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await test.step('1. Navigate to SauceDemo', async () => {
          await loginPage.open();
          await loginPage.expectLoaded();
        });

        await test.step('2. Login with valid credentials', async () => {
          await loginPage.login(row.username, row.password);
          await inventoryPage.expectLoaded();
        });

        await test.step(`3. Add "${product.name}" to cart`, async () => {
          await inventoryPage.addToCart(product.name);
          await expect(inventoryPage.removeButton(product.name)).toHaveText('Remove');
          await expect(inventoryPage.cartBadge).toHaveText('1');
        });

        await test.step('4. Open the cart', async () => {
          await inventoryPage.openCart();
          await cartPage.expectItem(product.name, 1, product.price);
        });

        await test.step('5. Click Checkout', async () => {
          await cartPage.checkout();
          await checkoutPage.expectInformationStep();
        });

        await test.step('6. Enter customer information and continue', async () => {
          await checkoutPage.fillInformation(row);
          await checkoutPage.expectOverviewStep();
        });

        await test.step('7. Verify the price summary', async () => {
          await checkoutPage.expectPriceSummary(priceSummary);
        });

        await test.step('8. Finish the order', async () => {
          await checkoutPage.finish();
          await checkoutPage.expectOrderComplete();
          await expect(inventoryPage.cartBadge).toBeHidden();
        });

        await test.step('9. Back to products with an empty cart', async () => {
          await checkoutPage.backHome();
          await inventoryPage.expectLoaded();
          await expect(inventoryPage.cartBadge).toBeHidden();
        });
      },
    );
  }
});
