import AssetManager from '../Assets/AssetManager.js'
import Message from '../Messages/Message.js'
import MessageBus from '../Messages/MessageBus.js'
import Camera from './Camera/Camera.js'
import OrthographicCamera from './Camera/OrthographicCamera.js'
import Shader from './WebGL/Shader.js'

/** The main gl context used all throughout the engine.*/
export const gl = document.querySelector('canvas').getContext('webgl2')

export default class Renderer {
  /**
   * Main state (shaders, cameras and flags)
   */
  static _state = {
    render: false,
    init: false,

    /** @type {Shader} */
    mainShader: null,

    /** @type {Camera} */
    mainCamera: null,
  }

  static OnMessage(message) {
    const data = message.context.data

    const shader = new Shader(data.vertex, data.fragment)
    this._state.mainShader = shader
    this._state.render = true
  }

  static IsLoaded() {
    return this._state.init
  }

  //NOTE: Initialization check should be performed by the Engine static class
  static Initialize() {
    //Set flags
    this._state.init = true

    //Set the main camera
    this._state.mainCamera = new OrthographicCamera()

    AssetManager.GetAsset('/Engine/Renderer/WebGL/Shaders/MainShader.glsl')
    MessageBus.AddSubscription(
      Message.assetLoaded + '/Engine/Renderer/WebGL/Shaders/MainShader.glsl',
      this
    )
  }

  /**
   * Clears the screen, use the basic shader, update the camera and other.
   *
   * @returns {void}
   */
  static Render() {
    gl.clearColor(0, 0, 0, 1)

    if (!this._state.render) return

    this.ClearScreen()

    //Use the shader
    this._state.mainShader.Use()

    //Send camera matrix to the shader
    this._state.mainCamera.UpdateModel()
    this._state.mainShader.Mat4('uCamera', this._state.mainCamera.final32Matrix)
  }

  static UploadMat4OnShader(name, data) {
    if (!this._state.render || !this._state.init) return

    this._state.mainShader.Mat4(name, data)
  }

  static UploadMeshMat4OnShader(data) {
    if (!this._state.render || !this._state.init) return

    this._state.mainShader.Mat4('uMesh', data)
  }

  static Resize(width = innerWidth, height = innerHeight) {
    gl.viewport(0, 0, width, height)

    //DONE: Camera resizing
    if (this._state.mainCamera !== null) {
      this._state.mainCamera.Recalculate()
    }
  }

  static SetOrthographicCamera(cameraInstance) {
    if (cameraInstance) {
      this._state.mainCamera = cameraInstance
    }
  }

  static GetCamera() {
    return this._state.mainCamera
  }

  static GetShader() {
    return this._state.mainShader
  }

  // Utils
  static ClearScreen() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }
}
