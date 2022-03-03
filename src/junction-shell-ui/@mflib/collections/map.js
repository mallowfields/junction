import { Validator } from '/@mflib/validation';
import { removeItem } from './collection_funcs';
import { is } from '/@mflib/reflect';

const v = new Validator(true);
const pv = v.params;

/**
 * Map is a basic string-keyed map class that can use case-insensitive key comparison 
 * (or not), and can enforce the type of the elements (or not)
 */
export class Map {

  /**
   * Create a new Map
   * @param {object} source A source object from which to copy properties
   * @param {boolean} ignoreCase Whether key comparison is case-insensitive
   * @param {Function} elementType The class or class function of the element type
   */
  constructor(source, ignoreCase, elementType) {
    pv.present(arguments, 'source', 'ignoreCase', 'elementType');
    pv.allow(ignoreCase).isBool();
    pv.allow(this._elementType = elementType || null).isFunction();

    this._ignoreCase = (ignoreCase === true);
    this._typeFiltered = (this._elementType != null);

    this._map = {};
    this._keyMap = {};
    this._keys = [];
    this._count = 0;

    if (source != null) {
      for (let k in source) {
        this.set(k, source[k]);
      }
    }
  }

  /**
   * Set the value for a key
   * @param {string} key The string key
   * @param {*} value The value
   */
  set(key, value) {
    if (this._typeFiltered) {
      if (!is(value, this._elementType)) {
        throw new Error('value is not of type ' + this._elementType.name);
      }
    }

    key = String(key);
    let useKey = (this._ignoreCase) ? key.toLowerCase() : key;
    if (!this._map.hasOwnProperty(useKey)) {
      this._keys.push(key);
      this._count += 1;
    } else if (this._ignoreCase) {
      let existingKey = this._keyMap[useKey];
      // Casing of key has changed. Replace the existing item in the keys array
      if (existingKey !== key) {
        let ix = this._keys.indexOf(existingKey);
        this._keys[ix] = key;
      }
    }

    this._map[useKey] = value;
    this._keyMap[useKey] = key;
  }

  /**
   * Get the value for a key. Returns undefined if the key does not exist 
   * @param {string} key The string key
   * @returns {*}
   */
  get(key) {
    key = String(key);
    let useKey = (this._ignoreCase) ? key.toLowerCase() : key;
    return this._map[useKey];
  }

  /**
   * Check whether the key exists
   * @param {string} key The string key
   * @returns {boolean}
   */
  containsKey(key) {
    key = String(key);
    let useKey = (this._ignoreCase) ? key.toLowerCase() : key;
    return this._map.hasOwnProperty(useKey);
  }

  /**
   * Remove an item for a key. Returns true if the key was removed, false if they key did not exist
   * @param {string} key 
   * @returns {boolean}
   */
  remove(key) {
    key = String(key);
    let useKey = (this._ignoreCase) ? key.toLowerCase() : key;
    let exists = this._map.hasOwnProperty(useKey);
    if (exists) {
      let originalKey = this._keyMap[useKey];
      delete this._map[useKey];
      delete this._keyMap[useKey];
      removeItem(this._keys, originalKey);
      this._count -= 1;
    }
    return exists;
  }

  /**
   * Remove all instances of an item by value. Strict equality is used. Returns true if one or more items was removed, false if the item was not found
   * @param {*} item 
   * @returns {boolean}
   */
  removeItem(item) {
    if (this._count == 0) return false;

    let removed = false;

    // Use a copy of keys so that this.remove
    // does not mutate it
    let keys = this._keys.concat();

    // Iterate keys, use this.remove so key updates work as intended
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      let l_item = this.get(k);
      if (l_item === item) {
        this.remove(k);
        removed = true;
      }
    }

    return removed;
  }

  /**
   * Clear all items from the Map
   */
  clear() {
    this._map = {};
    this._keyMap = {};
    this._keys = [];
    this._count = 0;
  }

  /**
   * Get the defined keys and values in the form of a plain javascript object
   * @returns {object}
   */
  toObject() {
    let lng = this._keys.length;
    let result = {};
    for (let i = 0; i < lng; i++) {
      let key = this._keys[i];
      let useKey = (this._ignoreCase) ? key.toLowerCase() : key;
      result[key] = this._map[useKey];
    }
    return result;
  }

  /**
   * The count of defined items in the set
   * @returns {number}
   */
  get count() { return this._count; }
  set count(_) { throw new Error('count is read-only'); }

  /**
   * Whether the set enforces the type of the element values
   * @returns {boolean}
   */
  get typeFiltered() { return this._typeFiltered; }
  set typeFiltered(_) { throw new Error('typeFiltered is read-only'); }

  /**
   * The class or class function of the element type
   * @returns {Function}
   */
  get elementType() { return this._elementType; }
  set elementType(_) { throw new Error('elementType is read-only'); }

  /**
   * Whether key comparison is case-insensitive
   * @returns {boolean}
   */
  get ignoreCase() { return this._ignoreCase; }
  set ignoreCase(_) { throw new Error('ignoreCase is read-only'); }

  /**
   * The defined keys in the set, in the original case used when they 
   * were first defined, and in the original order in which they were defined
   * @returns {Array<string>}
   */
  get keys() { return this._keys.concat(); }
  set keys(_) { throw new Error('keys is read-only'); }

  /**
   * The defined values in the set, in the original order in which they were first defined 
   * @returns {Array}
   */
  get values() {
    let result = [];
    for (let i = 0; i < this._count; i++) {
      let key = this._keys[i];
      if (this._ignoreCase) { key = key.toLowerCase(); }
      result.push(this._map[key]);
    }
    return result;
  }

  set values(_) { throw new Error('values is read-only'); }


  /**
   * Create a new empty Map 
   * @param {boolean} [ignoreCase] Whether key comparison is case-insensitive
   * @param {Function} [elementType] The class or class function of the element type
   * @returns {Map}
   */
  static new(ignoreCase, elementType) {
    return new Map(null, ignoreCase, elementType || null);
  }

  /**
   * Create a new Map initialized with the properties of a source object
   * @param {object} source A source object from which to copy properties
   * @param {boolean} [ignoreCase] Whether key comparison is case-insensitive
   * @param {Function} [elementType] The class or class function of the element type
   * @returns {Map}
   */
  static fromObject(source, ignoreCase, elementType) {
    if (source == null) throw new Error('source cannot be null');
    return new Map(source, ignoreCase, elementType || null);
  }

}