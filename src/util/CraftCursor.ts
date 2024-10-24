/**
 * This class is responsible for handling the mouse cursor for the Craft.
 * When created, it starts listening to mouse events to update the mouse position in real-time.
 */
export default class CraftCursor {
  __MOUSE_POSITION__ = { x: 0, y: 0 }
  __SCREEN_SIZE__ = { width: 0, height: 0 }

  constructor() {
    this.__SCREEN_SIZE__.width = window.innerWidth
    this.__SCREEN_SIZE__.height = window.innerHeight
    window.addEventListener('mousemove', (event) => {
      this.__MOUSE_POSITION__.x = event.clientX
      this.__MOUSE_POSITION__.y = event.clientY
    })
    window.addEventListener('resize', () => {
      this.__SCREEN_SIZE__.width = window.innerWidth
      this.__SCREEN_SIZE__.height = window.innerHeight
    })
  }

  /**
   * The mouse progression is a value between 0 and 1 that represents the mouse position in relation to the screen size.
   * e.g. { x: 0.5, y: 0.5 } means the mouse is in the center of the screen.
   */
  get mouseProgression() {
    return {
      x: this.__MOUSE_POSITION__.x / this.__SCREEN_SIZE__.width,
      y: this.__MOUSE_POSITION__.y / this.__SCREEN_SIZE__.height,
    }
  }
}
