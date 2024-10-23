import { FGLB } from '@fibbojs/3d'
import type { FScene } from '@fibbojs/3d'

export default class Craft extends FGLB {
  constructor(scene: FScene) {
    super(scene, {
      name: 'craft_speederA',
      position: { x: 0, y: 3, z: 0 },
      scale: { x: 2, y: 2, z: 2 },
    })

    // Initialize the character controller
    /*
    this.controller = new FCharacterControllerKP(scene, {
      component: this,
    })
    */
  }
}
