import $ from 'jquery';
import { constants } from './constants';

import { is } from '@/@mflib/reflect';
import { isEmpty, toString } from '@/@mflib/str';
import { isJQueryInstance } from './jquery-ext';

const DISABLED_CLASS = constants.state.disabled;
const DISABLED_ATTR = 'disabled';

const K_EL_NAME = constants.dataKeys.elName;
const K_EL_GUID = constants.dataKeys.elGuid;
const K_UI_ITEM = constants.dataKeys.uiItem;

export class UIItem {

  /**
   * Return an unwrapped HTMLElement
   * @param {HTMLElement | JQuery} src 
   * @returns {HTMLElement}
   */
  static getElement(src) {
    if (src == null) return null;
    if (is(src, HTMLElement)) return src;
    if (isJQueryInstance(src) && (src.length > 0) && is(src[0], HTMLElement)) return src[0];
    return null;
  }

  /**
   * Determine if the target element is enabled
   * @param {JQuery} $el 
   */
  static isEnabled($el) {
    if ($el.hasClass(DISABLED_CLASS)) return false;
    return $el.attr('disabled') !== 'disabled';
  }

  /**
   * Determine if the target element is visible
   * @param {JQuery} $el 
   */
  static isVisible($el) {
    return $el.is(':visible');
  }

  /** Get the name of an element */
  static getName($el) {
    let name = $el.prop('name');
    if (!isEmpty(name)) return name;
    name = $el.data(K_EL_NAME);
    if (!isEmpty(name)) return name;
    return toString($el.data('name'));
  }

  /** 
   * Construct a new UIItem, a generic wrapper for dynamic page elements
   * @param {HTMLElement | JQuery} el A target element or a jQuery object direct handle to the target element 
   */
  constructor(el) {
    if (null != (el = UIItem.getElement(el))) {
      const $el = this._$el = $(el);
      this._id = $el.attr('id');
      this._name = UIItem.getName($el);
      this._guid = $el.data(K_EL_GUID);
      $el.data(K_UI_ITEM, this);
    }
  }

  /**
   * A program-friendly short identifier
   * @returns {string}
   */
  get id() { return this._id; }
  set id(_) { throw new Error('id is read-only'); }

  /**
   * A human-friendly short identifier
   * @returns {string}
   */
  get name() { return this._name; }
  set name(_) { throw new Error('name is read-only'); }

  /**
   * A guaranteed unique identifier
   * @returns {string}
   */
  get guid() { return this._guid; }
  set guid(_) { throw new Error('guid is read-only'); }

  /**
   * A jQuery object direct handle to the target element
   * @returns {JQuery}
   */
  get $el() { return this._$el; }
  set $el(_) { throw new Error('$el is read-only'); }

  /**
   * The item type code
   * @returns {string}
   */
  get type() { return 'uiitem'; }
  set type(_) { throw new Error('type is read-only'); }

  /**
   * The lower case tag name of the underlying element
   * @returns {string}
   */
  get tagName() { return this._$el[0].nodeName.toLowerCase(); }
  set tagName(_) { throw new Error('tagName is read-only'); }

  /**
   * Whether the element is enabled
   * @returns {boolean}
   */
  get enabled() { return UIItem.isEnabled(this.$el); }
  set enabled(v) { this.setEnabled(v); }

  /**
   * Whether the element is visible
   * @returns {boolean}
   */
  get visible() { return this._visible; }
  set visible(v) { if (v) { this.show(); } else (this.hide()); }

  /** Show the element */
  show() {
    this._$el.show();
    return this;
  }

  /** HIde the element */
  hide() {
    this._$el.hide();
    return this;
  }

  /**
   * Enable the element
   * @param {boolean} [show] If true, also call show()
   */
  enable(show) {
    this._$el.removeClass(DISABLED_CLASS);
    this._$el.removeAttr(DISABLED_ATTR);
    if (show === true) this.show();
    return this;
  }

  /**
   * Disable the element
   * @param {boolean} [hide] If true, also call hide()
   */
  disable(hide) {
    this._$el.addClass(DISABLED_CLASS);
    this._$el.attr(DISABLED_ATTR, DISABLED_ATTR);
    if (hide === true) this.hide();
    return this;
  }

  /**
   * Enable or disable the element
   * @param {boolean} enabled New value of enabled
   * @param {boolean} [setVisible] If true, also call show() or hide() 
   */
  setEnabled(enabled, setVisible) {
    return enabled ? this.enable(setVisible) : this.disable(setVisible);
  }
}