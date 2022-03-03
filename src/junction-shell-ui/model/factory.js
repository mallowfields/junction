import { Loader } from './loader'
import { Entity } from './db_objects/entity'

const baseCreate = Loader.create

/**
 * Create a loader initialized with all model class constructors
 * @returns {Loader}
 */
function createLoader () {
  let l = baseCreate()
  l.register(Entity, 'Entity')
  return l
}

Loader.create = createLoader
