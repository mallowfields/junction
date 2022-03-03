
// Private function to implement removeItem and removeAll
function fn_remove(collection, item, all) {
  if (collection == null || 'object' != typeof collection) return false;
  
  all = (all == true);
  let removed = false;
  if (collection instanceof Array) {
    let array = collection;
    let ix = -1;
    while ((ix = array.indexOf(item)) > -1) {
      array.splice(ix, 1);
      removed = true;
      if (!all) break;
    }
  } else {
    for (let k in collection) {
      if (collection[k] === item) {
        delete collection[k];
        removed = true;
        if (!all) break;
      }
    }
  }

  return removed;
}

/**
 * Remove the first occurrence of an item from an collection. Returns a boolean indicating whether the item was removed.
 * @param {Array | object} collection 
 * @param {*} item The item to remove
 * @returns {boolean}
 */
export function removeItem(collection, item) {
  return fn_remove(collection, item, false);
}

/**
 * Removes all occurrences of an item from a collection. Returns a boolean indicating whether at least one item was removed.
 * @param {Array | object} collection 
 * @param {*} item The item to remove.
 * @returns {boolean}
 */
export function removeAll(collection, item) {
  return fn_remove(collection, item, true);
}