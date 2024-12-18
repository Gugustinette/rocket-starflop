import { FKeyboard } from '@fibbojs/event'
import type { FControllerOptions } from '@fibbojs/3d'
import { FController } from '@fibbojs/3d'
import CraftCursor from './CraftCursor'
import Craft from './Craft'
import { CraftState, GameState } from '../../GameState'
import { AudioManager } from '../../audio/AudioManager'

const CRAFT_ANGLE = 120

export interface CraftControllerOptions extends FControllerOptions {
  component: Craft
}

/**
 * Craft controller that will be used to move the craft.
 */
export class CraftController extends FController {
  /**
   * The craft component.
   */
  declare component: Craft

  /**
   * The inputs that will be used to move the craft.
   */
  inputs: {
    left: boolean
    right: boolean
  }

  /**
   * Autoclicker when the mouse is pressed.
   */
  autoclicker: boolean = false

  /**
   * autoclicker counter
   */
  autoclickerCounter: number = 0

  /**
   * The cursor instance.
   */
  cursor: CraftCursor

  constructor(options: FControllerOptions) {
    super(options)

    // Map of the movements (will be updated by the keyboard)
    this.inputs = {
      left: false,
      right: false,
    }

    // Create a keyboard instance
    const fKeyboard = new FKeyboard(options.component.scene)

    // Key down
    fKeyboard.onKeyDown('a', () => {
      this.inputs.left = true
    })
    fKeyboard.onKeyDown('d', () => {
      this.inputs.right = true
    })
    fKeyboard.onKeyDown('q', () => {
      this.inputs.left = true
    })

    // Key up
    fKeyboard.onKeyUp('a', () => {
      this.inputs.left = false
    })
    fKeyboard.onKeyUp('d', () => {
      this.inputs.right = false
    })
    fKeyboard.onKeyUp('q', () => {
      this.inputs.left = false
    })

    window.addEventListener('mousedown', () => {
      this.autoclicker = true
      this.autoclickerCounter = -100
    })

    window.addEventListener('mouseup', () => {
      this.autoclicker = false
      this.autoclickerCounter = 0
    })

    // Create a cursor instance
    this.cursor = new CraftCursor()
    this.cursor.onClick((clickProgression) => {
      if (GameState.craftState !== CraftState.PLAYING) return
      AudioManager.playShoot()
      // Shoot
      this.component.shoot(clickProgression)
    })
  }

  frame(delta: number): void {
    if (GameState.craftState === CraftState.WAITING) {
      // Nothing to do
    }
    else if (GameState.craftState === CraftState.LAUNCHING) {
      // Move the craft towards its place on the Z axis (From 20 to 17)
      this.component.transform.z += (17 - this.component.transform.z) * delta * 2
      // If the craft is close enough, switch to the playing state
      if (Math.abs(17 - this.component.transform.z) < 0.1) {
        GameState.craftState = CraftState.PLAYING
      }
    }
    else if (GameState.craftState === CraftState.PLAYING) {
      // Move the craft according to the inputs
      if (this.inputs.left) {
        // The farther the craft is from the endpoint on the left, the faster it moves towards it
        this.component.transform.x -= 0.2 * Math.min(1, Math.abs(-2 - this.component.transform.x)) * delta * 36
      } else if (this.inputs.right) {
        // The farther the craft is from the endpoint on the right, the faster it moves towards it
        this.component.transform.x += 0.2 * Math.min(1, 2 - this.component.transform.x) * delta * 36
      }

      // Autoclicker
      if (this.autoclicker) {
        this.autoclickerCounter += (delta * (900))
        if (this.autoclickerCounter > 100) {
          this.cursor.__CALLBACKS_ON_CLICK__.forEach((callback) => callback(this.cursor.mouseProgression))
          this.autoclickerCounter = 0
        }
      }

      // Rotate the craft according to the cursor position
      this.component.transform.rotationDegreeY = (1 - this.cursor.mouseProgression.x) * CRAFT_ANGLE - CRAFT_ANGLE / 2
      this.component.transform.rotationDegreeX = (1 - this.cursor.mouseProgression.y) * CRAFT_ANGLE - CRAFT_ANGLE / 2
  
      // Smooth rotation on Z axis
      let targetRotationZ = this.inputs.left ? 20 : this.inputs.right ? -20 : 0;
      this.component.transform.rotationDegreeZ += (targetRotationZ - this.component.transform.rotationDegreeZ) * delta * 16
    }
    else if (GameState.craftState === CraftState.DESTROYING) {
      // Simulate the fall of the craft
      // Movement towards its place on the Y axis (From 10 to 0)
      this.component.transform.y += (0 - this.component.transform.y) * delta * 6
      // Movement towards its place on the Z axis (From 17 to 5)
      this.component.transform.z += (0 - this.component.transform.z) * delta * 6
      // Rotation on the X axis (From 0 to -30)
      this.component.transform.rotationDegreeX += (-30 - this.component.transform.rotationDegreeX) * delta * 8
      // Rotation on the Y axis (From 0 to 60)
      this.component.transform.rotationDegreeY += (60 - this.component.transform.rotationDegreeY) * delta * 8
    }
  }
}
