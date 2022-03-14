import { RouteClient } from '../route_client'

// eslint-disable-next-line no-unused-vars
import { Actor } from '/model/db_objects/actor'

export class ActorClient extends RouteClient {
  constructor (base) {
    super(base, '/management/actor')
  }

  /**
   * Get a single actor by id
   * @param {string} id The id of the actor
   * @returns {Promise<Actor>}
   */
  async get (id) {
    let uri = this.relativeUri(id)
    let data = await this.base.get(uri, { ignore404: true })
    return this.loader.load('actor', data)
  }

  /**
   * Get all entities
   * @returns {Promise<Actor[]>}
   */
  async getAll () {
    let uri = this.relativeUri()
    let data = await this.base.get(uri)
    return this.loader.loadAll('actor', data)
  }

  /**
   * Create a new actor
   * @param {Actor} actor
   * @returns {Promise<Actor>}
   */
  async create (actor) {
    let uri = this.relativeUri()
    let data = await this.base.post(uri, actor)
    return this.loader.load('actor', data)
  }

  /**
   * Save an actor
   * @param {Actor} actor
   * @returns {Promise}
   */
  async save (actor) {
    let uri = this.relativeUri(this.getId(actor))
    let data = await this.base.put(uri, actor)
    return this.loader.load('actor', data)
  }

  /**
   * Un-Relate an entity or actor from a actor
   * @param {Actor} actor
   * @returns {Promise}
   */
  async unRelate (actor) {
    let uri = this.relativeUri(this.getId(actor))
    uri += '/unrelate'
    let data = await this.base.put(uri, actor)
    return this.loader.load('actor', data)
  }

  /**
   * Delete an actor
   * @param {Actor} actor
   * @returns {Promise}
   */
  delete (actor) {
    let uri = this.relativeUri(this.getId(actor))
    return this.base.delete(uri, { ignore404: true })
  }
}
