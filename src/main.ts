import { FAmbientLight, FComponentEmpty, FCuboid, FDirectionalLight, FGameCamera, FRigidBodyType, FScene } from '@fibbojs/3d'
import { FKeyboard } from '@fibbojs/event'
import { fDebug } from '@fibbojs/devtools'
import './style.css'
import Character from './classes/Character'

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
  // Add ambient light
  new FAmbientLight(scene, {
    color: 0x404040,
    intensity: 20,
  })

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

  // Create a character
  const character = new Character(scene)

  // Attach a camera to the character
  scene.camera = new FGameCamera(scene, { target: character })

  // Add collision events
  character.onCollisionWith(deathZone, () => {
    console.log('Character fell into the death zone!')
    character.transform.position = { x: 0, y: 10, z: 0 }
  })

  // Create keyboard
  const keyboard = new FKeyboard(scene)
  keyboard.onKeyDown('p', () => {
    character.transform.position = { x: 0, y: 5, z: 0 }
  })
})()
