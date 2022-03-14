import { DbObject } from '../db_object'

// eslint-disable-next-line no-unused-vars
import { Loader } from '../loader'

export class Task extends DbObject {
  /**
   * Load the data for the instance
   * @param {Loader} loader
   * @param {*} data
   */
  load (loader, data) {
    super.load(loader, data)

    this.type = data.type
    this.code = data.code
    this.description = data.description
    this.displayName = data.displayName
    this.lastUpdatedTimestamp = data.lastUpdatedTimestamp
    this.workflows = data.workflows
    this.tools = data.tools
    this.status = data.status

    this.loaded = true
  }
}

/** @type {string} */
Task.prototype.type = ''

/** @type {string} */
Task.prototype.code = ''

/** @type {string} */
Task.prototype.description = ''

/** @type {string} */
Task.prototype.displayName = ''

/** @type {string} */
Task.prototype.lastUpdatedTimestamp = ''

/** @type {array} */
Task.prototype.workflows = []

/** @type {array} */
Task.prototype.tools = []

/** @type {string} */
Task.prototype.status = ''
