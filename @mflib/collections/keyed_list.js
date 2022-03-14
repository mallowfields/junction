import { is } from '/@mflib/reflect';
import { isEmpty } from '/@mflib/str';

// ------------------------------------------
//  Keyed list
// ------------------------------------------

/**
 * KeyedList is an array-like list of items which is also internally indexed
 * by numeric id property and/or a string key property
 * 
 * @template T
 */
export class KeyedList {

  /**
   * Create a new KeyedList, optionally specifying the name of the item property to use as a string key
   * @param {string} [keyProp] The property name of items to use as the key
   */
  constructor(keyProp = null, ignoreCase = false) {
    this._byID = { noID: [] };
    this._byKey = {};
    this._keys = {};
    this._array = [];
    this._keyProp = keyProp;
    this._ignoreCase = ignoreCase;
  }

  [Symbol.iterator]() {
    return this._array[Symbol.iterator]();
  }

  /**
   * The item property to use as a key, if any
   * @returns {string}
   */
  get keyProp() { return this._keyProp; }
  set keyProp(_) { throw new Error('keyProp is read-only'); }

  /**
   * The count of items in the set
   * @returns {number}
   */
  get length() { return this._array.length; }
  set length(_) { throw new Error('length is read-only'); }

  /**
   * The defined values of the collection
   * @returns {T[]}
   */
  get values() { return this._array.concat(); }
  set values(_) { throw new Error('values is read-only'); }

  /**
   * The defined keys of the collection
   * @returns {string[]}
   */
  get keys() { return Object.values(this._keys); }
  set keys(_) { throw new Error('keys is read-only'); }

  /**
   * Whether string key comparison ignores case
   * @returns {boolean}
   */
  get ignoreCase() { return this._ignoreCase; }
  set ignoreCase(_) { throw new Error('ignoreCase is read-only'); }

  /**
   * The defined ids of the collection
   * @returns {number[]}
   */
  get ids() {
    let ids = [];
    for (let id in this._byID) {
      if (id === 'noID') continue;
      ids.push(+id);
    }
    return ids;
  }
  set ids(_) { throw new Error('ids is read-only'); }

  /**
   * Check whether the key, id, or object exists in the set
   * @param {string | number | T} item The string key, number id, or object
   * @returns {boolean}
   */
  contains(item) {
    if (item != null) {
      switch (typeof item) {
        case 'number':
          return item in this._byID;
        case 'string':
          return this._useKey(item) in this._byKey;
        case 'object':
          {
            let id = item.id || item.ID || item.Id;
            let hasID = is(id, Number) && !isNaN(id) && id != 0;
            let idMap = this._byID;

            if (hasID) {
              return id in idMap;
            } else {
              for (let x of idMap.noID) {
                if (x.item === item) {
                  return true;
                }
              }
            }
            return false;
          }
      }
    }
    throw new Error('item must be a number, string, or object');
  }

  /**
   * Get an item by key or id
   * @param {string | number} key 
   * @returns {T}
   */
  get(key) {
    let itemHandle = null;
    switch (typeof key) {
      case 'number':
        itemHandle = this._byID[key];
        break;
      case 'string':
        itemHandle = this._byKey[this._useKey(key)];
        break;
      default:
        throw new Error('key must be a number or string');
    }

    if (!itemHandle) return null;
    return itemHandle.item;
  }

  /**
   * Add one or more items to the set
   * @param  {...T} items
   * @returns {number} The new count of items in the set
   */
  push(...items) {
    for (let item of items) {
      this.add(item);
    }
    return this.length;
  }

  /**
   * Add an item to the set, optionally specifying a string key
   * @param {T} item 
   * @param {string} [key] A unique string key for the item
   */
  add(item, key) {
    let id = item.id || item.ID || item.Id;
    let hasID = is(id, Number) && !isNaN(id) && id != 0;

    let idMap = this._byID;

    let inSet = false;
    if (hasID) {
      inSet = id in idMap;
    } else {
      for (let x of idMap.noID) {
        if (x.item === item) {
          inSet = true;
          break;
        }
      }
    }

    if (!inSet) {
      this._array.push(item);

      let itemHandle = { item: item };
      if (hasID) {
        idMap[id] = itemHandle;
      } else {
        idMap.noID.push(itemHandle);
      }

      if (isEmpty(key) && !isEmpty(this._keyProp)) {
        key = item[this._keyProp];
      }

      if (!isEmpty(key)) {
        let useKey = this._useKey(key);
        this._byKey[useKey] = itemHandle;
        this._keys[useKey] = key;
        itemHandle.key = key;
      }
    }
  }

  /**
   * Remove an item from the set
   * @param {T|string|number} item The item, or the number id, or the string key
   */
  remove(item) {
    switch (typeof item) {
      case 'number':
      case 'string':
        item = this.get(item);
        break;
    }
    if (item == null) return;
    this._remove(item);
  }

  /**
   * Clear all items from the set
   */
  clear() {
    this._array = [];
    this._byKey = {};
    this._keys = {};
    this._byID = { noID: [] };
  }

  _useKey(key) {
    if (this._ignoreCase && 'string' === typeof key) {
      return key.toLowerCase();
    }
    return key;
  }

  _remove(item) {
    if (this._array.length == 0) return;

    let id = item.id || item.ID || item.Id;
    let hasID = is(id, Number) && !isNaN(id) && id != 0;

    let idMap = this._byID;
    let inSet = false;
    let itemHandle = null;
    let handleIndex = 0;

    if (hasID) {
      inSet = ((itemHandle = idMap[id]) != null);
    } else {
      for (let i = 0; i < idMap.noID.length; i++) {
        let handle = idMap.noID[i];
        if (handle.item === item) {
          itemHandle = handle;
          handleIndex = i;
          inSet = true;
          break;
        }
      }
    }

    if (inSet) {
      this._array.splice(this._array.indexOf(item), 1);

      if (hasID) {
        delete idMap[id];
      } else {
        idMap.noID.splice(handleIndex, 1);
      }

      let key = itemHandle.key;
      if (!isEmpty(key)) {
        let useKey = this._useKey(key);
        delete this._byKey[useKey];
        delete this._keys[useKey];
      }
    }
  }
}
