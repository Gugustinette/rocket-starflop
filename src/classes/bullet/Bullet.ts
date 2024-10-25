import { FComponent, FScene } from '@fibbojs/3d'
import * as THREE from 'three'

export interface LaserBulletOptions {
  startPosition?: { x: number, y: number, z: number },
  endPosition?: { x: number, y: number, z: number },
  color?: THREE.Color
}

const BULLET_SPEED = 2

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
    // Rotate the bullet to face the end position
    this.__MESH__.lookAt(new THREE.Vector3(options.endPosition.x, options.endPosition.y, options.endPosition.z))

    // Add a point light to make the bullet glow
    const light = new THREE.PointLight(options.color, 1, 3)
    this.__MESH__.add(light)

    // Define the bullet's lifespan
    this.lifespan = 100
    this.initialLifespan = this.lifespan

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
    const material = this.__MESH__.material as THREE.MeshPhongMaterial
    // Fade out the bullet as it reaches the end of its lifespan
    const opacityValue = this.lifespan / this.initialLifespan
    material.opacity = opacityValue
  }
}