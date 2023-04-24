import Logger from '../Core/Logger.js'
import Texture from '../Renderer/WebGL/Texture.js'

export default class TextureManager {
  static textures = {}

  static Add(name, src) {
    if (!this.textures[name]) {
      const t = new Texture(src)
      this.textures[name] = t
    } else {
      Logger.Warn(`Texture already exists ('${name}').`)
    }
  }

  /**
   * @param {string} name The name
   * @returns {Texture || null}
   */
  static Get(name) {
    return this.textures[name] || null
  }
}
