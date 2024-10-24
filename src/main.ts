import { FAmbientLight, FComponentEmpty, FCuboid, FDirectionalLight, FFixedCamera, FGameCamera, FRigidBodyType, FScene } from '@fibbojs/3d'
import { FKeyboard } from '@fibbojs/event'
import { fDebug } from '@fibbojs/devtools'
import './style.css'
import { loadGame } from './loadGame'
import Craft from './classes/craft/Craft'
import { CraftController } from './classes/craft/CraftControllerDebug'

(async () => {
  // Initialize the scene
  const scene = new FScene({
    shadows: true,
  })
  scene.init()
  await scene.initPhysics()
  // Debug the scene
  if (import.meta.env.DEV)
    fDebug(scene)

  // Add directional light to represent the sun
  new FDirectionalLight(scene, {
    position: { x: 20, y: 20, z: 0 },
    color: 0xFFFFFF,
    intensity: 3,
    shadowQuality: 12,
  })

  new FDirectionalLight(scene, {
    position: { x: 0, y: 20, z: 50 },
    color: 0xFFFFFF,
    intensity: 2,
    shadowQuality: 12,
  })
  // Add ambient light
  new FAmbientLight(scene, {
    color: 0x404040,
    intensity: 20,
  })

  // Load game
  loadGame(scene)

  // Create craft
  new Craft(scene)

  // Create a death zone
  const deathZone = new FComponentEmpty(scene, {
    position: { x: 0, y: -20, z: 0 },
    scale: { x: 100, y: 1, z: 100 },
  })
  deathZone.initCollider()

  // Create a ground
  const ground = new FCuboid(scene, {
    position: { x: 0, y: -0.1, z: 0 },
    scale: { x: 15, y: 0.1, z: 15 },
  })
  ground.initRigidBody({
    rigidBodyType: FRigidBodyType.FIXED,
  })
  ground.setColor(0x348C31)

  // Create the craft
  const craft = new Craft(scene)

  // Create the camera
  scene.camera = new FFixedCamera(scene, {
    position: { x: 0, y: 12, z: 20 },
    rotationDegree: { x: -10, y: 0, z: 0 },
  })

  // Add collision events
  craft.onCollisionWith(deathZone, () => {
    console.log('Craft fell into the death zone!')
    craft.transform.position = { x: 0, y: 10, z: 0 }
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
