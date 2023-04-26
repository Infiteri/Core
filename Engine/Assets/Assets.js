// All the assets
export class Asset {
  constructor(name, data) {
    this.name = name
    this.data = data
  }
}

export class ShaderAsset extends Asset {}

export class JSAsset extends Asset {}

export class ImageAsset extends Asset {
  get width() {
    return this.data.width
  }

  get height() {
    return this.data.height
  }
}
