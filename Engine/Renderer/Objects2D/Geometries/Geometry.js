import { gl } from '../../Renderer.js'

export default class Geometry {
  constructor() {
    this.vertices = []

    this.size = 0
    this.drawMode = gl.TRIANGLES
  }

  //NOTE: In the future the vertices will be a list of Vertex containers
  GetDataArray() {
    return this.vertices
  }
}
