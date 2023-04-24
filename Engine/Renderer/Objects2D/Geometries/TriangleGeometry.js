import Geometry from './Geometry.js'

export class TriangleGeometry extends Geometry {
  constructor(width = 0.5, height = 0.5) {
    super()

    this.width = width
    this.height = height

    this.size = 3

    //prettier-ignore
    this.vertices = [
        0, this.height, 0,

        -this.width, -this.height, 0,

        this.width, -this.height, 0,
    ]
  }
}
