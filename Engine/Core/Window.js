export default class Window {
  constructor(appConfig) {
    this._state = {
      title: appConfig.title,
      width: appConfig.width,
      height: appConfig.height,
      resize: appConfig.resize,
      canvas: document.querySelector('canvas'),
    }

    //On startup
    document.title = this._state.title

    this._SetData() // Update the state
    this._Resizing() // Setup resizing
  }

  Reset(newAppConfig) {
    this._state = {
      title: newAppConfig.title,
      width: newAppConfig.width,
      height: newAppConfig.height,
      resize: newAppConfig.resize,
      canvas: document.querySelector('canvas'),
    }

    //On startup
    document.title = this._state.title

    this._SetData() // Update the state
  }

  /** @private */
  _SetData() {
    const { width, height, canvas } = this._state

    canvas.width = width
    canvas.height = height
  }

  /** @private */
  _Resizing() {
    //TODO: Maybe from events.
    window.onresize = () => {
      if (this._state.resize) {
        this._state.width = innerWidth
        this._state.height = innerHeight
        this._SetData()
      }
    }
  }
}
