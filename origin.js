/** Accept only an HTTPS origin, never a token, URL credentials, path or fragment. */
export function normalizeGateway(input) {
  const value = input.trim();
  let url;
  try { url = new URL(value); } catch { throw new Error('Enter a complete HTTPS gateway address.'); }
  if (url.protocol !== 'https:') throw new Error('The gateway must use HTTPS.');
  if (url.username || url.password || url.search || url.hash) throw new Error('Do not include credentials, query strings or fragments.');
  if (url.pathname !== '/') throw new Error('Use the gateway origin only, without a path.');
  if ((url.hostname === 'localhost' || url.hostname.endsWith('.localhost')) || url.hostname === '127.0.0.1' || url.hostname === '[::1]') throw new Error('Use the private remote gateway, not this device’s loopback address.');
  return url.origin;
}
