export default class Color {
  /**
   * @param {number} r The red channel
   * @param {number} g The green channel
   * @param {number} b The blue channel
   * @param {number} a The alpha channel
   *
   * White by default
   */
  constructor(r = 255, g = 255, b = 255, a = 255) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  static get white() {
    return new Color()
  }

  static get red() {
    return new Color(255, 0, 0)
  }

  static get blue() {
    return new Color(0, 255, 0)
  }

  static get green() {
    return new Color(0, 0, 255)
  }

  Get32Array() {
    const { r, g, b, a } = this

    return new Float32Array([r / 255, g / 255, b / 255, a / 255])
  }
}
