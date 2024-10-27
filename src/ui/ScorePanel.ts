import { GameState } from "../GameState";

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
    this.__DOM__.style.right = '20px';
    this.__DOM__.style.color = 'white';
    this.__DOM__.style.fontFamily = "'Jersey 20', sans-serif";
    this.__DOM__.style.fontSize = '40px';

    // Wire GameState
    GameState.onScoreChange((score) => {
      this.__DOM_SCORE__.innerText = `Score: ${score}`;
    });

    // Append to body
    document.body.appendChild(this.__DOM__);
  }
}
