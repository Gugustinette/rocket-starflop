import * as THREE from 'three'
import type { FScene } from '@fibbojs/3d'
import { CraftController } from './CraftController'
import { FGLBToon } from '../util/FGLBToon'
import { LaserGun } from '../weapon/LaserGun'
import { OscilloGun } from '../weapon/OscilloGun'
import { CraftState, GameState, State } from '../../GameState'
import {LevelUpPanel} from "../../ui/LevelUpPanel.ts";
import Meteor from '../meteor/Meteor.ts'
import {RocketBase} from "../btp/Rocket.ts";
import {AudioManager} from "../../audio/AudioManager.ts";

export default class Craft extends FGLBToon {
  // Metadata
  level: number
  // Guns
  laserGun: LaserGun
  oscilloGun: OscilloGun

  constructor(scene: FScene) {
    super(scene, {
      name: 'craft_speederA',
      position: { x: 0, y: 10, z: 20 },
      scale: { x: 2, y: 2, z: 2 },
    })

    // Initialize metadata
    this.level = 1

    // Initialize guns
    this.laserGun = new LaserGun(this)
    this.oscilloGun = new OscilloGun(this)

    GameState.onStateChange((state) => {
      if (state === State.GAME_OVER) {
        this.level = 1
        this.laserGun.level = 1
        this.oscilloGun.level = 0
      }
    })
    GameState.onCraftStateChange((state) => {
      if (state === CraftState.WAITING) {
        this.transform.position = { x: 0, y: 10, z: 20 }
        this.transform.rotation = { x: 0, y: 0, z: 0 }
      }
    })
    GameState.onScoreChange((score) => {
      if (score >= 100 && this.level === 1) {
        this.levelUp()
      } else if (score >= 300 && this.level === 2) {
        this.levelUp()
      } else if (score >= 500 && this.level === 3) {
        this.levelUp()
      } else if (score >= 1000 && this.level === 4) {
        this.levelUp()
      } else if (score >= 2000 && this.level === 5) {
        this.levelUp()
      }
    })

    this.controller = new CraftController({
      component: this,
    })

    this.onCollisionWith(Meteor, ({ component }) => {
      const meteor = component as Meteor
      meteor.explode()
      AudioManager.playHit()
      GameState.health--
    })
    this.onCollisionWith(RocketBase, ({ component }) => {
      if(GameState.state === State.MENU) return
      const rocket = component as RocketBase
      rocket.explode()
      GameState.health--
    });


    this.initSensor({
      positionOffset: { x: 0, y: 0.6, z: 0.5 },
      scaleOffset: { x: -0.8, y: -1.5, z: -0.8 },
    })
  }

  levelUp(): void {
    this.level++
    new LevelUpPanel(this.level)
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
