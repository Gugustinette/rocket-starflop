export class GameState {
  // Properties
  private static __SCORE__: number = 0
  private static __SPEED__: number = 100

  // Callbacks
  private static __CALLBACKS_ON_SCORE_CHANGE__: ((score: number) => void)[] = []
  private static __CALLBACKS_ON_SPEED_CHANGE__: ((speed: number) => void)[] = []

  static onScoreChange(callback: (score: number) => void) {
    this.__CALLBACKS_ON_SCORE_CHANGE__.push(callback)
  }

  static onSpeedChange(callback: (speed: number) => void) {
    this.__CALLBACKS_ON_SPEED_CHANGE__.push(callback)
  }

  // Getters & setters

  static get score() {
    return this.__SCORE__
  }

  static set score(score: number) {
    this.__SCORE__ = score
    this.__CALLBACKS_ON_SCORE_CHANGE__.forEach((callback) => callback(score))
  }

  static get speed() {
    return this.__SPEED__
  }

  static set speed(speed: number) {
    this.__SPEED__ = speed
    this.__CALLBACKS_ON_SPEED_CHANGE__.forEach((callback) => callback(speed))
  }
}
