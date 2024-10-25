import * as THREE from 'three'
import type { FScene } from '@fibbojs/3d'
import { CraftController } from './CraftController'
import { FGLBToon } from '../util/FGLBToon'

export default class Craft extends FGLBToon {
  constructor(scene: FScene) {
    super(scene, {
      name: 'craft_speederA',
      position: { x: 0, y: 10, z: 17 },
      scale: { x: 2, y: 2, z: 2 },
    })

    this.controller = new CraftController(scene, {
      component: this,
    })
  }

  emitOnLoaded(): void {
    if (!this.__MESH__) return
    this.__MESH__ = this.__MESH__.children[0] as THREE.Mesh
    this.__UPDATE_POSITION__(true)
    super.emitOnLoaded()
  }
}
