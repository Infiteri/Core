import { Matrix4x4 } from '../../Math/Matrix4x4.js'
import { gl } from '../Renderer.js'
import Camera from './Camera.js'

export default class OrthographicCamera extends Camera {
  constructor() {
    super()

    //Camera bounds
    this.left = 0
    this.right = gl.canvas.width
    this.bottom = gl.canvas.height
    this.top = 0
    this.near = -10
    this.far = 100

    this.projection = Matrix4x4.OrthoGraphic(
      this.left,
      this.right,
      this.bottom,
      this.top,
      this.near,
      this.far
    )
  }

  Recalculate() {
    this.right = gl.canvas.width
    this.bottom = gl.canvas.height

    this.projection = Matrix4x4.OrthoGraphic(
      this.left,
      this.right,
      this.bottom,
      this.top,
      this.near,
      this.far
    )
  }
}
