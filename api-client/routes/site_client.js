import { RouteClient } from '../route_client'

// eslint-disable-next-line no-unused-vars
import { Site } from '/model/db_objects/site'

export class SiteClient extends RouteClient {
  constructor (base) {
    super(base, '/access/site')
  }

  /**
   * Get a single site by id
   * @param {string} id The id of the site
   * @returns {Promise<Site>}
   */
  async get (id) {
    let uri = this.relativeUri(id)
    let data = await this.base.get(uri, { ignore404: true })
    return this.loader.load('site', data)
  }

  /**
   * Get a single site by public id
   * @param {string} id The public id of the site
   * @returns {Promise<Site>}
   */
  async getByPublicId (id) {
    let uri = this.relativeUri()
    uri += `/public/${id}`
    let data = await this.base.get(uri, { ignore404: true })
    return this.loader.load('site', data)
  }

  /**
   * Get all sites
   * @returns {Promise<Site[]>}
   */
  async getAll () {
    let uri = this.relativeUri()
    let data = await this.base.get(uri)
    return this.loader.loadAll('site', data)
  }

  /**
   * Get related sites by an id
   * @param {Site} site
   * @param {string} id an id
   * @returns {Promise}
   */
  async getAllRelatedSites (id) {
    let uri = this.relativeUri()
    uri += `/related/${id}`
    let data = await this.base.get(uri)
    return this.loader.loadAll('site', data)
  }

  /**
   * Create a new site
   * @param {Site} site
   * @returns {Promise<Site>}
   */
  async create (site) {
    let uri = this.relativeUri()
    let data = await this.base.post(uri, site)
    return this.loader.load('site', data)
  }

  /**
   * Save a site
   * @param {Site} site
   * @returns {Promise}
   */
  async save (site) {
    let uri = this.relativeUri(this.getId(site))
    let data = await this.base.put(uri, site)
    return this.loader.load('site', data)
  }

  /**
   * Un-Relate an entity from a site
   * @param {Site} site
   * @returns {Promise}
   */
  async unRelate (site) {
    let uri = this.relativeUri(this.getId(site))
    uri += '/unrelate'
    let data = await this.base.put(uri, site)
    return this.loader.load('site', data)
  }

  /**
   * Delete a site
   * @param {Site} site
   * @returns {Promise}
   */
  delete (site) {
    let uri = this.relativeUri(this.getId(site))
    return this.base.delete(uri, { ignore404: true })
  }
}
