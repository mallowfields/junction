/**
 * Determine whether value is of the specified type. Works for primitive (Number, String), browser (HTMLElement, etc), and javascript function classes
 * @param {*} value 
 * @param {Function} type A class or class function
 * @returns {boolean}
 */
export function is(value, type) {
  if (type == null) throw new Error('type cannot be null');
  if ('function' != typeof type) throw new Error('type must be a class or class function');
  if (value == null) return false;

  if (type === Boolean) return 'boolean' === typeof value;
  if (type === Number) return 'number' === typeof value;
  if (type === BigInt) return 'bigint' === typeof value;
  if (type === String) return 'string' === typeof value;
  if (type === Function) return 'function' === typeof value;
  if (type === Symbol) return 'symbol' === typeof value;

  return value instanceof type;
}
