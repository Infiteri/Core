import Core from '../Engine/Core.js'
import MainLevel from './content/MainLevel.js'
import PlayerScript from './content/PlayerScript.js'

class Sandbox extends Core.Application {
  OnInit() {
    this._configuration.title = 'Game'

    Core.ScriptManager.Add('PlayerScript', PlayerScript)

    const mainCamera = new Core.OrthographicCamera()
    Core.Renderer.SetOrthographicCamera(mainCamera)

    Core.LevelManager.Add('Main', new MainLevel())
    Core.LevelManager.Start('Main')
  }
}

// Re-write the entry point
Core.Engine.CreateApplication = () => {
  return new Sandbox()
}

// Start the game
Core.Engine.Initialize()
