import { Mesh2D } from '../../Renderer/Objects2D/Mesh2D.js'
import Sprite2D from '../../Renderer/Objects2D/Sprite2D.js'
import { Component } from './Component.js'

export default class Sprite2DComponent extends Component {
  constructor(name = 'Sprite2DComponent', textureName, width, height) {
    super(name)

    this.sprite = new Sprite2D(textureName, width, height)
  }

  get material() {
    return this.sprite.material
  }

  Init() {
    this.sprite.Init()
  }

  Render() {
    this.sprite.Render(this.owner.worldMatrix.ToFloat32Array())
  }
}
