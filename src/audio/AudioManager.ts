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
  static hitSound: Sound = new Sound('assets/audio/hit.mp3')

  static musicVolume: number = 0.2
  static soundVolume: number = 0.2

  // Players
  static playShoot() {
    this.shootSound.play()
  }

  static playExplosion() {
    this.explosionSound.play()
  }

  static playHit() {
    this.hitSound.play()
  }

  static playMenu() {
    // Increase volume
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

  static setMusicVolume(value: number) {
    this.musicVolume = value

    this.menuIntro.volume = value
    this.menuLoop.volume = value
    this.gameIntro.volume = value
    this.gameLoop.volume = value
  }

  static setSoundVolume(value: number) {
    this.soundVolume = value

    this.shootSound.volume = value
    this.explosionSound.volume = value
    this.hitSound.volume = value
  }
}
