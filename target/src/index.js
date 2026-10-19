import { add, factorial } from './math.js';
import { hashPassword, checkPassword } from './auth.js';
import { cartTotal } from './cart.js';
export function main() {
  const h = hashPassword('hunter2');
  return { sum: add(2, 3), fact: factorial(5), ok: checkPassword('hunter2', h), total: cartTotal([{qty:2,price:10}], 10) };
}
