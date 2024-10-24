import { FGLB } from '@fibbojs/3d'
import type { FScene } from '@fibbojs/3d'
import CraftCursor from '../util/CraftCursor'

const CRAFT_ANGLE = 120

export default class Craft extends FGLB {
  cursor: CraftCursor

  constructor(scene: FScene) {
    super(scene, {
      name: 'craft_speederA',
      position: { x: 0, y: 3, z: 0 },
      scale: { x: 2, y: 2, z: 2 },
    })

    this.cursor = new CraftCursor()
  }

  frame(delta: number): void {
    // Rotate the craft
    this.transform.rotationDegreeY = (1 - this.cursor.mouseProgression.x) * CRAFT_ANGLE - CRAFT_ANGLE / 2
    this.transform.rotationDegreeX = (1 - this.cursor.mouseProgression.y) * CRAFT_ANGLE - CRAFT_ANGLE / 2
    super.frame(delta)
  }
  
  emitOnLoaded(): void {
    if (!this.__MESH__) return
    this.__MESH__ = this.__MESH__.children[0] as any
    super.emitOnLoaded()
  }
}
