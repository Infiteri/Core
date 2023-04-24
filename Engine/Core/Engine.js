import { EEngineLoadState } from '../Common/enums.js'
import Input from '../Event/Input.js'
import Application from '../core/Application.js'
import Logger from '../Core/Logger.js'
import Renderer from '../Renderer/Renderer.js'
import AssetManager from '../Assets/AssetManager.js'
import MessageBus from '../Messages/MessageBus.js'

export default class Engine {
  /** @type {EEngineLoadState} */
  static _state = 'UNINITIALIZED'

  /** @type {Application} */
  static _application = null

  /**
   * List of subsystems to be initialized at the beginning of the application (before any user code gets started)
   */
  static _INIT_SUBSYSTEMS = []

  /**
   * List of subsystems to be updated at the beginning every frame (before any user code gets started)
   */
  static _UPDATE_SUBSYSTEMS = []

  /**
   * Virtual function (to be re-written by the USER) which should return a new class which extends the application class
   *
   * @returns {Application} The application to return
   */
  static CreateApplication() {}

  /**
   * Stops the engine whole, mostly used in assertion failures or fatal errors
   */
  static Destroy() {
    Logger.Error(`Engine destroyed`)

    for (let i = 0; i < this._INIT_SUBSYSTEMS.length; i++) {
      const subsystem = this._INIT_SUBSYSTEMS[i]

      if (subsystem.Destroy) {
        subsystem.Destroy()
        Logger.Info(`Subsystem ${subsystem.name} destroyed.`)
      }
    }

    for (let i = 0; i < this._UPDATE_SUBSYSTEMS.length; i++) {
      const subsystem = this._UPDATE_SUBSYSTEMS[i]

      if (subsystem.Destroy) {
        subsystem.Destroy()
        Logger.Info(`Subsystem ${subsystem.name} destroyed.`)
      }
    }

    this._INIT_SUBSYSTEMS = []
    this._UPDATE_SUBSYSTEMS = []

    if (this._application !== null) {
      this._application.Crash()
    }
  }

  /**
   * Starts the core of the engine (subsystems)
   */
  static Initialize() {
    this._state = 'INITIALIZING'
    this.Initializing()
  }

  /** @private */
  static Initializing() {
    if (this._state !== 'INITIALIZING') {
      console.warn(`Engine _state isn't 'INITIALIZING'`)
      return
    }

    //Append to subsystems
    this._INIT_SUBSYSTEMS = [Logger, Input, Renderer, AssetManager]
    this._UPDATE_SUBSYSTEMS = [MessageBus]

    //Create a application (lifetime)
    this._application = this.StartApplication()

    //Load subsystems
    for (let i = 0; i < this._INIT_SUBSYSTEMS.length; i++) {
      const subsystem = this._INIT_SUBSYSTEMS[i]

      if (!subsystem.IsLoaded()) {
        subsystem.Initialize()
        Logger.Info(`Subsystem '${subsystem.name}' initialized successfully.`)
      } else {
        Logger.Warn(`Subsystem already initialized '${subsystem.name}'.`)
      }
    }

    //Run the application
    this._application.Init()

    this._state = 'PRE_UPDATE'
    this.PreUpdate()
  }

  /** @private */
  static PreUpdate() {
    if (this._state !== 'PRE_UPDATE') {
      console.warn(`Engine _state isn't 'PRE_UPDATE'`)
      return
    }

    //Check for subsystems to be loaded
    for (let i = 0; i < this._INIT_SUBSYSTEMS.length; i++) {
      const subsystem = this._INIT_SUBSYSTEMS[i]

      //Make sure the subsystem needs to be initialized
      if (subsystem.IsLoaded && !subsystem.IsLoaded()) {
        console.error(`Subsystem not started ${subsystem.name}`)
      }
    }

    //Post check
    this._state = 'UPDATE'
    this.Update()
  }

  /** @private */
  static Update() {
    if (this._state !== 'UPDATE') {
      console.warn(`Engine _state isn't 'UPDATE'`)
      return
    }

    // //Update the core of the engine
    // this.OnUpdate()

    // Update the core
    for (let i = 0; i < this._UPDATE_SUBSYSTEMS.length; i++) {
      const subsystem = this._UPDATE_SUBSYSTEMS[i]

      //Make sure subsystem can be updated
      if (!subsystem.Update) {
        //prettier-ignore
        Logger.Log(`Subsystem '${subsystem.name}' doesn't have a update callback, the subsystem will get removed from the Engine._UPDATE_SUBSYSTEMS list.`);
        this._UPDATE_SUBSYSTEMS.splice(i, 1)
      } else {
        //Update subsystem
        subsystem.Update()
      }
    }

    //Run code
    this._application.Run()

    requestAnimationFrame(this.Update.bind(this))
  }

  // static OnUpdate() {}

  /**
   * Creates a new user application (Engine.CreateApplication) and checks it for specific stuff (not to be null / undefined, etc... .)
   *
   * @returns {Application} The application
   */
  static StartApplication() {
    const app = this.CreateApplication()

    if (app === null) {
      throw new Error(`Engine.StartApplication: CreateApplication returns null`)
    }

    //prettier-ignore
    if (app === undefined) {
      throw new Error(`Engine.StartApplication: CreateApplication returns undefined`)
    }

    //prettier-ignore
    if (app instanceof Application) {
    } else {
      throw new Error(
        'Engine.StartApplication: CreateApplication does not return a Application instance'
      )
    }

    return app
  }
}
