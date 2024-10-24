import { FKeyboard } from '@fibbojs/event'
import type { FControllerOptions, FScene } from '@fibbojs/3d'
import { FController } from '@fibbojs/3d'

export interface CustomCraftOptions extends FControllerOptions {
  /**
   * The speed of the craft.
   */
  speed?: number
}

/**
 * Craft controller that will be used to move the craft.
 * @category Controller
 */
export class CraftController extends FController {
  /**
   * The inputs that will be used to move the craft.
   */
  inputs: {
    forward: boolean
    backward: boolean
    left: boolean
    right: boolean
    up: boolean
    down: boolean
  }

  /**
   * The scene where the craft is.
   */
  scene: FScene

  /**
   * The speed of the craft.
   */
  speed: number

  constructor(scene: FScene, options: CustomCraftOptions) {
    super(options)

    // Define default values
    const DEFAULT_OPTIONS = {
      speed: 20,
    }
    // Apply default options
    options = { ...DEFAULT_OPTIONS, ...options }
    // Validate options
    if (!options.speed)
      throw new Error('FibboError: FCharacter requires speed option')

    // Store options
    this.scene = scene
    this.speed = options.speed

    // Map of the movements (will be updated by the keyboard)
    this.inputs = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false,
    }

    // Create a keyboard instance
    const fKeyboard = new FKeyboard(scene)

    // Key down
    fKeyboard.onKeyDown('w', () => {
      this.inputs.forward = true
    })
    fKeyboard.onKeyDown('s', () => {
      this.inputs.backward = true
    })
    fKeyboard.onKeyDown('a', () => {
      this.inputs.left = true
    })
    fKeyboard.onKeyDown('d', () => {
      this.inputs.right = true
    })
    fKeyboard.onKeyDown(' ', () => {
      this.inputs.up = true
    })
    fKeyboard.onKeyDown('f', () => {
      this.inputs.down = true
    })
    // For AZERTY keyboards
    fKeyboard.onKeyDown('z', () => {
      this.inputs.forward = true
    })
    fKeyboard.onKeyDown('q', () => {
      this.inputs.left = true
    })

    // Key up
    fKeyboard.onKeyUp('w', () => {
      this.inputs.forward = false
    })
    fKeyboard.onKeyUp('s', () => {
      this.inputs.backward = false
    })
    fKeyboard.onKeyUp('a', () => {
      this.inputs.left = false
    })
    fKeyboard.onKeyUp('d', () => {
      this.inputs.right = false
    })
    fKeyboard.onKeyUp(' ', () => {
      this.inputs.up = false
    })
    fKeyboard.onKeyUp('f', () => {
      this.inputs.down = false
    })
    // For AZERTY keyboards
    fKeyboard.onKeyUp('z', () => {
      this.inputs.forward = false
    })
    fKeyboard.onKeyUp('q', () => {
      this.inputs.left = false
    })
  }

  frame(delta: number): void {
    let worldDirection = { x: 0, y: 0, z: 0 }
    // Compute the movement direction
    worldDirection.x = this.inputs.left ? 1 : this.inputs.right ? -1 : 0
    worldDirection.z = this.inputs.forward ? 1 : this.inputs.backward ? -1 : 0
    worldDirection.y = this.inputs.up ? 1 : this.inputs.down ? -1 : 0
    // Normalize the direction
    const norm = Math.sqrt(worldDirection.x ** 2 + worldDirection.y ** 2 + worldDirection.z ** 2)
    if (norm !== 0) {
      worldDirection.x /= norm
      worldDirection.y /= norm
      worldDirection.z /= norm
    }
    // Move the craft
    this.component.transform.x -= worldDirection.x * this.speed * delta
    this.component.transform.y += worldDirection.y * this.speed * delta
    this.component.transform.z -= worldDirection.z * this.speed * delta
  }
}
