import * as reflect from '/@mflib/reflect';

export class EnumSet extends Array {

  /** 
   * @param {Array} values 
   */
  constructor(values) {
    super();

    this._ids = [];
    this._byCode = {};

    if (values != null) {
      for (let val of values) {
        this.add(val);
      }
    }
  }

  *[Symbol.iterator]() {
    for (let id of this._ids) {
      yield this.get(id);
    }
  }

  /**
   * Add a new item to the enum set
   * @param {*} source
   */
  add(source) {
    let val = new EnumValue(source);
    this._ids.push(val.id);
    this[val.id] = val;
    this._byCode[val.code.toLowerCase()] = val;
    return val;
  }

  push(...items) {
    for (let src of items) {
      this.add(src);
    }
    return this._ids.length;
  }

  /**
   * Get the number value of the provided enum value object, code, or id
   * @param {EnumValue | string | number} source 
   */
  value(source) {
    return (this.get(source) || {}).id;
  }

  /**
  * Get the string name of the provided enum value object, code, or id
  * @param {EnumValue | string | number} source 
  */
  name(source) {
    return (this.get(source) || {}).name;
  }

  /**
  * Get the string code of the provided enum value object, code, or id
  * @param {EnumValue | string | number} source 
  */
  code(source) {
    return (this.get(source) || {}).code;
  }

  /**
    * Get the enum value object from provided enum value object, code, or id
    * @param {EnumValue | string | number} source 
    * @returns {EnumValue}
    */
  get(source) {
    if (reflect.is(source, EnumValue)) {
      return source;
    }
    switch (typeof source) {
      case 'string':
        return this._byCode[source.toLowerCase()];
      case 'number':
        return this[source];
    }
    return undefined;
  }
}

export class EnumValue {

  /** 
   * @param {*} source 
   */
  constructor(source) {
    /**
     * The human-friendly name of the enum value 
     * @type {string} */
    this.name = source.name;

    /**
     * The integer value of the enum
     * @type {number}
     */
    this.id = +source.id;

    /**
     * The constant string code for the enum value
     * @type {string}
     */
    this.code = source.code;

    // Also copy any additional attributes
    for (let prop in source) {
      switch (prop) {
        case 'code':
        case 'name':
        case 'id':
          break;
        default:
          this[prop] = source[prop];
      }
    }
  }

  toJSON() {
    return this.code;
  }
}