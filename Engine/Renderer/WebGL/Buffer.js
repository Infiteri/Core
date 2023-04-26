import { TBufferConfig } from '../../Common/types.js'
import Renderer, { gl } from '../Renderer.js'

class BufferLayout {
  constructor(location, offset, size) {
    this.location = location
    this.offset = offset
    this.size = size
  }
}

export default class Buffer {
  /**
   * @param {TBufferConfig} config
   */
  constructor(config = {}) {
    this.data = config.data
    this.size = config.size

    //NOTE: Important stuff
    this.buffer = gl.createBuffer()
    this.bufferType = config.bufferType || gl.ARRAY_BUFFER
    this.usage = config.usage || gl.STATIC_DRAW
    this.drawMode = config.drawMode || gl.TRIANGLES

    /** @type {BufferLayout[]} */
    this.layouts = []

    //Binding info
    this.type = gl.FLOAT
    this.typeSize = Float32Array.BYTES_PER_ELEMENT
    this.stride = this.size * this.typeSize
  }

  AddLayout(location, offset, size) {
    this.layouts.push(new BufferLayout(location, offset, size))
  }

  Init() {
    this.Bind()
    this.Upload()
  }

  Bind() {
    gl.bindBuffer(this.bufferType, this.buffer)

    //Binding each layout
    for (const { location, offset, size } of this.layouts) {
      gl.vertexAttribPointer(
        location,
        size,
        this.type,
        false,
        this.stride,
        offset * this.typeSize
      )
      gl.enableVertexAttribArray(location)
    }
  }

  Unbind() {
    gl.bindBuffer(this.bufferType, null)
  }

  Upload() {
    gl.bufferData(this.bufferType, new Float32Array(this.data), this.usage)
  }

  Draw() {
    if (!Renderer.GetShader()) return

    if (this.bufferType === gl.ARRAY_BUFFER) {
      gl.drawArrays(this.drawMode, 0, this.data.length / this.size)
    } else {
      //TODO: Fill
    }
  }
}
