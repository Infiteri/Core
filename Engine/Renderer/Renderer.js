import Camera from './Camera/Camera.js'
import OrthographicCamera from './Camera/OrthographicCamera.js'
import Shader from './WebGL/Shader.js'

/** The main gl context used all throughout the engine.*/
export const gl = document.querySelector('canvas').getContext('webgl2')

const vs = `
  attribute vec3 aPosition;
  attribute vec2 aUVs;

  uniform mat4 uCamera;
  uniform mat4 uMesh;

  varying vec2 vUVs;

  void main() 
  {
    gl_Position = uCamera * uMesh * vec4(aPosition, 1.0);
    vUVs = aUVs;
  }
`

const fs = `
  precision mediump float;

  uniform vec4 uColor;
  uniform sampler2D uSampler;
  uniform int useTexture;

  varying vec2 vUVs;

  void main() 
  {
    vec4 finalColor = uColor;

    if(useTexture == 1) {
      finalColor = uColor * texture2D(uSampler, vUVs);
    }

    gl_FragColor = finalColor;
  }
`

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

  static IsLoaded() {
    return this._state.init
  }

  //NOTE: Initialization check should be performed by the Engine static class
  static Initialize() {
    //Set flags
    this._state.init = true

    //Set the main shader
    this._state.mainShader = new Shader(vs, fs)

    //Set the main camera
    this._state.mainCamera = new OrthographicCamera()

    //Gets set when the shaders are fully loaded
    this._state.render = true
  }

  /**
   * Clears the screen, use the basic shader, update the camera and other.
   *
   * @returns {void}
   */
  static Render() {
    if (!this._state.render) return

    //TODO: Remove
    gl.clearColor(0, 0, 0, 1)

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
    if (!this._state.render || !this._state.init) return

    gl.viewport(0, 0, width, height)

    //DONE: Camera resizing
    if (this._state.mainCamera !== null) {
      this._state.mainCamera.Recalculate()
    }
  }

  // Utils
  static ClearScreen() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }
}
