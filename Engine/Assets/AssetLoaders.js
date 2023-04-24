import AssetManager from './AssetManager.js'
import { ImageAsset } from './Assets.js'

// All the asset loaders
export class AssetLoader {
  extensions = []

  LoadAsset(asset) {}
}

export class ImageAssetLoader extends AssetLoader {
  extensions = ['png', 'gif', 'jif', 'jpeg']

  LoadAsset(name) {
    const img = new Image()
    img.onload = this.OnImageLoaded.bind(this, name, img)
    img.src = name
  }

  OnImageLoaded(name, image) {
    const asset = new ImageAsset(name, image)

    AssetManager.OnAssetLoaded(asset)
  }
}
