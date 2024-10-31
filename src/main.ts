import './style.css'
import { loadGame } from './loadGame'
import { Scene } from './Scene'
import { ScorePanel } from './ui/ScorePanel'
import { Hearts } from './ui/Hearts'
import { Menu } from './ui/Menu'
import { GameOver } from './ui/GameOver'

(async () => {
  // Initialize the scene
  const scene = new Scene({
    shadows: true,
  })
  scene.init()
  await scene.initPhysics()

  // Load game
  loadGame(scene)

  // Initialize UI
  new Menu()
  new ScorePanel()
  new Hearts()
  new GameOver()
})()
