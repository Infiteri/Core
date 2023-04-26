import { SquareGeometry } from '../../Renderer/Objects2D/Geometries/SquareGeometry.js'
import { Mesh2D } from '../../Renderer/Objects2D/Mesh2D.js'
import { Component } from './Component.js'

export default class Mesh2DComponent extends Component {
  constructor(name = 'Mesh2DComponent', geometry = new SquareGeometry()) {
    super(name)

    this.mesh = new Mesh2D(geometry)
  }

  Init() {
    this.mesh.Init()
  }

  Render() {
    this.mesh.Render(this.owner.worldMatrix.ToFloat32Array())
  }
}
