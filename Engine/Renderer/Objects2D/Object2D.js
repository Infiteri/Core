import Object from '../../Core/Object.js'
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

  Render(model = undefined) {
    this.UploadUniforms(model)

    this.material.Use()
  }

  UploadUniforms(model = undefined) {
    if (model) {
      const shader = Renderer.GetShader()

      if (shader) shader.Mat4('uObject', model)
    }
  }
}
