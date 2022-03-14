import { DbObject } from '../db_object'

// eslint-disable-next-line no-unused-vars
import { Loader } from '../loader'

export class Workflow extends DbObject {
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
    this.entities = data.entities
    this.actors = data.actors
    this.workflows = data.workflows
    this.tasks = data.tasks
    this.status = data.status

    this.loaded = true
  }
}

/** @type {string} */
Workflow.prototype.type = ''

/** @type {string} */
Workflow.prototype.code = ''

/** @type {string} */
Workflow.prototype.description = ''

/** @type {string} */
Workflow.prototype.displayName = ''

/** @type {string} */
Workflow.prototype.lastUpdatedTimestamp = ''

/** @type {array} */
Workflow.prototype.entities = []

/** @type {array} */
Workflow.prototype.actors = []

/** @type {array} */
Workflow.prototype.workflows = []

/** @type {array} */
Workflow.prototype.tasks = []

/** @type {string} */
Workflow.prototype.status = ''
