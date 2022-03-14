import { RouteClient } from '../route_client'

// eslint-disable-next-line no-unused-vars
import { Task } from '/model/db_objects/task'

export class TaskClient extends RouteClient {
  constructor (base) {
    super(base, '/execution/task')
  }

  /**
   * Get a single task by id
   * @param {string} id The id of the task
   * @returns {Promise<Task>}
   */
  async get (id) {
    let uri = this.relativeUri(id)
    let data = await this.base.get(uri, { ignore404: true })
    return this.loader.load('task', data)
  }

  /**
   * Get all tasks
   * @returns {Promise<Task[]>}
   */
  async getAll () {
    let uri = this.relativeUri()
    let data = await this.base.get(uri)
    return this.loader.loadAll('task', data)
  }

  /**
   * Create a new task
   * @param {Task} task
   * @returns {Promise<Task>}
   */
  async create (task) {
    let uri = this.relativeUri()
    let data = await this.base.post(uri, task)
    return this.loader.load('task', data)
  }

  /**
   * Save a task
   * @param {Task} task
   * @returns {Promise}
   */
  async save (task) {
    let uri = this.relativeUri(this.getId(task))
    let data = await this.base.put(uri, task)
    return this.loader.load('task', data)
  }

  /**
   * Un-Relate an entity from a task
   * @param {Task} task
   * @returns {Promise}
   */
  async unRelate (task) {
    let uri = this.relativeUri(this.getId(task))
    uri += '/unrelate'
    let data = await this.base.put(uri, task)
    return this.loader.load('task', data)
  }

  /**
   * Delete a task
   * @param {Task} task
   * @returns {Promise}
   */
  delete (task) {
    let uri = this.relativeUri(this.getId(task))
    return this.base.delete(uri, { ignore404: true })
  }
}
