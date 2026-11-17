/** "Sauce Labs Backpack" -> "sauce-labs-backpack" (matches SauceDemo data-test ids). */
export const toSlug = (name: string) => name.toLowerCase().trim().replace(/\s+/g, '-');
