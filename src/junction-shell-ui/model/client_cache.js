import { KeyedList } from '/@mflib/collections';
import { Loader } from './loader';
import { pv } from '.';
import { isEmpty } from '/@mflib/str';

export class ClientCache extends Loader {

  /**
   * Create a new cached loader
   * @param {Loader} [loader] Underlying loader on which cache is based   
   */
  constructor(loader) {
    super();
    pv.present(arguments, 'loader?');
    pv.allow(loader, 'loader').isInstanceOf(Loader);
    this._loader = loader || new Loader();
    this._items = {};
  }

  register(ctor, name, keyProp) {
    this._loader.register(ctor, name, keyProp);
  }

  registerEnum(enumSet, enumName) {
    this._loader.registerEnum(enumSet, enumName);
  }

  getCtor(data) {
    return this._loader.getCtor(data);
  }

  getKeyProp(typeName) {
    return this._loader.getKeyProp(typeName);
  }

  loadEnum(value, typeName) {
    return this._loader.loadEnum(value, typeName);
  }

  load(data) {
    let ctor = this.getCtor(data);
    let typeName = data[this._loader.typeProperty];
    let itemSet = this._itemSet(typeName, true);
    let id = data.id;
    let noID = (id == 0) || isEmpty(id);
    let model;
    let isNew = false;

    if (!noID) model = itemSet.get(id);
    if (model == null) {
      model = new ctor();
      isNew = true;

      // Immediately add by id so that model is indexed
      // and child models can find it while loading
      if (!noID) {
        model.id = id;
        itemSet.add(model);
      }
    }

    model.load(this, data);
    if (isNew && !noID) {
      for (; ;) {
        let keyProp = this.getKeyProp(typeName);
        if (isEmpty(keyProp)) break;

        let key = model[keyProp];
        if (isEmpty(key)) break;

        // Force add by key 
        let itemHandle = itemSet._byID[id];
        let useKey = itemSet._useKey(key);
        itemSet._byKey[useKey] = itemHandle;
        itemSet._keys[useKey] = key;
        itemHandle.key = key;
        break;
      }
    }

    return model;
  }

  /**
   * Load a child model
   * @param {DbObject} model The model
   * @param {*} data The source data
   * @param {string} type The type name of the child model
   * @param {string} [propName] The property name on the parent model. Defaults to type
   * @returns {*|null} The deserialized child model, or null
   */
  loadModel(model, data, type, propName) {
    propName = propName || type;
    let idProp = propName + 'ID';
    let idVal = data[idProp];

    if (data[propName] != null) {
      // Source data includes full child object
      return model[propName] = this.load(data[propName]);
    } else if (null != (idVal = data[idProp])) {
      if (model[idProp] != idVal) {
        model[idProp] = idVal;
        model[propName] = this.getItem(type, idVal);
      }
    }
    return null;
  }

  /**
   * Get an item by type name and id or key
   * @param {string} type The name of the model type
   * @param {string | number} key The database id or string key of the model
   */
  getItem(type, key) {
    if (key == null) return null;
    let itemSet = null;
    if (null == (itemSet = this._itemSet(type))) return null;
    return itemSet.get(key);
  }

  /**
   * Get all loaded models of a particular type
   * @param {string} type The name of the model type 
   * @returns {Array}
   */
  getAll(type) {
    let itemSet = null;
    if (null == (itemSet = this._itemSet(type))) return null;
    return Array.from(itemSet);
  }

  /**
   * @param {string} type 
   * @param {boolean} create Whether to create the set if it does not yet exist
   * @returns {KeyedList}
   */
  _itemSet(type, create) {
    let key = type.toLowerCase();
    let itemSet = this._items[key];
    if (itemSet == null && create) {
      let keyProp = this._loader._ctors.get(key)._keyProp;
      itemSet = this._items[key] = new KeyedList(keyProp);
    }
    return itemSet;
  }
}