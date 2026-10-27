const priceFormatter = new Intl.NumberFormat("sk-SK", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formats a selling price the Slovak way, e.g. `4.5` → `4,50 €`.
 * Returns `null` when no price has been supplied, so unpriced drinks can be
 * filtered out of the public menu without ever showing a placeholder.
 */
export function formatPrice(price: number | null): string | null {
  if (price === null || !Number.isFinite(price)) return null;
  return priceFormatter.format(price).replace(/\u00a0/g, " ");
}
