import type { FControllerOptions, FVector3 } from '@fibbojs/3d'
import { FController } from '@fibbojs/3d'
import Meteor from './Meteor'
import { GameState } from '../../GameState'

export interface MeteorControllerOptions extends FControllerOptions {
  component: Meteor
  startPosition: FVector3
  endPosition: FVector3
}

/**
 * Meteor controller that will be used to move meteors.
 */
export class MeteorController extends FController {
  declare component: Meteor
  startPosition: FVector3
  endPosition: FVector3

  constructor(options: MeteorControllerOptions) {
    super(options)
    this.startPosition = options.startPosition
    this.endPosition = options.endPosition
  }

  frame(delta: number): void {
    // Move the meteor
    this.component.transform.position = {
      x: this.component.transform.position.x + (this.endPosition.x - this.startPosition.x) * delta * Math.log(GameState.speed / 100 + 1) / 2,
      y: this.component.transform.position.y + (this.endPosition.y - this.startPosition.y) * delta * Math.log(GameState.speed / 100 + 1) / 2,
      z: this.component.transform.position.z + (this.endPosition.z - this.startPosition.z) * delta * Math.log(GameState.speed / 100 + 1) / 2,
    }
    // Rotate the meteor
    this.component.transform.rotationDegreeY += delta * 300
    // If it reached the end position, remove it
    if (this.component.transform.position.y <= this.endPosition.y) {
      this.component.scene.removeComponent(this.component)
    }
  }
}
