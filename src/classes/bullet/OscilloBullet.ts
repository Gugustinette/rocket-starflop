import { FScene } from '@fibbojs/3d'
import { Bullet, BulletOptions } from './Bullet'

const BULLET_SPEED = 5

export class OscilloBullet extends Bullet {
  constructor(scene: FScene, options?: BulletOptions) {
    super(scene, {
      color: 0xC0682B,
      ...options,
    })
  }

  frame(delta: number) {
    this.lifespan -= 100 * delta

    // Move the bullet
    this.transform.position = {
      x: this.transform.position.x + (this.endPosition.x - this.startPosition.x) * BULLET_SPEED * delta,
      y: this.transform.position.y + (this.endPosition.y - this.startPosition.y) * BULLET_SPEED * delta,
      z: this.transform.position.z + (this.endPosition.z - this.startPosition.z) * BULLET_SPEED * delta + 1 * Math.sin(this.lifespan / 10),
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