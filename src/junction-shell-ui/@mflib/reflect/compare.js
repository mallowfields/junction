
/**
 * Creates a comparer function for sorting objects by a given property name
 * @param {string} name The name of the property to compare
 * @returns {(any,any)=>number} A comparer function
 */
export function compareProp(name) {
  return (a, b) => {
    if (a == null && b == null) return 0; // Both null => equal
    if (a == null) return -1; // Null is 'less' than not null
    if (b == null) return 1;  // Not null is 'more' than null
    const aProp = a[name];
    const bProp = b[name];
    if (aProp == bProp) return 0;
    return aProp < bProp ? -1 : 1;
  };
}

/**
 * Creates a comparer function for sorting objects by a given property name
 * @param {(any) => any} fn A function that gets a value from the input element
 * @returns {(any,any)=>number} A comparer function
 */
export function compareFn(fn) {
  return (a, b) => {
    if (a == null && b == null) return 0; // Both null => equal
    if (a == null) return -1; // Null is 'less' than not null
    if (b == null) return 1;  // Not null is 'more' than null
    const aProp = fn(a);
    const bProp = fn(b);
    if (aProp == bProp) return 0;
    return aProp < bProp ? -1 : 1;
  };
} 
