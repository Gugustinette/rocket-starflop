import Craft from "../craft/Craft"
import { LaserBullet } from "./LaserBullet"

export class LaserGun {
  level: number
  craft: Craft

  constructor(craft: Craft) {
    this.level = 1
    this.craft = craft
  }

  shoot(clickProgression: { x: number, y: number }) {
    if (this.level === 3) {
      // Shoot 3 bullets at the same time, one on the left, one on the right and one in the middle
      new LaserBullet(this.craft.scene, {
        startPosition: { x: this.craft.transform.position.x - 0.5, y: this.craft.transform.position.y, z: this.craft.transform.position.z },
        endPosition: { x: clickProgression.x * 60 - 30 - 0.5, y: (1 - clickProgression.y) * 20 - 2, z: 0 },
      })
      new LaserBullet(this.craft.scene, {
        startPosition: this.craft.transform.position,
        endPosition: { x: clickProgression.x * 60 - 30, y: (1 - clickProgression.y) * 20 - 2, z: 0 },
      })
      new LaserBullet(this.craft.scene, {
        startPosition: { x: this.craft.transform.position.x + 0.5, y: this.craft.transform.position.y, z: this.craft.transform.position.z },
        endPosition: { x: clickProgression.x * 60 - 30 + 0.5, y: (1 - clickProgression.y) * 20 - 2, z: 0 },
      })
    } else if (this.level === 2) {
      // Shoot 2 bullets at the same time, one on the left and one on the right
      new LaserBullet(this.craft.scene, {
        startPosition: { x: this.craft.transform.position.x - 0.5, y: this.craft.transform.position.y, z: this.craft.transform.position.z },
        endPosition: { x: clickProgression.x * 60 - 30 - 0.5, y: (1 - clickProgression.y) * 20 - 2, z: 0 },
      })
      new LaserBullet(this.craft.scene, {
        startPosition: { x: this.craft.transform.position.x + 0.5, y: this.craft.transform.position.y, z: this.craft.transform.position.z },
        endPosition: { x: clickProgression.x * 60 - 30 + 0.5, y: (1 - clickProgression.y) * 20 - 2, z: 0 },
      })
    } else {
      new LaserBullet(this.craft.scene, {
        startPosition: this.craft.transform.position,
        endPosition: { x: clickProgression.x * 60 - 30, y: (1 - clickProgression.y) * 20 - 2, z: 0 },
      })
    }
  }
}