import Logger from '../Core/Logger.js'
import Message from '../Messages/Message.js'
import MessageBus from '../Messages/MessageBus.js'
import {
  AssetLoader,
  ImageAssetLoader,
  ShaderAssetLoader
} from './AssetLoaders.js'
import { Asset } from './Assets.js'

export default class AssetManager {
  static _state = {
    init: false,
  }

  /** @type {AssetLoader[]} */
  static loaders = []

  /** @type {Object.<string, Asset>} */
  static loadedAssets = {}

  static IsLoaded() {
    return this._state.init
  }

  static Initialize() {
    this._state.init = true

    //DONE: Add some default asset loaders
    this.loaders.push(new ImageAssetLoader())
    this.loaders.push(new ShaderAssetLoader())
  }

  static LoadAsset(name) {
    const extension = name.split('.').pop().toLowerCase()

    for (const l of this.loaders) {
      if (l.extensions.indexOf(extension) !== -1) {
        l.LoadAsset(name)
        return
      }
    }

    Logger.Warn(`No loader for extension ${extension}.`)
  }

  /**
   * Returns if the asset is loaded
   *
   * @param {string} name The name to check for
   * @returns {boolean} True if the asset is loaded, otherwise false
   */
  static IsAssetLoaded(name) {
    return this.loadedAssets[name] !== undefined
  }

  /**
   * Returns a asset if loaded, otherwise it tries to load it and undefined is returned
   *
   * @param {string} name The name to check for
   */
  static GetAsset(name) {
    const asset = this.loadedAssets[name]

    if (asset) {
      return asset
    } else {
      this.LoadAsset(name)
    }

    return undefined
  }

  static OnAssetLoaded(asset) {
    this.loadedAssets[asset.name] = asset

    MessageBus.SendMessage(
      Message.assetLoaded + asset.name,
      this,
      asset,
      'NORMAL'
    )
  }
}
