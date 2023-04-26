import Buffer from '../WebGL/Buffer.js'
import Geometry from './Geometries/Geometry.js'
import Object2D from './Object2D.js'

export class Mesh2D extends Object2D {
  /**
   * Mesh2D constructor
   *
   * @param {Geometry} geometry The geometry to use
   */
  constructor(geometry) {
    super()

    this.geometry = geometry

    // Buffer
    this.buffer = new Buffer({
      data: this.geometry.GetDataArray(),
      size: this.geometry.size,
      drawMode: this.geometry.drawMode,
    })
    this.buffer.AddLayout(0, 0, 3)
    this.buffer.AddLayout(1, 3, 2) // Possible UVS
    this.buffer.Init()
  }

  Render(model = undefined) {
    super.Render(model)

    this.buffer.Bind()
    this.buffer.Draw()
  }
}
