import Logger from '../../Core/Logger.js'
import Renderer, { gl } from '../Renderer.js'

export default class Shader {
  constructor(vertexSource, fragmentSource) {
    this.vertexSource = vertexSource
    this.fragmentSource = fragmentSource

    const vertexShader = this._LoadShader(gl.VERTEX_SHADER)
    const fragmentShader = this._LoadShader(gl.FRAGMENT_SHADER)

    this.program = this._LoadProgram(vertexShader, fragmentShader)
  }

  /** @private */
  _LoadProgram(vertexShader, fragmentShader) {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    const error = gl.getProgramInfoLog(program).trim()
    if (error !== '') {
      Logger.Error(error)
      gl.deleteProgram(program)
      return null
    }

    return program
  }

  /** @private */
  _LoadShader(type) {
    let source = ''
    if (type === gl.VERTEX_SHADER) {
      source = this.vertexSource
    } else if (type === gl.FRAGMENT_SHADER) {
      source = this.fragmentSource
    } else {
      Logger.Error('Invalid shader type. (Engine side error)')
      return null
    }

    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    const error = gl.getShaderInfoLog(shader).trim()
    if (error !== '') {
      Logger.Error(error)
      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  /**
   * Returns a uniform location based on the name provided
   *
   * @param {string} name The name to search for
   */
  GetUni(name) {
    this.Use()
    const location = gl.getUniformLocation(this.program, name)

    return location
  }

  Use() {
    gl.useProgram(this.program)
  }

  Detach() {
    gl.useProgram(null)
  }

  Mat4(name, data = []) {
    const location = this.GetUni(name)

    gl.uniformMatrix4fv(location, false, data)
  }

  Int(name, int = 0) {
    const location = this.GetUni(name)

    gl.uniform1i(location, int)
  }

  Vec4fv(name, data) {
    const location = this.GetUni(name)

    gl.uniform4fv(location, data)
  }
}
