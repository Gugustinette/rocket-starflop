/**
 * This class is responsible for handling the mouse cursor for the Craft.
 * When created, it starts listening to mouse events to update the mouse position in real-time.
 */
export default class CraftCursor {
  __MOUSE_POSITION__ = { x: 0, y: 0 }
  __SCREEN_SIZE__ = { width: 0, height: 0 }

  __CALLBACKS_ON_CLICK__: ((clickProgression: { x: number, y: number }) => void)[] = []

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
    window.addEventListener('click', (event) => {
      const clickPosition = { x: event.clientX, y: event.clientY }
      const clickProgression = {
        x: clickPosition.x / this.__SCREEN_SIZE__.width,
        y: clickPosition.y / this.__SCREEN_SIZE__.height
      }
      this.__CALLBACKS_ON_CLICK__.forEach((callback) => callback(clickProgression))
    })
  }

  onClick(callback: (clickProgression: { x: number, y: number }) => void) {
    this.__CALLBACKS_ON_CLICK__.push(callback)
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
