import { isEmpty } from '@/@mflib/str';

/**
 * A base class that an emit events, using underlying DOM event handling
 */
export class Emitter {

  /** 
   * @param {EventTarget} el 
   */
  static isEventTarget(el) {
    return (el != null) &&
      (typeof el.addEventListener === 'function') &&
      (typeof el.removeEventListener === 'function') &&
      (typeof el.dispatchEvent === 'function');
  }

  /**
   * @param {EventTarget} [el] An existing EventTarget to use
   */
  constructor(el) {
    if (el != null && !Emitter.isEventTarget(el)) {
      throw new Error('Provided element is not an EventTarget');
    }

    this._delegate = el || document.createDocumentFragment();
    /** @type {Object.<string,Function[]>} */
    this._eventMap = {};
  }

  /** 
   * Explicitly set the event target
   * @param {EventTarget} el
   */
  setTarget(el) {
    if (el == null) {
      throw new Error('Cannot set target to null');
    } else if (!Emitter.isEventTarget(el)) {
      throw new Error('Provided element is not an EventTarget');
    }

    for (let evt in this._eventMap) {
      if (this._eventMap[evt].length) {
        throw new Error('Cannot change target; handlers already registered for event \'' + evt + '\'');
      }
    }
    this._delegate = el;
  }

  /**
   * Add event handlers
   * @param {string} event The name of one or more events to add
   * @param {Function} fn The event handler to add
   */
  on(event, fn) {
    event = String(event).toLowerCase().trim();
    if (isEmpty(event)) return;

    if (event.indexOf(' ') > 0) {
      const evts = event.split(' ');
      for (let evt of evts) {
        this.on(evt, fn);
      }
      return;
    }

    const arr = this._evtArray(event);
    const wrapped = function (e) {
      if (e && e._args) {
        return fn.call(this, e, ...e._args);
      }
      return fn.call(this, e);
    };
    arr.push({ fn, wrapped });
    this._delegate.addEventListener(event, wrapped);
  }

  /**
   * Remove event handlers
   * @param {string} event The name of one or more events to remove, or '*' to remove all
   * @param {Function} [fn] A specific handler to remove. If ommitted, all handlers for the event are removed
   */
  off(event, fn) {
    event = String(event).toLowerCase().trim();
    if (isEmpty(event)) return;

    if (event.indexOf(' ') > 0) {
      const evts = event.split(' ');
      for (let evt of evts) {
        this.off(evt, fn);
      }
      return;
    }

    if (event === '*') {
      for (let evt in this._eventMap) {
        this.off(evt, fn);
      }
      return;
    }

    const arr = this._evtArray(event);
    if (fn == null) {
      // Remove all handlers
      for (let i = arr.length; i >= 0; i--) {
        this._delegate.removeEventListener(event, arr[i].wrapped);
      }
      arr.splice(0, arr.length);
    } else {
      // Remove specific handlers
      const ix = arr.findIndex(item => item.fn === fn);
      if (ix >= 0) {
        const info = arr[ix];
        this._delegate.removeEventListener(event, info.wrapped);
        arr.splice(ix, 1);
      }
    }
  }

  /**
   * Dispatch an event 
   * @param {Event | string} e An event name, or event object
   * @param {...any} args Additional arguments to provide to the event handler
   */
  dispatch(e, ...args) {
    if (e == null) return;

    if (typeof e === 'string') {
      e = new Event(e);
    }
    e._args = args;
    this._delegate.dispatchEvent(e);
  }

  _evtArray(event) {
    let arr = this._eventMap[event];
    if (arr != null) { return arr; }
    return (this._eventMap[event] = []);
  }
}