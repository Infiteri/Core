import Scene from '../Scene.js'
import { ELevelState } from '../../Common/enums.js'

//TODO: State
export default class Level {
  static id = -1
  constructor() {
    Level.id++
    this.id = Level.id

    /** @type {ELevelState} */
    this.state = 'UNINITIALIZED'

    this.scene = new Scene(this.id)
  }

  OnLoad() {}

  OnUnload() {}

  Load() {
    this.OnLoad()
  }

  Unload() {
    this.OnUnload()
  }

  AddChild(instance) {
    this.scene.AddChild(instance)
  }

  AddComponent(instance) {
    this.scene.AddComponent(instance)
  }

  GetChildByName(name) {
    return this.scene.GetChildByName(name)
  }

  GetChildByTag(name) {
    return this.scene.GetChildByTag(name)
  }

  AddScript(name) {
    this.scene.AddScript(name)
  }

  Init() {
    this.state = 'INITIALIZING'

    this.scene.Init()

    this.state = 'UPDATE'
  }

  Render() {
    if (this.state !== 'UPDATE') return

    this.scene.Render()
  }

  Update() {
    if (this.state !== 'UPDATE') return

    this.scene.Update()
  }
}
