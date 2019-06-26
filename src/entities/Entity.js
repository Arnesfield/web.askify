import { constructor, collection } from './helpers'

export default class Entity {
  constructor() {
    constructor.bind(this)(...arguments)
  }

  static collection = collection
}
