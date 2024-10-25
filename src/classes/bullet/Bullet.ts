import { FComponent, FScene, FShapes } from '@fibbojs/3d'
import * as THREE from 'three'

export interface LaserBulletOptions {
  startPosition?: { x: number, y: number, z: number },
  endPosition?: { x: number, y: number, z: number },
  color?: THREE.Color
}

const BULLET_SPEED = 10

export class LaserBullet extends FComponent {
  __MESH__: THREE.Mesh
  lifespan: number
  initialLifespan: number
  startPosition: { x: number, y: number, z: number }
  endPosition: { x: number, y: number, z: number }

  constructor(scene: FScene, options?: LaserBulletOptions) {
    super(scene, {
      position: options?.startPosition,
    })

    // Set default options
    const DEFAULT_OPTIONS = {
      startPosition: { x: 0, y: 5, z: 0 },
      endPosition: { x: 0, y: 10, z: 10 },
      color: new THREE.Color(0xFFFFFF)
    }
    options = { ...DEFAULT_OPTIONS, ...options }
    // Validate options
    if (!options.startPosition || !options.endPosition || !options.color) {
      throw new Error('Invalid options')
    }

    // Store options
    this.startPosition = options.startPosition
    this.endPosition = options.endPosition

    // Create the bullet mesh
    const geometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 32)
    const material = new THREE.MeshPhongMaterial({
      color: options.color,
      emissive: options.color,
      emissiveIntensity: 1,
      shininess: 200,
      transparent: true,
      opacity: 0.1,
    })

    // Create the mesh
    this.__MESH__ = new THREE.Mesh(geometry, material)
    // Compute rotation needed to align the bullet with the direction
    const direction = new THREE.Vector3(
      options.endPosition.x - options.startPosition.x,
      options.endPosition.y - options.startPosition.y,
      options.endPosition.z - options.startPosition.z
    )
    const axis = new THREE.Vector3(0, 1, 0)
    this.__MESH__.quaternion.setFromUnitVectors(axis, direction.clone().normalize())
    // Copy rotation to transform
    this.transform.__ROTATION__ = new THREE.Euler().setFromQuaternion(this.__MESH__.quaternion)

    // Define the bullet's lifespan
    this.lifespan = 200
    this.initialLifespan = this.lifespan

    // Create sensor
    this.initSensor({
      shape: FShapes.CAPSULE,
      scaleOffset: { x: -0.6, y: 0.8, z: -0.6 },
    })

    this.emitOnLoaded()
    this.__UPDATE_POSITION__(true)
  }

  frame(delta: number) {
    this.lifespan -= 100 * delta

    // Move the bullet
    this.transform.position = {
      x: this.transform.position.x + (this.endPosition.x - this.startPosition.x) * BULLET_SPEED * delta,
      y: this.transform.position.y + (this.endPosition.y - this.startPosition.y) * BULLET_SPEED * delta,
      z: this.transform.position.z + (this.endPosition.z - this.startPosition.z) * BULLET_SPEED * delta,
    }

    // When the bullet reaches the end position, destroy it
    if (this.lifespan <= 0) {
      this.scene.removeComponent(this)
    }

    /**
     * VFX
     */
    // Fade out the bullet as it reaches the end of its lifespan
    // @ts-ignore
    this.__MESH__.material.opacity = this.lifespan / this.initialLifespan
  }
}