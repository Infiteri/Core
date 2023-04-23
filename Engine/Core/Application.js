import { EApplicationState } from '../Common/enums.js'
import Input, { InputEvent } from '../Event/Input.js'

export default class Application {
  /** @type {EApplicationState} */
  _state = 'UNINITIALIZED'

  OnInit() {}

  OnRender() {}

  OnUpdate() {}

  /**
   * @param {InputEvent} input
   */
  OnInput(input) {}

  Init() {
    this._state = 'INITIALIZING'

    //Add this to the main handlers
    Input.AddInputHandler(this)

    this.OnInit()

    this._state = 'UPDATE'
  }

  Render() {
    this.OnRender()
  }

  Update() {
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
}
