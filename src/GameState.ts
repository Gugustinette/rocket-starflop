export enum State {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
}

export enum CraftState {
  WAITING = 'WAITING',
  LAUNCHING = 'LAUNCHING',
  PLAYING = 'PLAYING',
  DESTROYING = 'DESTROYING',
}

export class GameState {
  // Properties
  private static __STATE__: State = State.MENU
  private static __CRAFT_STATE__: CraftState = CraftState.WAITING
  private static __SCORE__: number = 0
  private static __SPEED__: number = 100
  private static __HEALTH__: number = 3

  // Callbacks
  private static __CALLBACKS_ON_STATE_CHANGE__: ((state: State) => void)[] = []
  private static __CALLBACKS_ON_CRAFT_STATE_CHANGE__: ((state: CraftState) => void)[] = []
  private static __CALLBACKS_ON_SCORE_CHANGE__: ((score: number) => void)[] = []
  private static __CALLBACKS_ON_SPEED_CHANGE__: ((speed: number) => void)[] = []
  private static __CALLBACKS_ON_HEALTH_CHANGE__: ((health: number) => void)[] = []

  // Methods
  static onStateChange(callback: (state: State) => void) {
    this.__CALLBACKS_ON_STATE_CHANGE__.push(callback)
  }

  static onCraftStateChange(callback: (state: CraftState) => void) {
    this.__CALLBACKS_ON_CRAFT_STATE_CHANGE__.push(callback)
  }

  static onScoreChange(callback: (score: number) => void) {
    this.__CALLBACKS_ON_SCORE_CHANGE__.push(callback)
  }

  static onSpeedChange(callback: (speed: number) => void) {
    this.__CALLBACKS_ON_SPEED_CHANGE__.push(callback)
  }

  static onHealthChange(callback: (health: number) => void) {
    this.__CALLBACKS_ON_HEALTH_CHANGE__.push(callback)
  }

  // Getters & setters
  static get state() {
    return this.__STATE__
  }

  static set state(state: State) {
    this.__STATE__ = state
    this.__CALLBACKS_ON_STATE_CHANGE__.forEach((callback) => callback(state))
  }

  static get craftState() {
    return this.__CRAFT_STATE__
  }

  static set craftState(state: CraftState) {
    this.__CRAFT_STATE__ = state
    this.__CALLBACKS_ON_CRAFT_STATE_CHANGE__.forEach((callback) => callback(state))
  }

  static get score() {
    return this.__SCORE__
  }

  static set score(score: number) {
    this.__SCORE__ = score
    this.__CALLBACKS_ON_SCORE_CHANGE__.forEach((callback) => callback(score))
    this.speed = 100 + score / 8
  }

  static get speed() {
    return this.__SPEED__
  }

  static set speed(speed: number) {
    this.__SPEED__ = speed
    this.__CALLBACKS_ON_SPEED_CHANGE__.forEach((callback) => callback(speed))
  }

  static get health() {
    return this.__HEALTH__
  }

  static set health(health: number) {
    this.__HEALTH__ = health
    this.__CALLBACKS_ON_HEALTH_CHANGE__.forEach((callback) => callback(health))
    if (health <= 0) {
      this.state = State.GAME_OVER
      this.craftState = CraftState.DESTROYING
      this.speed = 0
    }
  }
}
