import Engine from './Engine.js'

export default class Logger {
  static Initialize() {}

  static Info(message) {
    console.info(`%c[INFO]: ${message}`, 'color: gray')
  }

  static Warn(message) {
    console.info(`%c[WARN]: ${message}`, 'color: yellow')
  }

  static Error(message) {
    console.info(`%c[ERROR]: ${message}`, 'color: red')
  }

  static Log(message) {
    console.info(`[LOG]: ${message}`)
  }

  static Important(message) {
    console.info(`%c[IMPORTANT]: ${message}`, `color: #00ff00;`)
  }

  static Trace() {
    console.trace()
  }

  static Assert(condition = true, message) {
    if (condition === null || condition === undefined) {
      this.Fatal(message)
    }
  }

  static Fatal(message) {
    console.info(`%c[FATAL]: ${message}`, 'color: red')
    Engine.Destroy()
  }

  static ColorLog(message, color = 'white') {
    console.info(`%c${message}`, `color: ${color}`)
  }
}
