/* eslint no-unused-vars: "off" */

import { RestClient } from './rest_client';
import { Validator } from '/@mflib/validation';
import { Loader } from '/model';

const pv = (new Validator(true)).params;

/**
 * Base class for client instances for specific routes
 */
export class RouteClient {

  /** 
   * @param {RestClient} base 
   * @param {string} route The relative route for this RouteClient
   */
  constructor(base, route) {
    pv.present(arguments, 'base', 'route');
    pv.require(this._base = base, 'base').isInstanceOf(Object); //.isInstanceOf(RestClient);
    pv.require(this._route = route, 'route').isString().isNotEmpty();

    if (this._route.endsWith('/')) {
      this._route = this._route.substring(0, this._route.length - 1);
    }
    if (this._route.startsWith('/')) {
      this._route = this._route.substring(1);
    }
  }

  /**
   * The base RestClient
   * @returns {RestClient}
   */
  get base() { return this._base; }
  set base(_) { throw new Error('base is read-only'); }

  /**
   * The relative route for this route client
   * @returns {string}
   */
  get route() { return this._route; }
  set route(_) { throw new Error('route is read-only'); }

  /**
   * @returns {Loader}
   */
  get loader() { return this._base._loader; }
  set loader(_) { throw new Error('loader is read-only'); }

  /**
  * Combines the relative route path of this RouteClient and the relative URI provided.
  * If uri starts with a forward slash, it is treated as an absolute uri relative to 
  * the endpoint uri and is not combined with the route path
  * @param {...any} uri The relative URI parts
  * @returns {string}
  */
  relativeUri(...uri) {
    if (uri == null || uri.length == 0) {
      // Base route
      return this._route;
    }
    let joined = uri.join('/');

    if (joined.startsWith('/')) {
      // Absolute uri (relative to endpoint)
      return joined;
    }
    return this._route + '/' + joined;
  }

  getId(itemOrID) {
    if (itemOrID == null) return null;
    if (itemOrID.id) return itemOrID.id;
    return itemOrID;
  }

  wrapRecord(...records) {
    return { records };
  }

  unwrapRecord(data) {
    return data.records[0];
  }
}