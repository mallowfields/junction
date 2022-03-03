import { Map, KeyedList } from '/@mflib/collections';
import { isEmpty, singular } from '/@mflib/str';
import { pv } from '.';
import parseISO from 'date-fns/parseISO';

// eslint-disable-next-line no-unused-vars
import { DbObject } from './db_object';
// eslint-disable-next-line no-unused-vars
import { EnumSet, EnumValue } from './enum';

export class Loader {

  /**
   * Create a loader initialized with all model class constructors
   * @returns {Loader}
   */
  static create() {
    // Actual implementation overridden in ./factory.js
    return new Loader();
  }

  constructor() {
    this._ctors = Map.new(true, Function);
    this._keyProps = Map.new(true, String);
    this._enums = Map.new(true, EnumSet);
  }

  /**
   * Register a constructor function
   * @param {function} ctor A class or class function
   * @param {string} [name] The name of the class. If omitted, ctor.name is used 
   * @param {string} [keyProp] The name key property of the class. If omitted, 'code' is used if present on the model prototype
   */
  register(ctor, name, keyProp) {
    pv.present(arguments, 'ctor', 'name?', 'keyProp?');
    pv.require(ctor, 'ctor').isFunction();
    pv.allow(name, 'name').isString().isNotEmpty();
    pv.allow(keyProp, 'keyProp').isString().isNotEmpty();
 
    if (isEmpty(name)) name = ctor.name;
    if (isEmpty(keyProp)) {
      let m = new ctor();
      if ('code' in m) {
        keyProp = 'code';
      }
    }
    this._ctors.set(name, ctor);
    if (!isEmpty(keyProp)) { this._keyProps.set(name, keyProp); }
  }

  /**
   * Register an enum set
   * @param {EnumSet} enumSet 
   * @param {string} [enumName] The name of the class. If omitted, ctor.name is used 
   */
  registerEnum(enumSet, enumName) {
    pv.present(arguments, 'enumSet', 'enumName?');
    pv.require(enumSet, 'enumSet').isInstanceOf(EnumSet);
    pv.allow(enumName, 'enumName').isString().isNotEmpty();

    if (isEmpty(enumName)) enumName =  enumSet.constructor.name.toLowerCase();
    if (enumName.endsWith('set')) {
      enumName = enumName.substr(0, enumName.length - 3);
    }
    this._enums.set(enumName, enumSet);
  }

  /**
   * Convert the input to a Date in UTC timezone
   * @param {string|Date|number} source
   * @returns {Date|null}
   */
  utcDate(source) {
    if (source == null) return null;
    switch (typeof source) {
      case 'string':
        return new Date(parseISO(source).valueOf());
      case 'number':
        return new Date(source);
      case 'object':
        if (source instanceof Date) {
          return new Date(source.valueOf());
        }
    }

    throw new Error('Cannot convert input to a date');
  }

  /**
   * Get the constructor function for the provided raw data object
   * @param {string} type The type name of the model
   * @param {*} data The source data. Must include a type property
   * @returns {function}
   */
  getCtor(type, data) {
    pv.require(data, 'data').is(Object); 
    pv.require(type, 'type').isString().isNotEmpty();

    let ctor = this._ctors.get(type);
    if (ctor == null) {
      throw new Error(`Type '${type}' is not registered`);
    }

    return ctor;
  }

  /** Get the key property name of the given type name */
  getKeyProp(typeName) {
    return this._keyProps.get(typeName) || null;
  }
 
  /**
   * The source data to deserialize
   * @param {string} type The type name of the model
   * @param {*} data The source data. Must include a type property
   * @returns {*} The deserialized model
   */
  load(type, data) {
    if (data == null) return null;
    let ctor = this.getCtor(type, data);
    let model = new ctor();
    model.load(this, data);
    return model;
  }

  /**
   * Deserialize an array of objects
   * @param {string} type The type name of the model
   * @param {Array} arr 
   * @returns {Array} An array of deserialized models
   */
  loadAll(type, arr) {
    if (arr && arr.records) { 
      arr = arr.records;
    }
    if (arr == null || arr.length == 0) return [];
    return arr.map(data => this.load(type, data));
  }

  // /**
  //  * Load a child model
  //  * @param {DbObject} model The model
  //  * @param {*} data The source data
  //  * @param {string} type The type name of the child model
  //  * @param {string} [propName] The property name on the parent model. Defaults to type
  //  * @returns {*|null} The deserialized child model, or null
  //  */
  // loadModel(model, data, type, propName) {
  //   propName = propName || type;

  //   if (data[propName] != null) {
  //     // Source data includes full child object
  //     return model[propName] = this.load(data[propName]);
  //   }
  //   return null;
  // }

  /**
   * Load a child collection from an array of source data
   * @param {DbObject} model 
   * @param {*} data 
   * @param {string} propName 
   * @returns {Array|null} An array of deserialized models
   */
  loadChildren(model, data, propName) {
    let arr = data[propName];
    if (arr == null) return;
    let collection = model[propName];
    if (collection == null) {
      throw new Error(`property ${propName} not defined`);
    }

    if (collection instanceof KeyedList) {
      collection.clear();
    } else if (collection instanceof Array) {
      collection.splice(0, collection.length);
    } else {
      throw new Error(`property ${propName} is not a collection`);
    }

    const type = singular(propName);
    let childModels = this.loadAll(type, arr); 
    collection.push(...childModels); 
 
    return childModels;
  }

  /**
   * Convert any value to a EnumValue of a particular type
   * @param {EnumValue | string | number} value The value to convert to an EnumValue
   * @param {string} typeName The name of the enum type
   * @returns {EnumValue}
   */
  loadEnum(value, typeName) {
    const enumSet = this._enums.get((typeName || '').toLowerCase());
    if (enumSet == null) return null;
    return enumSet.get(value);
  }

  /**
   * Load a plain object from a JSON string, or an already parsed object
   * @param {string | object} source A JSON string or an already parsed object
   */
  loadObject(source) {
    if (source == null) return null;
    if (typeof source === 'string') {
      if (isEmpty(source)) return null;
      return JSON.parse(source);
    }
    return source;
  }
}

/**
 * The name of the JSON property to look for the object type. Defaults to '$type'
 */
Loader.prototype.typeProperty = '$type';