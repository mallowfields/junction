import { ValidatorBase } from './validator_base';
import * as reflect from '/@mflib/reflect';

/**
 * Intermediate class for creating value validators for either required
 * or optional values
 */
export class ValueValidatorBuilder extends ValidatorBase {
  constructor(throws) {
    super(throws);
  }

  /**
   * Validate a required value
   * @param {*} value The value to validate. Cannot be null or undefined
   * @returns {ValueValidator}
   */
  require(value) {
    if (value == null) {
      return this.fail('Provided value is null');
    }
    return new ValueValidator(this._throws, value);
  }

  /**
   * Validate an optional value. Specific assertions about a non-null
   * values are ignored if the input is null
   * @param {*} value The value to validate. May be null or undefined
   * @returns {ValueValidator}
   */
  allow(value) {
    return new ValueValidator(this._throws, value, (value == null));
  }
}

/**
 * A validator for values
 */
export class ValueValidator extends ValidatorBase {
  constructor(throws, value, valid = false) {
    super(throws);
    this._value = value;
    this._alwaysValid = valid;
  }

  /**
   * The value being validated
   */
  get value() { return this._value; }
  set value(v) { throw new Error('value is read-only'); }

  /**
   * Validates that the value is a string
   * @returns {ValueValidator}
   */
  isString() {
    if (this._alwaysValid) return this.ok();
    if ('string' !== typeof this._value) {
      return this.fail('Value is not a string');
    }
    return this.ok();
  }

  /**
   * Validates that the value is a boolean
   * @returns {ValueValidator}
   */
  isBool() {
    if (this._alwaysValid) return this.ok();
    if ('boolean' !== typeof this._value) {
      return this.fail('Value is not a boolean');
    }
    return this.ok();
  }

  /**
   * Validates that the value is a number
   * @returns {ValueValidator}
   */
  isNumber() {
    if (this._alwaysValid) return this.ok();
    if ('number' !== typeof this._value) {
      return this.fail('Value is not a number');
    }
    return this.ok();
  }

  /**
   * Validates that the value is a value or instance of the provided class. 
   * Works for both object (class) and non-object types
   * @param {Function} klass A class or class function
   * @returns {ValueValidator}
   */
  is(type) {
    if (this._alwaysValid) return this.ok();
    if (!reflect.is(this._value, type)) {
      return this.fail('Value is not a value of type ' + type.name);
    }
    return this.ok();
  }

  /**
   * Validates that the value is an instance of the provided class. 
   * Can safely handle non-object values, unlike the instanceof operator
   * @param {Function} klass A class or class function
   * @returns {ValueValidator}
   */
  isInstanceOf(klass) {
    if (this._alwaysValid) return this.ok();
    if ('object' !== typeof this._value) {
      return this.fail('Value is not an object');
    }
    if (!(this._value instanceof klass)) {
      return this.fail('Value is not a instance of class ' + klass.name);
    }
    return this.ok();
  }

  /**
   * Validates that the value is a function
   * @returns {ValueValidator}
   */
  isFunction() {
    if (this._alwaysValid) return this.ok();
    if ('function' === typeof this._value) return this.ok();
    return this.fail('Value is not a function');
  }

  /**
   * Validates that the value is a plain object
   */
  isPlainObject() {
    if (this._alwaysValid) return this.ok();
    if ('object' !== typeof this._value) {
      return this.fail('Value is not an object');
    }
    if ('Object' !== this._value.constructor.name) {
      return this.fail('Value is a ' + this._value.constructor.name + ', not a plain object');
    }
    return this.ok();
  }

  /**
   * Validates that the value is not an empty string, array, or map (object)
   * @returns {ValueValidator}
   */
  isNotEmpty() {
    if (this._alwaysValid) return this.ok();
    if ('string' === typeof this._value) {
      if (this._value.length == 0) return this.fail('String value is empty');
    } else if ('object' === typeof this._value) {
      for (let _k in this._value) {
        return this.ok();
      }
      return this.fail('Object or array is empty');
    }
    return this.ok();
  }

  /**
   * Validates that the valid is one of the values in the provided set
   * @param {*} allowedValues An array, object, or rest params of individual values
   * @returns {ValueValidator}
   */
  isInSet(allowedValues) {
    if (this._alwaysValid) return this.ok();

    // If there is exactly one argument and it is an object (including an array)
    // then iterate through its values
    if ((arguments.length == 1) && ('object' === typeof allowedValues)) {
      for (let k in allowedValues) {
        if (this._value == allowedValues[k]) return this.ok();
      }
      return this.fail('Value is not in defined list of valid values');
    }

    // Otherwise wrap all the arguments as an array and recurse
    return this.isInSet(Array.from(arguments));
  }
}
