import { ValueValidatorBuilder } from './value_validator';
import { ParamValidatorBuilder } from './param_validator';
import { OptionsValidator } from './options_validator';

/** A convenient starting point for validation assertions */
export class Validator {

  /**
   * Construct a new Validator
   * @param {boolean} throws Whether validation failures throw errors
   */
  constructor(throws = false) {
    this._throws = throws;
  }

  /**
   * Whether validation failures throw errors
   * @returns {boolean}
   */
  get throws() { return this._throws; }
  set throws(v) { throw new Error('throws is read-only'); }

  /**
   * Validate values, inheriting the throws setting of the parent validator
   * @returns {ValueValidatorBuilder}
   */
  get values() { return new ValueValidatorBuilder(this._throws); }
  set values(v) { throw new Error('values is read-only'); }

  /**
   * Validate parameters, inheriting the throws setting of the parent validator
   * @returns {ParamValidatorBuilder}
   */
  get params() { return new ParamValidatorBuilder(this._throws); }
  set params(v) { throw new Error('params is read-only'); }

  /**
   * Validate options objects, inheriting the throws setting of the parent validator
   * @returns {OptionsValidator}
   */
  get options() { return new OptionsValidator(this._throws); }
  set options(v) { throw new Error('options is read-only'); }

  /**
   * Validate a value without throwing errors, regardless of throws setting.
   * value cannot be null or undefined.
   * @param {*} value 
   * @returns {ValueValidator}
   */
  test(value) {
    return (new ParamValidatorBuilder(false)).require(value);
  }
}
