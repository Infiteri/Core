import AssetManager from '../../Assets/AssetManager.js'
import MathUtils from '../../Math/MathUtils.js'
import Message from '../../Messages/Message.js'
import MessageBus from '../../Messages/MessageBus.js'
import { gl } from '../Renderer.js'

export default class Texture {
  static unit = -1

  constructor(src) {
    this.src = src

    Texture.unit++
    this.unit = Texture.unit

    // Default
    this.handle = gl.createTexture()

    //See if the wanted asset is loaded
    const asset = AssetManager.GetAsset(this.src)
    if (!asset) {
      this.LoadWithDefault()
      MessageBus.AddSubscription(Message.assetLoaded + this.src, this)
    }
  }

  /** @private */
  LoadWithDefault() {
    this.Bind()

    const pixel = new Uint8Array([255, 255, 255, 255])
    const type = gl.UNSIGNED_BYTE
    const rgba = gl.RGBA

    gl.texImage2D(gl.TEXTURE_2D, 0, rgba, 1, 1, 0, rgba, type, pixel)

    this.Unbind()
  }

  /** @private */
  LoadWithAsset(asset) {
    this.Bind()

    const type = gl.UNSIGNED_BYTE
    const rgba = gl.RGBA

    gl.texImage2D(gl.TEXTURE_2D, 0, rgba, rgba, type, asset.data)

    // Size
    const { width, height } = asset.data
    if (MathUtils.IsPowerOf2(width) && MathUtils.IsPowerOf2(height)) {
      gl.generateMipmap(gl.TEXTURE_2D)
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

    this.Unbind()
  }

  Bind() {
    gl.bindTexture(gl.TEXTURE_2D, this.handle)
  }

  Unbind() {
    gl.bindTexture(gl.TEXTURE_2D, null)
  }

  Activate() {
    gl.activeTexture(gl.TEXTURE0 + this.unit)

    this.Bind()
  }

  OnMessage(message) {
    if (message.Is(Message.assetLoaded + this.src)) {
      this.LoadWithAsset(message.context)
    }
  }
}
