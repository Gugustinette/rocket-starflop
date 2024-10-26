import { FGameCamera } from '@fibbojs/3d'
import { fDebug } from '@fibbojs/devtools'
import './style.css'
import { loadGame } from './loadGame'
import Craft from './classes/craft/Craft'
import { CraftController } from './classes/craft/CraftControllerDebug'
import { Scene } from './Scene'
import { ScorePanel } from './ui/ScorePanel'

(async () => {
  // Initialize the scene
  const scene = new Scene({
    shadows: true,
  })
  scene.init()
  await scene.initPhysics()
  // Debug the scene
  if (import.meta.env.DEV)
    fDebug(scene)

  // Load game
  loadGame(scene)

  // Create the craft
  const craft = new Craft(scene)

  // Initialize UI
  new ScorePanel()

  if (false) {
    craft.controller = new CraftController(scene, { 
      component: craft 
    })
    scene.debug = true
    scene.camera = new FGameCamera(scene, {
      target: craft,
    })
  }
})()
