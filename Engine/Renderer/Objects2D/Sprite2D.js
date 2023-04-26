import Buffer from '../WebGL/Buffer.js'
import Object2D from './Object2D.js'

export default class Sprite2D extends Object2D {
  constructor(textureName = undefined, width = 100, height = 100) {
    super()

    this.textureName = textureName
    this.width = width
    this.height = height

    this.material.textureName = this.textureName

    //prettier-ignore
    this.data = [
          0, 0, 0, 0, 0, 
  
          0, this.height, 0, 0, 1,
  
          this.width, this.height, 0, 1, 1, 
  
          this.width, this.height, 0, 1, 1,
  
          this.width, 0, 0, 1, 0,
  
          0, 0, 0, 0, 0
      ]

    this.buffer = new Buffer({
      data: this.data,
      size: 5,
    })
    this.buffer.AddLayout(0, 0, 3)
    this.buffer.AddLayout(1, 3, 2)
    this.buffer.Init()
  }

  GetDataArray() {
    return this.data
  }

  Render(model = undefined) {
    super.Render(model)

    this.buffer.Bind()
    this.buffer.Draw()
  }
}
