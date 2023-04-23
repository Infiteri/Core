import Application from './core/Application.js'
import Engine from './Core/Engine.js'
import Logger from './Core/Logger.js'
import Window from './Core/Window.js'
import Input from './Event/Input.js'

export default class Core {
  //Modules
  static Engine = Engine
  static Application = Application
  static Input = Input
  static Logger = Logger
  static Window = Window
}
