import TextureManager from '../Manager/TextureManager.js'
import Color from './Color.js'
import Renderer from './Renderer.js'

export default class Material {
  constructor() {
    this.color = Color.white

    // Texture
    this.useTexture = false
    this._textureName = undefined
    this.texture = null
  }

  /**
   * @param {string} value
   */
  set textureName(value) {
    this.useTexture = true
    this._textureName = value
    this.texture = TextureManager.Get(this._textureName)
  }

  Use() {
    const shader = Renderer._state.mainShader

    if (!shader) return

    shader.Vec4fv('uColor', this.color.Get32Array())
    shader.Int('useTexture', 0)

    if (this.useTexture && this.texture !== null) {
      shader.Int('useTexture', 1)

      this.texture.Activate()
      shader.Int('uSampler', this.texture.unit)
    }
  }
}
