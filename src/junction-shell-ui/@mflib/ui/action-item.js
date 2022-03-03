import { ParameterCollection } from './params';
import { UIItem } from './ui-item';

/** ActionItem is a base class that represents a UIItem with an attached action and parameters */
export class ActionItem extends UIItem {

  /** 
   * @param {HTMLElement | JQuery} el 
   * @param {Function} [fn] A function to call when the item is invoked
   * @param {*} [thisArg] The object to be used as the thisArg when invoking the attached action function
   */
  constructor(el, fn, thisArg) {
    super(el);
    this._fn = fn;
    this._thisArg = thisArg;
  }

  get type() { return 'actionitem'; }

  /**
   * The function that will be called when the item is invoked
   * @returns {Function}
   */
  get fn() { return this._fn; }
  set fn(_) { throw new Error('fn is read-only'); }

  /**
   * The object to be used as the thisArg when invoking the attached action function
   * @returns {*}
   */
  get thisArg() { return this._thisArg; }
  set thisArg(_) { throw new Error('thisArg is read-only'); }

  /**
   * A parameter collection
   * @returns {ParameterCollection}
   */
  get params() { return this._params || (this._params = new ParameterCollection()); }
  set params(_) { throw new Error('params is read-only'); }

  /**
   * Invoke the action attached to this action item
   * @param {Event | JQuery.Event} [e] An event in which the action is being invoked
   */
  invoke(e) {
    if (!this.enabled) return;
    if (this._fn == null) return;
    this._event = e;
    if (this._params && this._params.count > 0) {
      const params = this._params.getValues(true);
      return this._fn.apply(this._thisArg, params);
    } else {
      return this._fn.call(this._thisArg, e);
    }
  }

  /**
   * Set the action callback and thisArg for the ActionItem
   * @param {Function} fn The function to call when the item is invoked
   * @param {*} [thisArg] The object to be used as the thisArg when invoking the attached action function
   */
  setAction(fn, thisArg) {
    this._fn = fn;
    this._thisArg = thisArg;
    return this;
  }
}