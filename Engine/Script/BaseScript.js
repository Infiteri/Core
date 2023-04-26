import Node from '../World/Node.js'

export class BaseScript {
  /** @type {Node} */
  owner = null

  constructor() {}

  OnInit() {}

  OnUpdate() {}

  Init() {
    this.OnInit()
  }

  Update() {
    this.OnUpdate()
  }
}
