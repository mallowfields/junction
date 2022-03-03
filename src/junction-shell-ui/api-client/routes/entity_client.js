import { RouteClient } from '../route_client'

// eslint-disable-next-line no-unused-vars
import { Entity } from '/model/db_objects/entity'

export class EntityClient extends RouteClient {
  constructor (base) {
    super(base, '/management/entity')
  }

  /**
   * Get a single entity by id
   * @param {string} id The id of the entity
   * @returns {Promise<Entity>}
   */
  async get (id) {
    let uri = this.relativeUri(id)
    let data = await this.base.get(uri, { ignore404: true })
    return this.loader.load('entity', data)
  }

  /**
   * Get all entities
   * @returns {Promise<Entity[]>}
   */
  async getAll () {
    let uri = this.relativeUri()
    let data = await this.base.get(uri)
    return this.loader.loadAll('entity', data)
  }

  /**
   * Create a new entity
   * @param {Entity} entity
   * @returns {Promise<Entity>}
   */
  async create (entity) {
    let uri = this.relativeUri()
    let data = await this.base.post(uri, entity)
    return this.loader.load('entity', data)
  }

  /**
   * Save an entity
   * @param {Entity} entity
   * @returns {Promise}
   */
  async save (entity) {
    let uri = this.relativeUri(this.getId(entity))
    let data = await this.base.put(uri, entity)
    return this.loader.load('entity', data)
  }

  /**
   * Un-Relate an entity
   * @param {Entity} entity
   * @returns {Promise}
   */
  async unRelate (entity) {
    let uri = this.relativeUri(this.getId(entity))
    uri += '/unrelate'
    let data = await this.base.put(uri, entity)
    return this.loader.load('entity', data)
  }

  /**
   * Delete an entity
   * @param {Entity} entity
   * @returns {Promise}
   */
  delete (entity) {
    let uri = this.relativeUri(this.getId(entity))
    return this.base.delete(uri, { ignore404: true })
  }
}
