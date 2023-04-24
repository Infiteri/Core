import Core from '../Engine/Core.js'

class Sandbox extends Core.Application {
  OnInit() {
    this._configuration.title = 'Game'

    Core.TextureManager.Add('crate', '/crate.png')

    this.square = new Core.Mesh2D(new Core.SquareGeometry())
    this.square.position.x = 100
    this.square.position.y = 100
    this.square.Init()

    this.sprite = new Core.Sprite2D('crate', 100, 100)
    this.sprite.Init()
  }

  OnRender() {
    this.sprite.Render()
    this.square.Render()
  }

  OnUpdate() {
    const speed = 10

    if (Core.Input.IsKeyDown('KeyW')) {
      Core.Renderer._state.mainCamera.position.y += speed
    }

    if (Core.Input.IsKeyDown('KeyS')) {
      Core.Renderer._state.mainCamera.position.y -= speed
    }

    if (Core.Input.IsKeyDown('KeyD')) {
      Core.Renderer._state.mainCamera.position.x -= speed
    }

    if (Core.Input.IsKeyDown('KeyA')) {
      Core.Renderer._state.mainCamera.position.x += speed
    }
  }
}

// Re-write the entry point
Core.Engine.CreateApplication = () => {
  return new Sandbox()
}

// Start the game
Core.Engine.Initialize()
