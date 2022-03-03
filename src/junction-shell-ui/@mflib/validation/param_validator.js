import { ValueValidator } from './value_validator';
import { ValidatorBase } from './validator_base';

export class ParamValidatorBuilder extends ValidatorBase {
  constructor(throws) {
    super(throws);
  }

  /**
   * Validate a required parameter
   * @param {*} value The value to validate. Cannot be null or undefined
   * @param {string} name The name of the parameter
   * @returns {ParamValidator}
   */
  require(value, name = null) {
    if (value == null) {
      return this.fail('Parameter ' + (name ? `'${name}' ` : '') + 'invalid: Provided value is null');
    }
    return new ParamValidator(this._throws, value, name);
  }

  /**
   * Validate an optional parameter. Specific assertions about a non-null
   * value are ignored if the input is null
   * @param {*} value The value to validate. May be null or undefined
   * @param {string} name The name of the parameter
   * @returns {ParamValidator}
   */
  allow(value, name = null) {
    return new ParamValidator(this._throws, value, name, (value == null));
  }

  /**
   * Validates that args has at most maxCount elements
   * @param {*} args 
   * @param {*} maxCount 
   */
  count(args, maxCount) {
    if (args.length > maxCount) {
      return this.fail('Unexpected extra arguments');
    }
    return this.ok();
  }

  /**
   * Validate the named parameters are present, and no more. For
   * optional parameters, included a question mark after the name
   * @param {arguments} args An arguments array
   * @param  {...string} names The names of the parameters
   */
  present(args, ...names) {
    let inCount = args.length;
    let expectCount = names.length;
    if (inCount > expectCount) {
      return this.fail('Unexpected extra arguments');
    }
    let l = names.length;
    for (let i = 0; i < l; i++) {
      if (inCount - 1 < i) {
        let name = names[i];
        if (name.endsWith('?')) break;
        return this.fail('Missing required parameter \'' + name + '\'');
      }
    }
    return this.ok();
  }
}

/**
 * A value validator that also knows the value represents a parameter. Differs 
 * from ValueValidator only in the content of error messages
 */
export class ParamValidator extends ValueValidator {

  constructor(throws, value, name = null, valid = false) {
    super(throws, value, valid);
    this._name = name;
  }

  fail(message) {
    return super.fail(this._prefix() + message);
  }

  _prefix() {
    return 'Parameter ' + (this._name == null ? '' : '\'' + this._name + '\' ') + 'invalid: ';
  }
}

/**
 * Validate a value without throwing errors. Value cannot be null or undefined
 * @param {*} value 
 * @returns {ValueValidator}
 */
ValidatorBase.prototype.test = function (value) {
  return (new ParamValidatorBuilder(false)).require(value);
};
