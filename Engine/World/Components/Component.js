import Node from '../Node.js'

export class Component {
  constructor(name = 'Component') {
    this.name = name

    /** @type {Node} */
    this.owner = null
  }

  Init() {}

  Render() {}
}
