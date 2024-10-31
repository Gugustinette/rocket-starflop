import { AudioManager } from "../audio/AudioManager";
import { CraftState, GameState, State } from "../GameState";
import { Button } from "./Button";

export class GameOver {
  __DOM__: HTMLElement;
  tryAgainButton: Button;

  constructor() {
    // Create DOM
    this.__DOM__ = document.createElement('div');
    this.__DOM__.className = 'gameover-panel';
    // Create Play button
    this.tryAgainButton = new Button('Réessayer');
    this.tryAgainButton.onClick(() => {
      GameState.state = State.MENU;
      GameState.craftState = CraftState.WAITING;
      GameState.score = 0
      GameState.speed = 100
      GameState.health = 3
      this.__DOM__.style.opacity = '0';
    })
    this.__DOM__.appendChild(this.tryAgainButton.__DOM__);
    // Style
    this.__DOM__.style.userSelect = 'none';
    this.__DOM__.style.position = 'absolute';
    this.__DOM__.style.bottom = '20px';
    this.__DOM__.style.right = '20px';
    this.__DOM__.style.color = 'white';
    this.__DOM__.style.opacity = '0';
    this.__DOM__.style.fontFamily = "'Jersey 20', sans-serif";
    this.__DOM__.style.transition = 'all 0.5s ease';

    // Wire GameState
    GameState.onStateChange((state) => {
      if (state === State.GAME_OVER) {
        AudioManager.stopGame();
        this.__DOM__.style.opacity = '1';
      }
    });

    // Append to body
    document.body.appendChild(this.__DOM__);
  }
}
