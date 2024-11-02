import { AudioManager } from "../audio/AudioManager";
import { CraftState, GameState, State } from "../GameState";
import { Button } from "./Button";
import { ScoreLS } from "./ScoreLS";

export class Menu {
  __DOM__: HTMLElement;
  __DOM_LOGO__: HTMLImageElement;
  playButton: Button;
  scoresButton: Button;
  settingsButton: Button;
  creditsButton: Button;

  __DOM_SCORES__: HTMLElement;

  __DOM_SETTINGS__: HTMLElement;

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
      if(GameState.state !== State.PLAYING) {
        GameState.state = State.PLAYING;
        GameState.craftState = CraftState.LAUNCHING;
        AudioManager.stopMenu();
        AudioManager.playGame();
        this.__DOM__.style.opacity = '0';
        // Wait for the animation to end to set display to none
        setTimeout(() => {
          this.__DOM__.style.display = 'none';
        }, 500);
      }
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
      // Show menu and play menu music
      if (state === State.MENU) {
        console.log('ok 1')
        AudioManager.playMenu();
        this.__DOM__.style.display = 'flex';
        this.__DOM__.style.opacity = '1';
      } else if (state === State.GAME_OVER) {
        // Add score
        ScoreLS.addScore(GameState.score);
        // Update score UI
        const scores = ScoreLS.getScores();
        for (let i = 0; i < 5; i++) {
          const score = document.getElementById('score-' + i);
          if (score) {
            score.innerHTML = `${i + 1}. ${scores[i] || 'N/A'}`;
          }
        }
      }
    });

    const loadSecondaryPanel = () => {
      this.__DOM__.style.justifyContent = 'flex-start';
      this.__DOM_LOGO__.style.marginBottom = '10px';
      this.__DOM_LOGO__.style.maxWidth = '300px';
      this.playButton.__DOM__.style.display = 'none';
      this.scoresButton.__DOM__.style.display = 'none';
      this.settingsButton.__DOM__.style.display = 'none';
      this.creditsButton.__DOM__.style.display = 'none';
    }
    const hideSecondaryPanel = () => {
      this.__DOM__.style.justifyContent = 'center';
      this.__DOM_LOGO__.style.marginBottom = '80px';
      this.__DOM_LOGO__.style.maxWidth = '600px';
      this.__DOM_SCORES__.style.display = 'none';
      this.__DOM_SETTINGS__.style.display = 'none';
      this.__DOM_CREDITS__.style.display = 'none';
      this.playButton.__DOM__.style.display = 'block';
      this.scoresButton.__DOM__.style.display = 'block';
      this.settingsButton.__DOM__.style.display = 'block';
      this.creditsButton.__DOM__.style.display = 'block';
    }

    // Create Scores DOM
    this.__DOM_SCORES__ = document.createElement('div');
    this.__DOM_SCORES__.style.display = 'none';
    this.__DOM_SCORES__.style.flexDirection = 'column';
    this.__DOM_SCORES__.style.alignItems = 'center';
    this.__DOM_SCORES__.style.justifyContent = 'center';
    this.__DOM_SCORES__.style.gap = '20px';
    // Title
    const scoreTitle = document.createElement('div');
    scoreTitle.innerHTML = 'Scores';
    this.__DOM_SCORES__.appendChild(scoreTitle);
    // Content
    for (let index = 0; index < 5; index++) {
      const score = document.createElement('div');
      score.id = 'score-' + index;
      score.style.background = 'rgba(0, 0, 0, 0.5)';
      score.style.fontSize = '20px';
      score.style.padding = '10px';
      score.style.borderRadius = '5px';
      score.style.width = '50vw';
      score.style.maxWidth = '600px';
      score.innerHTML = `${index + 1}. N/A`;
      this.__DOM_SCORES__.appendChild(score);
    }
    this.__DOM__.appendChild(this.__DOM_SCORES__);
    // Load scores
    ScoreLS.getScores().forEach((scoreData: number, index: number) => {
      const score = this.__DOM_SCORES__.querySelector('#score-' + index);
      if (score) {
        score.innerHTML = `${index + 1}. ${scoreData}`;
      }
    })
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

    // Create Settings DOM
    this.__DOM_SETTINGS__ = document.createElement('div');
    this.__DOM_SETTINGS__.style.display = 'none';
    this.__DOM_SETTINGS__.style.flexDirection = 'column';
    this.__DOM_SETTINGS__.style.alignItems = 'center';
    this.__DOM_SETTINGS__.style.justifyContent = 'center';
    this.__DOM_SETTINGS__.style.gap = '20px';
    const settingsTitle = document.createElement('div');
    // Title
    settingsTitle.innerHTML = 'Paramètres';
    this.__DOM_SETTINGS__.appendChild(settingsTitle);
    // Content
    const contentSettings = document.createElement('div');
    contentSettings.style.fontSize = '20px';
    contentSettings.innerHTML = `Volume de la musique :`;
    this.__DOM_SETTINGS__.appendChild(contentSettings);
    // Add music volume control
    const divMusicVolume = document.createElement('div');
    divMusicVolume.style.top = '20px';
    divMusicVolume.style.right = '20px';
    divMusicVolume.style.display = 'flex';
    divMusicVolume.style.alignItems = 'center';
    divMusicVolume.style.gap = '10px';
    divMusicVolume.style.marginBottom = '40px';
    // Add music icon
    const musicIcon = document.createElement('img');
    musicIcon.src = '/rocket-starflop/assets/ui/icons/music_icon.png';
    musicIcon.width = 20;
    musicIcon.height = 20;
    musicIcon.style.cursor = 'pointer';
    musicIcon.onclick = () => {
      let musicVolume = document.getElementById('music-volume') as HTMLInputElement | null;
      if(!musicVolume) {
        return;
      }
      if(AudioManager.generalVolume > 0) {
        AudioManager.setVolume(0);
        musicVolume.value = '0';
        if (typeof musicVolume.onchange === 'function') {
          musicVolume.onchange(new Event('change'));
        }
        if (typeof musicVolume.oninput === 'function') {
          musicVolume.oninput(new Event('input'));
        }
      }
      else {
        AudioManager.setVolume(0.2);
        musicVolume.value = '20';
        if (typeof musicVolume.onchange === 'function') {
          musicVolume.onchange(new Event('change'));
        }
        if (typeof musicVolume.oninput === 'function') {
          musicVolume.oninput(new Event('input'));
        }
      }
    }
    divMusicVolume.appendChild(musicIcon);
    // Add music volume range
    const musicVolume = document.createElement('input');
    musicVolume.type = 'range';
    musicVolume.min = '0';
    musicVolume.max = '20';
    musicVolume.step = '0.5';
    musicVolume.value = '20';
    musicVolume.id = 'music-volume';
    const setBackgroundMusicVolume = () => {
      let min = +musicVolume.min
      let max = +musicVolume.max
      let value = +musicVolume.value
      musicVolume.style.background = `linear-gradient(to right, orange 0%, orange ${(value-min)/(max-min)*100}%, #404040 ${(value-min)/(max-min)*100}%, #404040 100%)`
    }
    setBackgroundMusicVolume();
    musicVolume.oninput = () => {
      setBackgroundMusicVolume();
    };
    musicVolume.onchange = () => {
      AudioManager.setVolume(Number(musicVolume.value) / 100);
    }
    const style = document.createElement('style');
    style.innerHTML = `
    #music-volume {
      height: 4px;
      width: 150px;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
    }

    input[type='range']::-webkit-slider-thumb {
      width: 6px;
      -webkit-appearance: none;
      height: 12px;
      background: orange;
      cursor: pointer;
    }
    `;
    // Append to DOM
    divMusicVolume.appendChild(musicVolume);
    document.head.appendChild(style);
    this.__DOM_SETTINGS__.appendChild(divMusicVolume);
    // Create Settings button
    this.settingsButton = new Button('Paramètres');
    this.settingsButton.onClick(() => {
      this.__DOM_SETTINGS__.style.display = 'flex';
      loadSecondaryPanel();
    })
    this.__DOM__.appendChild(this.settingsButton.__DOM__);
    // Create Back button
    const backButtonSettings = new Button('Retour');
    backButtonSettings.onClick(() => {
      hideSecondaryPanel();
    })
    this.__DOM_SETTINGS__.appendChild(backButtonSettings.__DOM__);
    this.__DOM__.appendChild(this.__DOM_SETTINGS__);

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
