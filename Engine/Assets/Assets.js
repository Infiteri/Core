// All the assets
export class Asset {
  constructor(name, data) {
    this.name = name
    this.data = data
  }
}

export class ImageAsset extends Asset {
  //   constructor(name, data) {
  //     this.name = name
  //     this.data = data
  //   }

  get width() {
    return this.data.width
  }

  get height() {
    return this.data.height
  }
}
