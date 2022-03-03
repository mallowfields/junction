import { ValidatorBase } from './validator_base';

/**
 * Static utility for validating options objects
 */
export class OptionsValidator extends ValidatorBase {

  constructor(throws) {
    super(throws);
  }

  /** 
   * Validate that source contains only the provided property names
   * @param {object} source A plain object from which to get properties
   * @param {...string} names The names of allowed properties
   * @returns {OptionsValidator}
   */
  only(source, ...names) {
    let nameMap = {};
    for (let i in names) {
      nameMap[names[i]] = true;
    }
    for (let k in source) {
      if (!nameMap[k]) {
        return this.fail(`Extra options member ${k}`);
      }
    }
    return this.ok();
  }

} 