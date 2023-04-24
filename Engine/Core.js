import AssetManager from './Assets/AssetManager.js'
import Application from './core/Application.js'
import Engine from './Core/Engine.js'
import Logger from './Core/Logger.js'
import Window from './Core/Window.js'
import Input from './Event/Input.js'
import TextureManager from './Manager/TextureManager.js'
import MathUtils from './Math/MathUtils.js'
import MessageBus from './Messages/MessageBus.js'
import { SquareGeometry } from './Renderer/Objects2D/Geometries/SquareGeometry.js'
import { TriangleGeometry } from './Renderer/Objects2D/Geometries/TriangleGeometry.js'
import { Mesh2D } from './Renderer/Objects2D/Mesh2D.js'
import Sprite2D from './Renderer/Objects2D/Sprite2D.js'
import Renderer from './Renderer/Renderer.js'
import Buffer from './Renderer/WebGL/Buffer.js'
import Shader from './Renderer/WebGL/Shader.js'

export default class Core {
  //Modules
  static Engine = Engine
  static Application = Application
  static Input = Input
  static Logger = Logger
  static Window = Window

  static AssetManager = AssetManager
  static MessageBus = MessageBus

  static Renderer = Renderer
  static Shader = Shader
  static Buffer = Buffer
  static Sprite2D = Sprite2D

  // render 2d spec
  static Mesh2D = Mesh2D
  static SquareGeometry = SquareGeometry
  static TriangleGeometry = TriangleGeometry

  static MathUtils = MathUtils
  static TextureManager = TextureManager
}
