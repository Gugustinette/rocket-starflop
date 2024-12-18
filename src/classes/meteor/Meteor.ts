import type {FRigidBodyOptions, FScene} from '@fibbojs/3d'
import { MeteorController } from './MeteorController'
// import { FGLBToon } from '../util/FGLBToon'
import { BTP } from '../btp/BTP'

export default class Meteor extends BTP {
  score: number = 100

  constructor(scene: FScene) {
    // Randomize the start and end position
    const startPosition = {
      x: Math.random() * 80 - 40,
      y: 50,
      z: -200,
    }
    const endPosition = {
      x: (startPosition.x + 40) / 80 * 10 - 5,
      y: 8,
      z: 20,
    }
    super(scene, {
      name: 'meteor_detailed',
      position: startPosition,
      scale: { x: 8, y: 8, z: 8 },
      lifePoints: 6,
    })

    this.controller = new MeteorController({
      component: this,
      startPosition: startPosition,
      endPosition: endPosition,
    })

    this.createSensor()
  }

  getOptionSensor(): FRigidBodyOptions {
    return {
      positionOffset: { x: 0, y: 2, z: 0 },
      scaleOffset: { x: -6.5, y: -7, z: -6.5 },
    }
  }

  emitOnLoaded(): void {
    if (!this.__MESH__) return
    this.__MESH__ = this.__MESH__.children[0] as any
    this.__UPDATE_POSITION__(true)
    this.__UPDATE_SCALE__(true)
    super.emitOnLoaded()
  }
}
