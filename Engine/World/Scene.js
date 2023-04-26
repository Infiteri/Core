import Node from './Node.js'

export default class Scene {
  constructor(id) {
    this.id = id

    this.root = new Node('__ROOT__SCENE__' + this.id)
  }

  AddChild(instance) {
    this.root.AddChild(instance)
  }

  AddComponent(instance) {
    this.root.AddComponent(instance)
  }

  AddScript(name) {
    this.root.AddScript(name)
  }

  GetChildByName(name) {
    return this.root.GetChildByName(name)
  }

  GetChildByTag(name) {
    return this.root.GetChildByTag(name)
  }

  Init() {
    this.root.Init()
  }

  Render() {
    this.root.Render()
  }

  Update() {
    this.root.Update()
  }
}
