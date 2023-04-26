import { EApplicationState } from '../Common/enums.js'
import Input, { InputEvent } from '../Event/Input.js'
import Window from '../Core/Window.js'
import Renderer from '../Renderer/Renderer.js'
import LevelManager from '../World/Level/LevelManager.js'

export default class Application {
  /** @type {EApplicationState} */
  _state = 'UNINITIALIZED'

  /**
   * User configuration such as:
   * Title (to be used in the window)
   * A optional width and height (default to window size)
   * And resizing
   */
  _configuration = {
    title: 'Default Title',
    width: innerWidth,
    height: innerHeight,
    resize: true,
  }

  constructor() {
    this.window = new Window(this._configuration)
  }

  OnInit() {}

  OnRender() {}

  OnUpdate() {}

  OnCrash() {}

  /**
   * @param {InputEvent} input
   */
  OnInput(input) {}

  Init() {
    this._state = 'INITIALIZING'

    //Add this to the main handlers
    Input.AddInputHandler(this)

    this.OnInit()
    this.ResetFromConfig()

    this._state = 'UPDATE'
  }

  Crash() {
    this.OnCrash()
  }

  Render() {
    Renderer.Render()
    LevelManager.Render()

    this.OnRender()
  }

  Update() {
    LevelManager.Update()

    this.OnUpdate()
  }

  Run() {
    if (this._state !== 'UPDATE') {
      console.warn(`Application _state isn't 'UPDATE'`)
      return
    }

    this.Render()
    this.Update()
  }

  /**
   * Function to be used once something from the _configuration prop. gets changed
   */
  ResetFromConfig() {
    this.window.Reset(this._configuration)
  }
}
