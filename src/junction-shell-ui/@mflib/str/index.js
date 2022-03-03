const originalToString = Object.prototype.toString;

/**
 * Test if the input argument is null, undefined, an empty string, or only whitespace
 * @param {any} value 
 * @returns {boolean}
 */
export function isEmpty(value) {
  return (value == null) || toString(value).trim().length === 0;
}

/**
 * Returns a string representation of any object, including null, undefined, and objects with no prototype (no built-in toString method).
 * @param {any} value 
 * @returns {string}
 */
export function toString(value) {
  if (value == null) return null;
  if ('string' === typeof value) return value;
  if ('function' === typeof value.toString) return value.toString();
  return originalToString.call(value);
}

/**
 * Return the singular form of a word
 * @param {string} word 
 */
export function singular(word) {
  if (word.endsWith('ies')) {
    return word.substr(0, word.length - 3) + 'y';
  } else if (word.endsWith('s')) {
    return word.substr(0, word.length - 1);
  }
  return word;
}

/**
 * Convert a string to camelCase
 * @param {string} s 
 */
export function toCamel(s) {
  return s[0].toLowerCase() + s.substr(1);
}

/**
 * Convert a string to PascalCase
 * @param {string} s 
 */
export function toPascal(s) {
  return s[0].toUpperCase() + s.substr(1);
}