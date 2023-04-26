import Core from '../../Engine/Core.js'
import Level from '../../Engine/World/Level/Level.js'

export default class MainLevel extends Level {
  Init() {
    Core.TextureManager.Add('textureSprite', './assets/crate.png')

    const sprite = new Core.Sprite2DComponent('PlayerSprite', 'textureSprite')
    this.AddComponent(sprite)

    super.Init()
  }
}
