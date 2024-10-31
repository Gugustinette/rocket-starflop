import { GameState, State } from "../GameState";

export class ScorePanel {
  __DOM__: HTMLElement;
  __DOM_SCORE__: HTMLElement;

  constructor() {
    // Create DOM
    this.__DOM__ = document.createElement('div');
    this.__DOM__.className = 'score-panel';
    // Create DOM Score
    this.__DOM_SCORE__ = document.createElement('div');
    this.__DOM_SCORE__.innerText = 'Score: 0';
    this.__DOM__.appendChild(this.__DOM_SCORE__);
    // Style
    this.__DOM__.style.userSelect = 'none';
    this.__DOM__.style.position = 'absolute';
    this.__DOM__.style.top = '10px';
    this.__DOM__.style.right = '0';
    this.__DOM__.style.transform = 'translateX(100%)';
    this.__DOM__.style.opacity = '1';
    this.__DOM__.style.color = 'white';
    this.__DOM__.style.fontFamily = "'Jersey 20', sans-serif";
    this.__DOM__.style.fontSize = '40px';
    this.__DOM__.style.transition = 'all 0.5s ease';

    // Wire GameState
    GameState.onStateChange((state) => {
      if (state === State.GAME_OVER) {
        this.__DOM__.style.top = '100px';
        this.__DOM__.style.right = '50%';
        this.__DOM__.style.transform = 'translateX(50%)';
      } else if (state === State.PLAYING) {
        this.__DOM__.style.top = '10px';
        this.__DOM__.style.right = '20px';
        this.__DOM__.style.transform = 'translateX(0)';
      } else {
        this.__DOM__.style.transition = 'all 0.1s ease';
        this.__DOM__.style.opacity = '0';
        // Wait for 0.1s to move the panel
        setTimeout(() => {
          this.__DOM__.style.top = '10px';
          this.__DOM__.style.right = '0';
          this.__DOM__.style.transform = 'translateX(100%)';
        }, 100);
        // Wait for 0.5s to reset the transition and opacity
        setTimeout(() => {
          this.__DOM__.style.transition = 'all 0.5s ease';
          this.__DOM__.style.opacity = '1';
        }, 500);
      }
    })
    GameState.onScoreChange((score) => {
      this.__DOM_SCORE__.innerText = `Score: ${score}`;
    });

    // Append to body
    document.body.appendChild(this.__DOM__);
  }
}
