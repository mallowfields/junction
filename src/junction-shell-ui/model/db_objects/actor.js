import { DbObject } from '../db_object'

// eslint-disable-next-line no-unused-vars
import { Loader } from '../loader'

export class Actor extends DbObject {
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
    this.behavior = data.behavior
    this.displayName = data.displayName
    this.lastUpdatedTimestamp = data.lastUpdatedTimestamp
    this.entities = data.entities
    this.actors = data.actors
    this.workflows = data.workflows
    this.tasks = data.tasks

    this.loaded = true
  }
}

/** @type {string} */
Actor.prototype.type = ''

/** @type {string} */
Actor.prototype.code = ''

/** @type {string} */
Actor.prototype.status = ''

/** @type {string} */
Actor.prototype.behavior = ''

/** @type {string} */
Actor.prototype.displayName = ''

/** @type {string} */
Actor.prototype.lastUpdatedTimestamp = ''

/** @type {array} */
Actor.prototype.entities = []

/** @type {array} */
Actor.prototype.actors = []

/** @type {array} */
Actor.prototype.workflows = []

/** @type {array} */
Actor.prototype.tasks = []
