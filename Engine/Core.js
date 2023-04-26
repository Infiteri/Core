// Imports for Core Modules
import Application from './core/Application.js'
import Engine from './Core/Engine.js'
import Logger from './Core/Logger.js'
import Window from './Core/Window.js'

// Imports for Asset Management
import AssetManager from './Assets/AssetManager.js'
import TextureManager from './Manager/TextureManager.js'

// Imports for Event Handling
import Input from './Event/Input.js'

// Imports for WebGL Rendering
import Renderer from './Renderer/Renderer.js'
import Buffer from './Renderer/WebGL/Buffer.js'
import Shader from './Renderer/WebGL/Shader.js'

// Imports for 2D Rendering
import { Mesh2D } from './Renderer/Objects2D/Mesh2D.js'
import { SquareGeometry } from './Renderer/Objects2D/Geometries/SquareGeometry.js'
import { TriangleGeometry } from './Renderer/Objects2D/Geometries/TriangleGeometry.js'

import Sprite2D from './Renderer/Objects2D/Sprite2D.js'
import OrthographicCamera from './Renderer/Camera/OrthographicCamera.js'

// Imports for World Management
import Node from './World/Node.js'
import Scene from './World/Scene.js'
import Level from './World/Level/Level.js'
import LevelManager from './World/Level/LevelManager.js'
import Mesh2DComponent from './World/Components/Mesh2DComponent.js'

// Imports for Math Utilities
import MathUtils from './Math/MathUtils.js'
import ScriptManager from './Script/ScriptManager.js'
import Sprite2DComponent from './World/Components/Sprite2DComponent.js'

export default class Core {
  // Core Modules
  static Engine = Engine
  static Application = Application
  static Input = Input
  static Logger = Logger
  static Window = Window

  // Asset Management
  static AssetManager = AssetManager
  static TextureManager = TextureManager
  static ScriptManager = ScriptManager

  // Event Handling
  static Input = Input

  // WebGL Rendering
  static Renderer = Renderer
  static Buffer = Buffer
  static Shader = Shader

  // 2D Rendering
  static Mesh2D = Mesh2D
  static Sprite2D = Sprite2D
  static SquareGeometry = SquareGeometry
  static TriangleGeometry = TriangleGeometry
  static OrthographicCamera = OrthographicCamera

  // World Management
  static Node = Node
  static Scene = Scene
  static Level = Level
  static LevelManager = LevelManager
  static Mesh2DComponent = Mesh2DComponent
  static Sprite2DComponent = Sprite2DComponent

  // Math Utilities
  static MathUtils = MathUtils
}
