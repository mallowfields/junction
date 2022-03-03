import { ActionItem } from './action-item';

/**
 * An action item with a click handler. If the target element is an anchor (a) element, onClick calls preventDefault.
 */
export class Button extends ActionItem {

  /** 
  * @param {HTMLElement | JQuery} el 
  * @param {Function} [fn] A function to call when the item is invoked
  * @param {*} [thisArg] The object to be used as the thisArg when invoking the attached action function
  */
  constructor(el, fn, thisArg) {
    super(el, fn, thisArg);

    this.stopPropagation = false;
    this.stopImmediatePropagation = false;
    this.preventDefault = false;

    this._init();
  }

  get type() { return 'button'; }

  _init() {
    let target = this._$el[0];
    if (target != null && target.onclick != null) {
      this._extractOnClick();
    }
    this._$el.on('click', this._click.bind(this));
  }

  /** @param {MouseEvent} e */
  _click(e) {
    if (this.preventDefault || this.tagName === 'a') e.preventDefault();
    if (this.stopPropagation) e.stopPropagation();
    if (this.stopImmediatePropagation) e.stopImmediatePropagation();
    this.invoke(e);
  }

  /** @param {HTMLElement} el */
  _extractOnClick(el) {
    const hardCodedOnClick = el.onclick;
    if (this._fn == null) {
      // If no action was passed in, simply assign the hard coded onclick function 
      this._action = hardCodedOnClick;
      this._thisArg = el;
    } else {
      // If an explicit action was also passed in, the wrap it 
      // in a function that first calls the hard coded onclick handler,
      // and then calls the action function
      const fn = this._fn;
      const me = this;
      this._fn = function (...args) {
        hardCodedOnClick.call(el, me._event);
        fn.call(me._thisArg, ...args);
      };
    }
  }
}