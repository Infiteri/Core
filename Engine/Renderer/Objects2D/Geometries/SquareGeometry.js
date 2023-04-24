import Geometry from './Geometry.js'

export class SquareGeometry extends Geometry {
  constructor(width = 100, height = 100) {
    super()

    this.width = width
    this.height = height

    this.size = 5

    //prettier-ignore
    this.vertices = [
        0, 0, 0, 0, 0, 

        0, this.height, 0, 0, 1,

        this.width, this.height, 0, 1, 1,

        this.width, this.height, 0, 1, 1, 

        this.width, 0, 0, 1, 0,

        0, 0, 0, 0, 0,
    ]
  }
}
