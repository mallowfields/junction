import { RouteClient } from '../route_client'

// eslint-disable-next-line no-unused-vars
import { Workflow } from '/model/db_objects/workflow'

export class WorkflowClient extends RouteClient {
  constructor (base) {
    super(base, '/execution/workflow')
  }

  /**
   * Get a single workflow by id
   * @param {string} id The id of the workflow
   * @returns {Promise<Workflow>}
   */
  async get (id) {
    let uri = this.relativeUri(id)
    let data = await this.base.get(uri, { ignore404: true })
    return this.loader.load('workflow', data)
  }

  /**
   * Get all workflows
   * @returns {Promise<Workflow[]>}
   */
  async getAll () {
    let uri = this.relativeUri()
    let data = await this.base.get(uri)
    return this.loader.loadAll('workflow', data)
  }

  /**
   * Create a new workflow
   * @param {Workflow} workflow
   * @returns {Promise<Workflow>}
   */
  async create (workflow) {
    let uri = this.relativeUri()
    let data = await this.base.post(uri, workflow)
    return this.loader.load('workflow', data)
  }

  /**
   * Save a workflow
   * @param {Workflow} workflow
   * @returns {Promise}
   */
  async save (workflow) {
    let uri = this.relativeUri(this.getId(workflow))
    let data = await this.base.put(uri, workflow)
    return this.loader.load('workflow', data)
  }

  /**
   * Un-Relate an entity from a workflow
   * @param {Workflow} workflow
   * @returns {Promise}
   */
  async unRelate (workflow) {
    let uri = this.relativeUri(this.getId(workflow))
    uri += '/unrelate'
    let data = await this.base.put(uri, workflow)
    return this.loader.load('workflow', data)
  }

  /**
   * Delete a workflow
   * @param {Workflow} workflow
   * @returns {Promise}
   */
  delete (workflow) {
    let uri = this.relativeUri(this.getId(workflow))
    return this.base.delete(uri, { ignore404: true })
  }
}
