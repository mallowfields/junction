import { Loader } from './loader'
import { Actor } from './db_objects/actor'
import { Entity } from './db_objects/entity'
import { Site } from './db_objects/site'
import { Task } from './db_objects/task'
import { Workflow } from './db_objects/workflow'

const baseCreate = Loader.create

/**
 * Create a loader initialized with all model class constructors
 * @returns {Loader}
 */
function createLoader () {
  let l = baseCreate()
  l.register(Actor, 'Actor')
  l.register(Entity, 'Entity')
  l.register(Site, 'Site')
  l.register(Task, 'Task')
  l.register(Workflow, 'Workflow')
  return l
}

Loader.create = createLoader
