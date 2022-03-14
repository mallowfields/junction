/* eslint no-unused-vars: 'off' */

import axios from 'axios'
import { isEmpty } from '/@mflib/str'
import { Validator } from '/@mflib/validation'
import { ClientError } from './client_error'
import { Loader } from '/model'

import { ActorClient } from './routes/actor_client'
import { EntityClient } from './routes/entity_client'
import { SiteClient } from './routes/site_client'
import { TaskClient } from './routes/task_client'
import { WorkflowClient } from './routes/workflow_client'

const pv = (new Validator(true)).params

/**
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 */
/**
 * @typedef {object} RequestConfig
 * @property {boolean} [ignore404] Whether to ignore 404 error and return null
 */
/**
 * @typedef {AxiosRequestConfig & RequestConfig} RequestConfig
 */
/**
 * @typedef {import('axios').AxiosResponse} AxiosResponse
 */

/**
 * The root client for invoking API methods
 */
export class RestClient {
  /**
   * Create a new RestClient
   * @param {string} endpointUri
   * @param {string} [apiKey]
   * @param {Loader} [loader]
   */
  constructor (endpointUri, apiKey, loader) {
    pv.present(arguments, 'endpointUri', 'apiKey?', 'loader?')
    pv.require(this._endpointUri = endpointUri, 'endpointUri').isString().isNotEmpty()
    pv.allow(this._apiKey = apiKey, 'apiKey').isString().isNotEmpty()
    pv.allow(loader, 'loader').isInstanceOf(Loader)

    if (this._endpointUri.endsWith('/')) {
      this._endpointUri = this._endpointUri.substring(0, this._endpointUri.length - 1)
    }

    this._loader = loader || Loader.create()

    this.actor = new ActorClient(this)
    this.entity = new EntityClient(this)
    this.site = new SiteClient(this)
    this.task = new TaskClient(this)
    this.workflow = new WorkflowClient(this)
  }

  /**
   * The endpoint URI of the service
   * @returns {string}
   */
  get endpointUri () { return this._endpointUri }
  set endpointUri (v) { throw new Error('endpointUri is read-only') }

  /** @returns {Loader} */
  get loader () { return this._loader }
  set loader (_) { throw new Error('loader is read-only') }

  /**
   * Builds the full uri based on the endpoint URI of the service and the relative URI provided
   * @param {string} uri The relative URI
   */
  buildUri (uri) {
    if (uri.startsWith('/')) {
      uri = uri.substring(1)
    }
    return this._endpointUri + '/' + uri
  }

  /**
   * Sets required options for authentication, etc
   * @param {RequestConfig} options
   */
  updateOptions (options) {
    options = options || {}
    let headers = options.headers = options.headers || {}
    if (!isEmpty(this._apiKey)) {
      headers['Authorization'] = 'Bearer ' + this._apiKey
    }

    if (this.localHeaders) {
      let keys = Object.keys(this.localHeaders)
      keys.forEach((key) => {
        headers[key] = this.localHeaders[key]
      })
    }

    return options
  }

  /**
   * Test whether the data is an error object
   * @param {*} data
   */
  isError (data) {
    if (data == null) return false

    // Look for code property
    let code = +data.code
    if (!isNaN(code)) return code >= 400

    // Look for statusCode property
    code = +data.statusCode
    if (!isNaN(code)) return code >= 400

    return false
  }

  /**
   * Create a ClientError from the input data
   * @param {*} data
   */
  toError (data) {
    if (data == null) return new Error('Error calling api')
    return new ClientError(data)
  }

  /**
   * Invoke an http GET, returning a promise with the returned data
   * @param {string} uri The relative uri
   * @param {RequestConfig} [options]
   */
  async get (uri, options) {
    let url = this.buildUri(uri)
    let response
    try {
      response = await axios.get(url, this.updateOptions(options))
    } catch (error) {
      response = error.response
    }
    return this._filterError(response, options)
  }

  /**
   * Invoke an http POST, returning a promise with the returned data
   * @param {string} uri The relative uri
   * @param {*} [data] The body to post
   * @param {RequestConfig} [options]
   */
  async post (uri, data, options) {
    let url = this.buildUri(uri)
    let response
    try {
      response = await axios.post(url, data, this.updateOptions(options))
    } catch (error) {
      response = error.response
    }
    return this._filterError(response, options)
  }

  /**
   * Invoke an http PUT, returning a promise with the returned data
   * @param {string} uri The relative uri
   * @param {*} [data] The body to post
   * @param {RequestConfig} [options]
   */
  async put (uri, data, options) {
    let url = this.buildUri(uri)
    let response
    try {
      response = await axios.put(url, data, this.updateOptions(options))
    } catch (error) {
      response = error.response
    }
    return this._filterError(response, options)
  }

  /**
   * Invoke an http DELETE, returning a promise
   * @param {string} uri The relative uri
   * @param {RequestConfig} [options]
   */
  async delete (uri, options) {
    let url = this.buildUri(uri)
    let response
    try {
      response = await axios.delete(url, this.updateOptions(options))
    } catch (error) {
      response = error.response
    }
    return this._filterError(response, options)
  }

  /**
   * @param {AxiosResponse} response
   * @param {RequestConfig} [options]
   */
  _filterError (response, options) {
    if (RestClient._ignore404(options) && response.status === 404) {
      return null
    }
    if (this.isError(response.data)) {
      throw this.toError(response.data)
    } else if (response.status >= 400) {
      const details = response.data ? response.data.message : ''
      throw this.toError({
        code: response.status,
        message: `${response.statusText} - ${details}`
      })
    }
    return response.data
  }

  /**
   * @param {RequestConfig} [options]
   */
  static _ignore404 (options) {
    if (options == null) return false
    return options.ignore404 === true
  }
}
