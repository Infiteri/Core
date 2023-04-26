export default class ScriptManager {
  static scripts = {}

  static Add(name, staticClass) {
    this.scripts[name] = staticClass
  }

  static Get(name) {
    return new this.scripts[name]()
  }
}
