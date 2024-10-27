import { FKeyboard } from '@fibbojs/event'
import type { FControllerOptions } from '@fibbojs/3d'
import { FController } from '@fibbojs/3d'
import CraftCursor from './CraftCursor'
import Craft from './Craft'

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
   * The cursor instance.
   */
  cursor: CraftCursor

  /**
   * Audio elements
   */
  shootSound: HTMLAudioElement

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

    // Initialize the shoot sound
    if (import.meta.env.DEV)
      this.shootSound = new Audio('rocket-starflop/assets/shoot.wav')
    else
      this.shootSound = new Audio('assets/shoot.wav')

    // Create a cursor instance
    this.cursor = new CraftCursor()
    this.cursor.onClick((clickProgression) => {
      // Play the shoot sound
      const shootSound = this.shootSound.cloneNode() as HTMLAudioElement
      shootSound.volume = 0.1
      shootSound.play()
      // Shoot
      this.component.shoot(clickProgression)
    })
  }

  frame(_delta: number): void {
    // Move the craft
    if (this.inputs.left) {
      // The farther the craft is from the endpoint on the left, the faster it moves towards it
      this.component.transform.x -= 0.2 * Math.min(1, Math.abs(-2 - this.component.transform.x))
    } else if (this.inputs.right) {
      // The farther the craft is from the endpoint on the right, the faster it moves towards it
      this.component.transform.x += 0.2 * Math.min(1, 2 - this.component.transform.x)
    }
    // Rotate the craft according to the cursor position
    this.component.transform.rotationDegreeY = (1 - this.cursor.mouseProgression.x) * CRAFT_ANGLE - CRAFT_ANGLE / 2
    this.component.transform.rotationDegreeX = (1 - this.cursor.mouseProgression.y) * CRAFT_ANGLE - CRAFT_ANGLE / 2

    // Smooth rotation on Z axis
    let targetRotationZ = this.inputs.left ? 20 : this.inputs.right ? -20 : 0;
    this.component.transform.rotationDegreeZ += (targetRotationZ - this.component.transform.rotationDegreeZ) * 0.1;
  }
}
