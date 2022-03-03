import { is } from '@/@mflib/reflect';
import $ from 'jquery';
import { Map } from '@/@mflib/collections';
import { isJQueryInstance } from './jquery-ext';

/**
 * Abstract base class for lazy fetched parameters
 */
export class Parameter {
  constructor(name) {
    this._name = name;
    this._type = null;
  }

  /**
   * The name of the parameter
   * @returns {string}
   */
  get name() { return this._name; }
  set name(_) { throw new Error('name is read-only'); }

  /**
   * The type code of the parameter
   * @returns {string}
   */
  get type() { return this._type; }
  set type(_) { throw new Error('type is read-only'); }

  /** Renders the vaue of the Parameter */
  getValue() { return null; }

  static create(source) {
    if (source == null) return null;
    if (source instanceof Parameter) return source;

    if (isJQueryInstance(source)) return new JQueryParameter(name, source);
    if (is(source, Function)) return new FuncParameter(name, source);
    return new ConstParameter(name, source);
  }
}

/**
 * A Parameter with a constant value
 */
export class ConstParameter extends Parameter {

  /**
   * @param {string} name The name of the parameter
   * @param {*} value The value of the parameter
   */
  constructor(name, value) {
    super(name);
    this._value = value;
  }

  get type() { return 'constant'; }

  /**
   * The value of the parameter
   * @returns {*}
   */
  get value() { return this._value; }
  set value(_) { throw new Error('value is read-only'); }

  getValue() { return this._value; }
}

/** A Parameter that renders the value by invoking a jQuery selector and jQuery method on the selected item */
export class JQueryParameter extends Parameter {

  /**
   * @param {string} name The name of the parameter
   * @param {string | JQuery} selector A JQuery selector, or a JQuery instance
   * @param {string} [method] The method name to call. Default 'val'
   * @param {*} [context] The context for a dynamically invoked selector
   */
  constructor(name, selector, method, context) {
    super(name);

    this._method = method || 'val';
    if (isJQueryInstance(selector)) {
      this._source = selector;
    } else {
      this._selector = selector;
      this._context = context;
    }
  }

  get type() { return 'jquery'; }

  /**
   * A JQuery selector
   * @returns {string}
   */
  get selector() { return this._selector; }
  set selector(_) { throw new Error('selector is read-only'); }

  /**
   * The context in which to select
   * @returns {*}
   */
  get context() { return this._context; }
  set context(_) { throw new Error('context is read-only'); }

  /**
   * The JQuery target
   * @returns {JQuery}
   */
  get source() { return this._source; }
  set source(_) { throw new Error('source is read-only'); }

  /**
   * The JQuery method name to use. Defaults to 'val'
   * @returns {string}
   */
  get method() { return this._method; }
  set method(_) { throw new Error('method is read-only'); }

  getValue() {
    let $item;
    if (this._source != null) {
      $item = this._source;
    } else if (this._context != null) {
      $item = $(this._selector, this._context);
    } else {
      $item = $(this._selector);
    }
    return $item[this._method]();
  }
}

/**
 * A Paramter that gets its value by invoking a function
 */
export class FuncParameter extends Parameter {

  /**
   * @param {string} name The name of the parameter
   * @param {Function} fn The function to invoke
   * @param {*} [thisArg] The thisArg for the function
   */
  constructor(name, fn, thisArg) {
    super(name);
    this._fn = fn || FuncParameter._noFunc;
    this._thisArg = thisArg;
  }

  get type() { return 'function'; }

  /**
   * The function to invoke
   * @returns {Function}
   */
  get fn() { return this._fn; }
  set fn(_) { throw new Error('fn is read-only'); }

  /**
   * The thisArg for the function
   * @returns {*}
   */
  get thisArg() { return this._thisArg; }
  set thisArg(_) { throw new Error('thisArg is read-only'); }

  getValue() {
    this._fn.call(this._thisArg);
  }

  static _noFunc() { return null; }
}

/**
 * A case insensitive Map of Parameter items
 */
export class ParameterCollection extends Map {

  /**
   * @param {ParameterCollection} [parent] A parent ParameterCollection whose value will be merged with the current one on getValues()
   */
  constructor(parent) {
    super(null, true, Parameter);
    this._parent = parent;
  }

  /**
   * A parent ParameterCollection whose value will be merged with the current one on getValues()
   * @returns {ParameterCollection}
   */
  get parent() { return this._parent; }
  set parent(_) { throw new Error('parent is read-only'); }

  /** @param {Parameter} param */
  add(param) {
    this.setItem(param.name, param);
    return this;
  }

  /**
   * Add a ConstParameter to the collection with the given name and value
   * @param {string} name The name of the parameter
   * @param {*} value The value of the parameter
   */
  addConst(name, value) {
    this.setItem(name, new ConstParameter(name, value));
    return this;
  }

  /**
   * Add a new FuncParameter to the collection
   * @param {string} name The name of the parameter
   * @param {Function} fn The function to invoke
   * @param {*} [thisArg] The thisArg for the function
   */
  addFunc(name, fn, thisArg) {
    this.setItem(name, new FuncParameter(name, fn, thisArg));
    return this;
  }

  /**
   * Add a new JQuery parameter to the collection
   * @param {string} name The name of the parameter
   * @param {string | JQuery} selector A JQuery selector, or a JQuery instance
   * @param {string} [method] The method name to call. Default 'val'
   * @param {*} [context] The context for a dynamically invoked selector
   */
  addJQuery(name, selector, method, context) {
    this.setItem(name, new JQueryParameter(name, selector, method, context));
    return this;
  }

  /**
   * Render the parameter collection to a plain object or array by calling getValue() on each of the Parameter items
   * @param {boolean} [asArray] If true, items are returned as an array of the values.  
   * Otherwise, items are returned as a javascript object whose keys are the parameter 
   * names and values are the results of calling getValue() on each Parameter.
   */
  getValues(asArray) {
    const keys = this.keys;
    const lng = keys.length;
    const hasParent = this._parent != null;

    if (asArray === true) {
      let arrResult = [];
      if (!hasParent) {
        arrResult = [];
        for (let i = 0; i < lng; i++) {
          let item = this.getItem(keys[i]);
          arrResult.push(item.getValue());
        }
      } else {
        throw new Error('Merging with parent values not supported for array result');
      }
      return arrResult;
    } else {
      // Merge the object results of the parent with the current collection
      let result = new Map(true);

      // Initialize casing of keys based on child, not parent
      for (let i = 0; i < lng; i++) {
        result.setItem(keys[i], undefined);
      }

      if (hasParent) {
        let parentVals = this.parent.getValues();
        for (var k in parentVals) {
          result.setItem(k, parentVals[k]);
        }
      }

      for (let i = 0; i < lng; i++) {
        let item = this.getItem(keys[i]);
        result.setItem(item.name, item.getValue());
      }

      return result.toObject();
    }
  }
}