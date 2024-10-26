import * as THREE from 'three'
import type { FScene } from '@fibbojs/3d'
import { CraftController } from './CraftController'
import { FGLBToon } from '../util/FGLBToon'
import { LaserGun } from '../weapon/LaserGun'
import { OscilloGun } from '../weapon/OscilloGun'

export default class Craft extends FGLBToon {
  // Level
  level: number
  // Guns
  laserGun: LaserGun
  oscilloGun: OscilloGun

  constructor(scene: FScene) {
    super(scene, {
      name: 'craft_speederA',
      position: { x: 0, y: 10, z: 17 },
      scale: { x: 2, y: 2, z: 2 },
    })

    // Initialize level
    this.level = 1

    // Initialize guns
    this.laserGun = new LaserGun(this)
    this.oscilloGun = new OscilloGun(this)

    this.controller = new CraftController(scene, {
      component: this,
    })
  }

  levelUp(): void {
    this.level++
    if (this.level === 2) {
      this.laserGun.level = 2
    } else if (this.level === 3) {
      this.oscilloGun.level = 1
    } else if (this.level === 4) {
      this.laserGun.level = 3
    } else if (this.level === 5) {
      this.oscilloGun.level = 2
    } else if (this.level === 6) {
      this.oscilloGun.level = 3
    }
  }

  shoot(clickProgression: { x: number; y: number }): void {
    this.laserGun.shoot(clickProgression)
    this.oscilloGun.shoot(clickProgression)
  }

  emitOnLoaded(): void {
    if (!this.__MESH__) return
    this.__MESH__ = this.__MESH__.children[0] as THREE.Mesh
    this.__UPDATE_POSITION__(true)
    super.emitOnLoaded()
  }
}
