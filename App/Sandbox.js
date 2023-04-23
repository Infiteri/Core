import Core from '../Engine/Core.js'

class Sandbox extends Core.Application {
  OnRender() {}

  OnInput(input) {}
}

// Re-write the entry point
Core.Engine.CreateApplication = () => {
  return new Sandbox()
}

// Start the game
Core.Engine.Initialize()
