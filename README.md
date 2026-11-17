# SauceDemo Playwright Automation

Playwright + TypeScript UI automation for https://www.saucedemo.com, traced to Azure DevOps test cases in `Practice-mohan/Practice-claude`.

## Structure

```
src/pages/          Page Objects (LoginPage, InventoryPage, CartPage, CheckoutPage)
src/fixtures/       Custom fixtures that inject page objects into tests
test-data/          Test data per ADO test case (parameters + data rows)
tests/e2e/          Specs, one test.step per ADO test step
azure-pipelines.yml CI: run tests, publish JUnit results + HTML report
```

## ADO traceability

| ADO Test Case | Spec | Tag |
|---|---|---|
| [39](https://dev.azure.com/Practice-mohan/Practice-claude/_workitems/edit/39) - E2E checkout (data-driven) | `tests/e2e/checkout.spec.ts` | `@TC39` |

Each ADO data row (`@username`, `@password`, `@firstName`, `@lastName`, `@postalCode`) becomes its own test.

## Run

```bash
npm ci
npx playwright install
npm test              # all tests
npm run test:tc39     # only ADO TC 39
npm run test:headed   # watch the browser
npm run report        # open HTML report
```

`BASE_URL` overrides the target environment (default `https://www.saucedemo.com`).
