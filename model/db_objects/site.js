import { DbObject } from '../db_object'

// eslint-disable-next-line no-unused-vars
import { Loader } from '../loader'

export class Site extends DbObject {
  /**
   * Load the data for the instance
   * @param {Loader} loader
   * @param {*} data
   */
  load (loader, data) {
    super.load(loader, data)

    this.type = data.type
    this.code = data.code
    this.publicId = data.publicId
    this.displayName = data.displayName
    this.lastUpdatedTimestamp = data.lastUpdatedTimestamp
    this.status = data.status
    this.entities = data.entities
    this.actors = data.actors
    this.workflows = data.workflows
    this.tasks = data.tasks

    this.loaded = true
  }
}

/** @type {string} */
Site.prototype.type = ''

/** @type {string} */
Site.prototype.code = ''

/** @type {string} */
Site.prototype.publicId = ''

/** @type {string} */
Site.prototype.displayName = ''

/** @type {string} */
Site.prototype.lastUpdatedTimestamp = ''

/** @type {string} */
Site.prototype.status = ''

/** @type {array} */
Site.prototype.entities = []

/** @type {array} */
Site.prototype.actors = []

/** @type {array} */
Site.prototype.workflows = []

/** @type {array} */
Site.prototype.tasks = []
