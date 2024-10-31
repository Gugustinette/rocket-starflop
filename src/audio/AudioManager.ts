import { Sound } from './Sound'

export class AudioManager {
  // Music
  //    Menu
  static menuIntro: Sound = new Sound('assets/audio/menu-intro.mp3')
  static menuLoop: Sound = new Sound('assets/audio/menu-loop.mp3')
  //    Game
  static gameIntro: Sound = new Sound('assets/audio/game-intro.mp3')
  static gameLoop: Sound = new Sound('assets/audio/game-loop.mp3')
  // SFX
  static shootSound: Sound = new Sound('assets/audio/shoot.wav')
  static explosionSound: Sound = new Sound('assets/audio/explosion.wav')

  // Players
  static playShoot() {
    this.shootSound.volume = 0.05
    this.shootSound.play()
  }

  static playExplosion() {
    this.explosionSound.play()
  }

  static playMenu() {
    // Increase volume
    this.menuIntro.volume = 0.15
    this.menuLoop.volume = 0.15
    this.menuLoop.loop = true
    // Play
    this.menuIntro.play()
    this.menuIntro.onEnd(() => {
      this.menuLoop.play()
    })
  }
  
  static stopMenu() {
    this.menuIntro.stop()
    this.menuLoop.stop()
  }

  static playGame() {
    // Increase volume
    this.gameIntro.volume = 0.2
    this.gameLoop.volume = 0.2
    this.gameLoop.loop = true
    // Play
    this.gameIntro.play()
    this.gameIntro.onEnd(() => {
      this.gameLoop.play()
    })
  }

  static stopGame() {
    this.gameIntro.stop()
    this.gameLoop.stop()
  }
}
