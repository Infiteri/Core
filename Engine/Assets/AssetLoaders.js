import AssetManager from './AssetManager.js'
import { ImageAsset, JSAsset, ShaderAsset } from './Assets.js'

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

export class ShaderAssetLoader extends AssetLoader {
  extensions = ['glsl']

  LoadAsset(name) {
    const request = new XMLHttpRequest()
    request.open('GET', name)
    request.onload = this.OnShaderLoaded.bind(this, name, request)
    request.send()
  }

  OnShaderLoaded(name, request) {
    const text = request.responseText.split('#FRAGMENT')
    const config = {
      vertex: text[0].substring(7, text[0].length),
      fragment: text[1],
    }

    const asset = new ShaderAsset(name, config)

    AssetManager.OnAssetLoaded(asset)
  }
}

