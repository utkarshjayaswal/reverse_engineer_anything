export function lineTotal(qty, price) { return qty * price; }
export function cartTotal(items, discountPct = 0) {
  const sum = items.reduce((acc, it) => acc + lineTotal(it.qty, it.price), 0);
  return sum * (1 - discountPct / 100);
}
