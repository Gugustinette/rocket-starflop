import { GameState, State } from "../GameState";
import { Heart } from "./Heart";

export class Hearts {
  __DOM__: HTMLElement;
  heart1: Heart;
  heart2: Heart;
  heart3: Heart;

  constructor() {
    // Create DOM
    this.__DOM__ = document.createElement('div');
    this.__DOM__.className = 'hearts';
    // Style
    this.__DOM__.style.userSelect = 'none';
    this.__DOM__.style.position = 'absolute';
    this.__DOM__.style.top = '20px';
    this.__DOM__.style.left = '20px';
    this.__DOM__.style.display = 'flex';
    this.__DOM__.style.flexDirection = 'row';
    this.__DOM__.style.gap = '10px';
    this.__DOM__.style.transform = 'translateX(calc(-100% - 20px))';
    this.__DOM__.style.transition = 'all 0.5s ease';
    // Create Hearts
    this.heart1 = new Heart();
    this.__DOM__.appendChild(this.heart1.__DOM__);
    this.heart2 = new Heart();
    this.__DOM__.appendChild(this.heart2.__DOM__);
    this.heart3 = new Heart();
    this.__DOM__.appendChild(this.heart3.__DOM__);

    // Wire GameState
    GameState.onStateChange((state) => {
      if (state === State.PLAYING) {
        this.__DOM__.style.transform = 'translateX(0)';
      } else {
        this.__DOM__.style.transform = 'translateX(calc(-100% - 20px))';
      }
    })
    GameState.onHealthChange(() => {
      this.updateUI();
    });

    this.updateUI();

    // Append to body
    document.body.appendChild(this.__DOM__);
  }

  private updateUI() {
    // Update hearts
    if (GameState.health === 0) {
      this.heart1.__DOM_HEART__.style.opacity = '0';
      this.heart2.__DOM_HEART__.style.opacity = '0';
      this.heart3.__DOM_HEART__.style.opacity = '0';
    }
    if (GameState.health === 1) {
      this.heart1.__DOM_HEART__.style.opacity = '1';
      this.heart2.__DOM_HEART__.style.opacity = '0';
      this.heart3.__DOM_HEART__.style.opacity = '0';
    }
    if (GameState.health === 2) {
      this.heart1.__DOM_HEART__.style.opacity = '1';
      this.heart2.__DOM_HEART__.style.opacity = '1';
      this.heart3.__DOM_HEART__.style.opacity = '0';
    }
    if (GameState.health >= 3) {
      this.heart1.__DOM_HEART__.style.opacity = '1';
      this.heart2.__DOM_HEART__.style.opacity = '1';
      this.heart3.__DOM_HEART__.style.opacity = '1';
    }
  }
}
