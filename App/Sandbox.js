import Core from '../Engine/Core.js'

class Sandbox extends Core.Application {
  OnInit() {
    this._configuration.title = 'Game'
  }
}

// Re-write the entry point
Core.Engine.CreateApplication = () => {
  return new Sandbox()
}

// Start the game
Core.Engine.Initialize()
