import { TInputType } from '../Common/types.js'

export class InputEvent {
  /**
   * @param {TInputType} type
   * @param {any} context
   */
  constructor(type, context) {
    this.type = type
    this.context = context
  }
}

class KeyContext {
  constructor({ code, key, keyCode }) {
    this.code = code
    this.key = key
    this.keyCode = keyCode
  }
}

export class InputHandler {
  /**
   * @param {InputEvent} input
   */
  OnInput(input) {}
}

export default class Input {
  /** @type {Object.<string, boolean>} */
  static _keys = {}

  /** @type {InputHandler[]} */
  static _handlers = []

  static _init = false

  static IsLoaded() {
    return this._init
  }

  /**
   * Adds a new input handler to the list of handlers
   * @param {InputHandler} handler A class with "OnInput" function (not necessary extended by InputHandler)
   */
  static AddInputHandler(handler) {
    this._handlers.push(handler)
  }

  /**
   * Adds all the necessary event listeners
   *
   * Started by the engine
   */
  static Initialize() {
    if (this._init) return

    this._init = true

    addEventListener('keydown', event => {
      const { code, key, keyCode } = event

      this._keys[code] = true
      this._keys[key] = true
      this._keys[keyCode] = true

      this._SendInput('KEYDOWN', new KeyContext({ code, key, keyCode }))
    })

    addEventListener('keyup', event => {
      const { code, key, keyCode } = event

      this._keys[code] = false
      delete this._keys[code]
      this._keys[key] = false
      delete this._keys[key]
      this._keys[keyCode] = false
      delete this._keys[keyCode]

      this._SendInput('KEYUP', new KeyContext({ code, key, keyCode }))
    })
  }

  /**
   * Returns if a key is held down
   *
   * @param {any} value Can be: Code, Key, KeyCode
   *
   * @returns {boolean} True if held
   */
  static IsKeyDown(value) {
    if (!this._init) {
      console.warn('Input.IsKeyPressed: Subsystem not started')
      return
    }

    return this._keys[value] || false
  }

  /**
   * @private
   * @param {TInputType} type
   * @param {any} context
   */
  static _SendInput(type, context) {
    for (let i = 0; i < this._handlers.length; i++) {
      const handler = this._handlers[i]
      handler.OnInput(new InputEvent(type, context))
    }
  }
}
