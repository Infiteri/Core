import Core from '../../Engine/Core.js'
import { BaseScript } from '../../Engine/Script/BaseScript.js'

export default class PlayerScript extends BaseScript {
  OnUpdate() {
    const i = Core.Input
    const t = this.owner.transform

    if (i.IsKeyDown('KeyA')) {
      t.position.x -= 10
    }

    if (i.IsKeyDown('KeyD')) {
      t.position.x += 10
    }

    if (i.IsKeyDown('KeyW')) {
      t.position.y -= 10
    }

    if (i.IsKeyDown('KeyS')) {
      t.position.y += 10
    }
  }
}
