import TextureManager from '../../Manager/TextureManager.js'
import Renderer from '../Renderer.js'
import Buffer from '../WebGL/Buffer.js'
import Object2D from './Object2D.js'

export default class Sprite2D extends Object2D {
  constructor(textureName = '', width, height) {
    super()

    this.textureName = textureName
    this.width = width
    this.height = height

    this.material.textureName = this.textureName

    //prettier-ignore
    const data = [
          0, 0, 0, 0, 0, 
  
          0, this.height, 0, 0, 1,
  
          this.width, this.height, 0, 1, 1, 
  
          this.width, this.height, 0, 1, 1,
  
          this.width, 0, 0, 1, 0,
  
          0, 0, 0, 0, 0
      ]

    this.buffer = new Buffer({
      data,
      size: 5,
    })
    this.buffer.AddLayout(0, 0, 3)
    this.buffer.AddLayout(1, 3, 2)
    this.buffer.Init()
  }

  Render() {
    super.Render()

    this.buffer.Bind()
    this.buffer.Draw()
  }
}
