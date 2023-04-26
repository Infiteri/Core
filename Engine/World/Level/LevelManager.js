import Logger from '../../Core/Logger.js'
import Level from './Level.js'

export default class LevelManager {
  /** @type {Object.<string, Level>} */
  static levels = {}

  /** @type {Level} */
  static activeLevel = null

  static Render() {
    if (this.activeLevel !== null) this.activeLevel.Render()
  }

  static Update() {
    if (this.activeLevel !== null) this.activeLevel.Update()
  }

  static Add(name, level) {
    this.levels[name] = level
  }

  static Get(name) {
    return this.levels[name] || null
  }

  static Start(name) {
    const level = this.levels[name]

    if (!level) {
      Logger.Error(`Cannot find level named '${name}', no level started.`)
      return
    }

    if (this.activeLevel !== null) {
      this.activeLevel.Unload()
    }

    this.activeLevel = level
    this.activeLevel.Load()
    this.activeLevel.Init()
  }
}
