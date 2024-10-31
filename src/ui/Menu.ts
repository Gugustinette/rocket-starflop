import { AudioManager } from "../audio/AudioManager";
import { CraftState, GameState, State } from "../GameState";
import { Button } from "./Button";

export class Menu {
  __DOM__: HTMLElement;
  __DOM_LOGO__: HTMLImageElement;
  playButton: Button;
  scoresButton: Button;
  creditsButton: Button;

  __DOM_SCORES__: HTMLElement;

  __DOM_CREDITS__: HTMLElement;

  constructor() {
    // Create DOM
    this.__DOM__ = document.createElement('div');
    this.__DOM__.className = 'menu-panel';
    // Create Logo
    this.__DOM_LOGO__ = document.createElement('img');
    this.__DOM_LOGO__.src = '/rocket-starflop/logo.png';
    this.__DOM_LOGO__.style.width = '60vw';
    this.__DOM_LOGO__.style.maxWidth = '600px';
    this.__DOM_LOGO__.style.height = 'auto';
    this.__DOM_LOGO__.style.marginBottom = '80px';
    this.__DOM_LOGO__.style.transition = 'all 0.5s ease';
    this.__DOM__.appendChild(this.__DOM_LOGO__);
    // Create Play button
    this.playButton = new Button('Jouer');
    this.playButton.__DOM__.id = 'play-button';
    this.playButton.onClick(() => {
      GameState.state = State.PLAYING;
      GameState.craftState = CraftState.LAUNCHING;
      AudioManager.stopMenu();
      AudioManager.playGame();
      this.__DOM__.style.opacity = '0';
      // Wait for the animation to end to set display to none
      setTimeout(() => {
        this.__DOM__.style.display = 'none';
      }, 500);
    })
    this.__DOM__.appendChild(this.playButton.__DOM__);
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
    this.__DOM__.style.transition = 'opacity 0.5s ease';

    // Wire GameState
    GameState.onStateChange((state) => {
      if (state === State.MENU) {
        AudioManager.playMenu();
        this.__DOM__.style.display = 'flex';
        this.__DOM__.style.opacity = '1';
      }
    });

    const loadSecondaryPanel = () => {
      this.__DOM__.style.justifyContent = 'flex-start';
      this.__DOM_LOGO__.style.marginBottom = '10px';
      this.__DOM_LOGO__.style.maxWidth = '300px';
      this.playButton.__DOM__.style.display = 'none';
      this.scoresButton.__DOM__.style.display = 'none';
      this.creditsButton.__DOM__.style.display = 'none';
    }
    const hideSecondaryPanel = () => {
      this.__DOM__.style.justifyContent = 'center';
      this.__DOM_LOGO__.style.marginBottom = '80px';
      this.__DOM_LOGO__.style.maxWidth = '600px';
      this.__DOM_SCORES__.style.display = 'none';
      this.__DOM_CREDITS__.style.display = 'none';
      this.playButton.__DOM__.style.display = 'block';
      this.scoresButton.__DOM__.style.display = 'block';
      this.creditsButton.__DOM__.style.display = 'block';
    }

    // Create Scores DOM
    this.__DOM_SCORES__ = document.createElement('div');
    this.__DOM_SCORES__.innerHTML = 'Scores';
    this.__DOM_SCORES__.style.display = 'none';
    this.__DOM_SCORES__.style.flexDirection = 'column';
    this.__DOM_SCORES__.style.alignItems = 'center';
    this.__DOM_SCORES__.style.justifyContent = 'center';
    this.__DOM_SCORES__.style.gap = '20px';
    this.__DOM__.appendChild(this.__DOM_SCORES__);
    // Create Scores button
    this.scoresButton = new Button('Scores');
    this.scoresButton.onClick(() => {
      this.__DOM_SCORES__.style.display = 'flex';
      loadSecondaryPanel();
    })
    this.__DOM__.appendChild(this.scoresButton.__DOM__);
    // Create Back button
    const backButtonScores = new Button('Retour');
    backButtonScores.onClick(() => {
      hideSecondaryPanel();
    })
    this.__DOM_SCORES__.appendChild(backButtonScores.__DOM__);

    // Create Credits DOM
    this.__DOM_CREDITS__ = document.createElement('div');
    this.__DOM_CREDITS__.style.display = 'none';
    this.__DOM_CREDITS__.style.flexDirection = 'column';
    this.__DOM_CREDITS__.style.alignItems = 'center';
    this.__DOM_CREDITS__.style.justifyContent = 'center';
    this.__DOM_CREDITS__.style.gap = '20px';
    const creditTitle = document.createElement('div');
    // Title
    creditTitle.innerHTML = 'Crédits';
    this.__DOM_CREDITS__.appendChild(creditTitle);
    this.__DOM__.appendChild(this.__DOM_CREDITS__);
    // Content
    const content = document.createElement('div');
    content.style.fontSize = '20px';
    content.innerHTML = `
    Développé par <a href="https://github.com/gugustinette" target="_blank">Augustin MERCIER</a> et <a href="https://github.com/oulahoop" target="_blank">Maël CAUBERE</a><br>
    <br>
    Musiques par <a href="https://github.com/gugustinette" target="_blank">Augustin MERCIER</a>
    <br>
    <br>
    Assets graphiques :<br>
    - <a href="https://kenney.nl/assets/space-kit" target="_blank">https://kenney.nl/assets/space-kit</a><br>
    - <a href="https://kenney.nl/assets/space-station-kit" target="_blank">https://kenney.nl/assets/space-station-kit</a><br>
    - <a href="https://fliflifly.itch.io/hearts-and-health-bar" target="_blank">https://fliflifly.itch.io/hearts-and-health-bar</a><br>
    <br>
    SFX : <a href="https://samplefocus.com/" target="_blank">https://samplefocus.com/</a>
    <br>
    <br>
    Moteur de jeu : <a href="https://fibbo.dev" target="_blank">Fibbo</a>
    `;
    this.__DOM_CREDITS__.appendChild(content);
    // Create Credits button
    this.creditsButton = new Button('Crédits');
    this.creditsButton.onClick(() => {
      this.__DOM_CREDITS__.style.display = 'flex';
      loadSecondaryPanel();
    })
    this.__DOM__.appendChild(this.creditsButton.__DOM__);
    // Create Back button
    const backButtonCredits = new Button('Retour');
    backButtonCredits.onClick(() => {
      hideSecondaryPanel();
    })
    this.__DOM_CREDITS__.appendChild(backButtonCredits.__DOM__);

    // Append to body
    document.body.appendChild(this.__DOM__);
  }
}
