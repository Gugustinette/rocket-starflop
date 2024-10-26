import Craft from "../craft/Craft"
import { OscilloBullet } from "./OscilloBullet"

export class OscilloGun {
  level: number
  craft: Craft

  constructor(craft: Craft) {
    this.level = 1
    this.craft = craft
  }

  shoot(clickProgression: { x: number, y: number }) {
    if (this.level === 3) {
      // Shoot 3 bullets at the same time, one on the left, one on the right and one in the middle
      new OscilloBullet(this.craft.scene, {
        startPosition: { x: this.craft.transform.position.x - 0.5, y: this.craft.transform.position.y, z: this.craft.transform.position.z },
        endPosition: { x: clickProgression.x * 60 - 30 - 0.5, y: (1 - clickProgression.y) * 20 - 2, z: 0 },
      })
      new OscilloBullet(this.craft.scene, {
        startPosition: this.craft.transform.position,
        endPosition: { x: clickProgression.x * 60 - 30, y: (1 - clickProgression.y) * 20 - 2, z: 0 },
      })
      new OscilloBullet(this.craft.scene, {
        startPosition: { x: this.craft.transform.position.x + 0.5, y: this.craft.transform.position.y, z: this.craft.transform.position.z },
        endPosition: { x: clickProgression.x * 60 - 30 + 0.5, y: (1 - clickProgression.y) * 20 - 2, z: 0 },
      })
    } else if (this.level === 2) {
      // Shoot 2 bullets at the same time, one on the left and one on the right
      new OscilloBullet(this.craft.scene, {
        startPosition: { x: this.craft.transform.position.x - 0.5, y: this.craft.transform.position.y, z: this.craft.transform.position.z },
        endPosition: { x: clickProgression.x * 60 - 30 - 0.5, y: (1 - clickProgression.y) * 20 - 2, z: 0 },
      })
      new OscilloBullet(this.craft.scene, {
        startPosition: { x: this.craft.transform.position.x + 0.5, y: this.craft.transform.position.y, z: this.craft.transform.position.z },
        endPosition: { x: clickProgression.x * 60 - 30 + 0.5, y: (1 - clickProgression.y) * 20 - 2, z: 0 },
      })
    } else {
      new OscilloBullet(this.craft.scene, {
        startPosition: this.craft.transform.position,
        endPosition: { x: clickProgression.x * 60 - 30, y: (1 - clickProgression.y) * 20 - 2, z: 0 },
      })
    }
  }
}