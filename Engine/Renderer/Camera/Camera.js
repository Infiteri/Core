import { Matrix4x4 } from '../../Math/Matrix4x4.js'
import { Vector3 } from '../../Math/Vector3.js'

export default class Camera {
  constructor() {
    this.projection = Matrix4x4.Identity()

    this.position = new Vector3(0, 0, 0)
    this.model = Matrix4x4.Translation(this.position)
  }

  get finalMatrix() {
    return Matrix4x4.Multiply(this.projection, this.model)
  }

  get final32Matrix() {
    return this.finalMatrix.ToFloat32Array()
  }

  Recalculate() {}

  UpdateModel() {
    this.model = Matrix4x4.Translation(this.position)
  }
}
