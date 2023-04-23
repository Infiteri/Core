import {
  TInputContextTypes,
  TInputType,
  TMouseButtonType,
  TMouseProps,
} from '../Common/types.js'
import Logger from '../Core/Logger.js'

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
    /** @type {TInputContextTypes} */
    this.type = 'KEY'
    this.isKey = true
    this.code = code
    this.key = key
    this.keyCode = keyCode
  }
}

class MouseMoveContext {
  constructor({ offsetX, offsetY }) {
    /** @type {TInputContextTypes} */
    this.type = 'MOUSEMOVE'
    this.isMouse = true
    this.isMove = true
    this.x = offsetX
    this.y = offsetY
  }
}

class MouseClickContext {
  constructor({ button, offsetX, offsetY }) {
    /** @type {TInputContextTypes} */
    this.type = 'MOUSECLICK'
    this.isMouse = true

    this.isButton = true
    this.x = offsetX
    this.y = offsetY

    /** @type {TMouseButtonType} */
    this.button = ''

    switch (button) {
      case 0:
        this.button = 'LEFT'
        break

      case 1:
        this.button = 'MIDDLE'
        break

      case 2:
        this.button = 'RIGHT'
        break

      default:
        Logger.Info(
          `Mouse button unknown ${button.toString()}, default to LEFT`
        )
        break
    }
  }
}

class MouseReleaseContext {
  constructor({ button, offsetX, offsetY }) {
    /** @type {TInputContextTypes} */
    this.type = 'MOUSERELEASE'
    this.isMouse = true

    this.isButton = true
    this.x = offsetX
    this.y = offsetY

    /** @type {TMouseButtonType} */
    this.button = ''

    switch (button) {
      case 0:
        this.button = 'LEFT'
        break

      case 1:
        this.button = 'MIDDLE'
        break

      case 2:
        this.button = 'RIGHT'
        break

      default:
        Logger.Info(
          `Mouse button unknown ${button.toString()}, default to LEFT`
        )
        break
    }
  }
}

export class InputHandler {
  /**
   * @param {InputEvent} input
   */
  OnInput(input) {}
}

export default class Input {
  /**
   *  @private
   *  @type {Object.<string, boolean>}
   *
   * Table of currently held down keys (value: true)
   */
  static _keys = {}

  /**
   * @type {InputHandler[]}
   * @private
   *
   * List of the handlers
   */
  static _handlers = []

  /**
   * @private
   * @type {TMouseProps}
   * Mouse props
   */
  static _mouse = {
    /** Current mouse position X*/
    posX: 0,

    /** Current mouse position Y */
    posY: 0,

    /** Last position the mouse got clicked X */
    clickX: 0,

    /** Last position the mouse got clicked Y */
    clickY: 0,

    /** Last position the mouse got released X */
    releaseX: 0,

    /** Last position the mouse got released Y */
    releaseY: 0,

    /** Represents if the left mouse button is currently down */
    isDown: false,
  }

  /** @private */
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

    const container = document.querySelector('canvas')

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

    // mouse
    container.addEventListener('mousemove', event => {
      this._mouse.posX = event.offsetX
      this._mouse.posY = event.offsetY

      this._SendInput('MOUSEMOVE', new MouseMoveContext(event))
    })

    container.addEventListener('mousedown', event => {
      this._mouse.clickX = event.offsetX
      this._mouse.clickY = event.offsetY

      this._SendInput('MOUSEDOWN', new MouseClickContext(event))
    })

    container.addEventListener('mouseup', event => {
      this._mouse.releaseX = event.offsetX
      this._mouse.releaseY = event.offsetY

      this._SendInput('MOUSEUP', new MouseReleaseContext(event))
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
   * Returns the current mouse position on the canvas
   *
   * @returns {{x: number, y: number}} The mouse position on the canvas
   */
  static GetMouseCurrentPosition() {
    return { x: this._mouse.posX, x: this._mouse.posY }
  }

  /**
   * Returns the last click position on the canvas
   *
   * @returns {{x: number, y: number}} The last mouse click position on the canvas
   */
  static GetMouseClickPosition() {
    return { x: this._mouse.clickX, x: this._mouse.clickY }
  }

  /**
   * Returns the last release position on the canvas
   *
   * @returns {{x: number, y: number}} The last mouse release position on the canvas
   */
  static GetMouseReleasePosition() {
    return { x: this._mouse.releaseX, x: this._mouse.releaseY }
  }

  /**
   * Returns if the mouse is currently held down
   *
   * @returns {boolean} True if held, otherwise false
   */
  static IsMouseDown() {
    return this._mouse.isDown
  }

  /**
   * Returns the mouse props
   *
   * @returns {TMouseProps}
   */
  static GetMouseProps() {
    return this._mouse
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
