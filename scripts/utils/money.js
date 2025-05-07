export function formatCurrency(priceCents){
  return priceCents >= 0 ? (Math.round(priceCents) / 100).toFixed(2) : priceCents = (0).toFixed(2);
}