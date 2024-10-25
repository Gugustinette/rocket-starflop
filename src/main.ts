import { FFixedCamera, FGameCamera } from '@fibbojs/3d'
import { FKeyboard } from '@fibbojs/event'
import { fDebug } from '@fibbojs/devtools'
import './style.css'
import { loadGame } from './loadGame'
import Craft from './classes/craft/Craft'
import { CraftController } from './classes/craft/CraftControllerDebug'
import { Scene } from './Scene'

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

  // Create the camera
  scene.camera = new FFixedCamera(scene, {
    position: { x: 0, y: 12, z: 20 },
    rotationDegree: { x: -10, y: 0, z: 0 },
  })

  // Create keyboard
  const keyboard = new FKeyboard(scene)
  keyboard.onKeyDown('p', () => {
    craft.transform.position = { x: 0, y: 5, z: 0 }
  })

  if (false) {
    craft.controller = new CraftController(scene, { 
      component: craft 
    })
    scene.camera = new FGameCamera(scene, {
      target: craft,
    })
  }
})()
