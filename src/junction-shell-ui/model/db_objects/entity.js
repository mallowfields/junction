import { DbObject } from '../db_object'

// eslint-disable-next-line no-unused-vars
import { Loader } from '../loader'

export class Entity extends DbObject {
  /**
   * Load the data for the instance
   * @param {Loader} loader
   * @param {*} data
   */
  load (loader, data) {
    super.load(loader, data)

    this.type = data.type
    this.code = data.code
    this.status = data.status
    this.description = data.description
    this.displayName = data.displayName
    this.lastUpdatedTimestamp = data.lastUpdatedTimestamp
    this.entities = data.entities

    this.loaded = true
  }
}

/** @type {string} */
Entity.prototype.type = ''

/** @type {string} */
Entity.prototype.code = ''

/** @type {string} */
Entity.prototype.status = ''

/** @type {string} */
Entity.prototype.description = ''

/** @type {string} */
Entity.prototype.displayName = ''

/** @type {string} */
Entity.prototype.lastUpdatedTimestamp = ''

/** @type {array} */
Entity.prototype.entities = []
