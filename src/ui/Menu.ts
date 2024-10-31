import { GameState, State } from "../GameState";
import { Button } from "./Button";

export class Menu {
  __DOM__: HTMLElement;
  __DOM_LOGO__: HTMLImageElement;
  playButton: Button;
  scoresButton: Button;
  creditsButton: Button;

  constructor() {
    // Create DOM
    this.__DOM__ = document.createElement('div');
    this.__DOM__.className = 'score-panel';
    // Create Logo
    this.__DOM_LOGO__ = document.createElement('img');
    this.__DOM_LOGO__.src = '/rocket-starflop/logo.png';
    this.__DOM_LOGO__.style.width = '60vw';
    this.__DOM_LOGO__.style.height = 'auto';
    this.__DOM_LOGO__.style.marginBottom = '80px';
    this.__DOM__.appendChild(this.__DOM_LOGO__);
    // Create Play button
    this.playButton = new Button('Jouer');
    this.playButton.onClick(() => {
      GameState.state = State.PLAYING;
    })
    this.__DOM__.appendChild(this.playButton.__DOM__);
    // Create Scores button
    this.scoresButton = new Button('Scores');
    this.__DOM__.appendChild(this.scoresButton.__DOM__);
    // Create Credits button
    this.creditsButton = new Button('Crédits');
    this.__DOM__.appendChild(this.creditsButton.__DOM__);
    // Style
    this.__DOM__.style.userSelect = 'none';
    this.__DOM__.style.position = 'absolute';
    this.__DOM__.style.top = '0';
    this.__DOM__.style.left = '0';
    this.__DOM__.style.width = '100vw';
    this.__DOM__.style.height = '100vh';
    this.__DOM__.style.color = 'white';
    this.__DOM__.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.__DOM__.style.fontFamily = "'Jersey 20', sans-serif";
    this.__DOM__.style.fontSize = '60px';
    this.__DOM__.style.display = 'flex';
    this.__DOM__.style.flexDirection = 'column';
    this.__DOM__.style.alignItems = 'center';
    this.__DOM__.style.justifyContent = 'center';
    this.__DOM__.style.gap = '40px';
    // this.__DOM__.style.padding = '20px';

    // Wire GameState
    GameState.onStateChange((state) => {
      console.log(`GameState: ${state}`);
    });

    // Append to body
    // document.body.appendChild(this.__DOM__);
  }
}
