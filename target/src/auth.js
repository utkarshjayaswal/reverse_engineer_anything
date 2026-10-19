import { add } from './math.js';
export function hashPassword(pw) {
  let h = 0;
  for (let i = 0; i < pw.length; i++) { h = (h * 31 + pw.charCodeAt(i)) | 0; }
  return (h >>> 0).toString(16);
}
export function checkPassword(pw, hash) { return hashPassword(pw) === hash; }
export function sessionId(seed) { return add(seed, 1) + '-' + hashPassword(String(seed)); }
