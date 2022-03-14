/**
 * Base or root class for validators. Knows whether to throw an exception
 * or set valid to false when validation fails 
 */
export class ValidatorBase {

  /**
   * Construct a new ValidatorBase
   * @param {boolean} throws Whether validation failures throw errors
   */
  constructor(throws = false) {
    this._throws = throws;
    this._valid = true;
  }

  /**
   * Indicate a validation failure. Either returns false or throws
   * an error depending on whether throws is true or false
   * 
   * @param {string} message A descriptive message for the validation failure
   * @returns {ValidatorBase}
   */
  fail(message) {
    if (this._throws) {
      throw new Error(message);
    }
    this._valid = false;
    return this;
  }

  /**
   * Indicate a validation pass.  
   * @returns {ValidatorBase}
   */
  ok() {
    // do NOT set _valid to true. If previous 
    // step failed, don't override that
    return this;
  }

  /**
   * Indicates whether the validation has succeeded or failed
   * @returns {boolean}
   */
  get valid() { return this._valid; }
  set valid(v) { throw new Error('valid is read-only'); }

  /**
   * Whether validation failures throw errors
   * @returns {boolean}
   */
  get throws() { return this._throws; }
  set throws(v) { throw new Error('throws is read-only'); }
}
 