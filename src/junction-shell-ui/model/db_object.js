// eslint-disable-next-line no-unused-vars
import { Loader } from './loader';
import { toPascal, isEmpty } from '/@mflib/str';

/**
 * Base class for models loaded from a data store
 * 
 * @property {boolean} loaded Whether or not the data for the instance has been loaded
 * @property {string} id The string primary key of the record in the data store
 */
export class DbObject {
  constructor() {
    this.loaded = false;
    this.id = '';

    Object.assign(this, Object.getPrototypeOf(this));
  }

  /**
   * Load the data for the instance
   * @param {Loader} loader 
   * @param {*} data 
   */
  load(_loader, data) {
    if (!this.loaded) {
      this.id = data.id;
    }
  }

  toJSON() {
    return Object.assign({}, this);
  }

  static convertName(fieldName) {
    let atName = toPascal(fieldName);
    if (atName.endsWith('ID')) {
      atName = atName.substr(0, atName.length - 2);
    } else if (atName.endsWith('IDs')) {
      atName = atName.substr(0, atName.length - 3);
    }
    return atName;
  }
}