import Object from '../../Core/Object.js'
import { Matrix4x4 } from '../../Math/Matrix4x4.js'
import { Vector3 } from '../../Math/Vector3.js'
import Material from '../Material.js'
import Renderer from '../Renderer.js'

export default class Object2D extends Object {
  constructor() {
    super()

    this.position = new Vector3()

    // Graphical display on the screen
    this.material = new Material()
  }

  Render() {
    this.UploadUniforms()
    this.material.Use()
  }

  UploadUniforms() {
    const positionMatrix = Matrix4x4.Translation(this.position)
    Renderer.UploadMeshMat4OnShader(positionMatrix.ToFloat32Array())
  }
}
