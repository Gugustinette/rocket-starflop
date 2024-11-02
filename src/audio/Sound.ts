export class Sound {
  // Callbacks
  __CALLBACK_ON_END__: (() => void)[] = []

  /**
   * Main Audio DOM element
   */
  sound: HTMLAudioElement

  /**
   * Copies of the main Audio DOM element
   */
  soundCopies: HTMLAudioElement[] = []

  /**
   * 
   * @param path The path to the sound file
   * @example
   * ```ts
   * const sound = new Sound('assets/shoot.wav')
   * ```
   */
  constructor(path: string) {
    // Initialize the sound
    if (import.meta.env.DEV)
      this.sound = new Audio('rocket-starflop/' + path)
    else
      this.sound = new Audio(path)
    // Default metadata
    this.sound.loop = false
    this.sound.volume = 0.1
  }

  play() {
    // Cloen the sound
    const soundCopy = this.sound.cloneNode() as HTMLAudioElement
    // Add the sound to the list
    this.soundCopies.push(soundCopy)
    // Set metadata
    soundCopy.volume = this.sound.volume
    // Play the sound
    soundCopy.play().catch((reason) => {
      if (String(reason).includes("NotAllowedError: play() failed because the user didn't interact with the document first.")) {
        console.error(`
The sound was not played because the user didn't interact with the document first.
You can fix this by calling the play() method in a user event like a click event.
Error: ${reason}
        `)
      }
    })
    // Use the timeupdate event to detect the end of the sound by using an offset
    soundCopy.addEventListener('timeupdate', () => {
      if(soundCopy.currentTime > soundCopy.duration - 0.1909) {
        this.__CALLBACK_ON_END__.forEach(callback => callback())
        if (this.loop) {
          soundCopy.currentTime = 0
          soundCopy.play()
        } else {
          soundCopy.pause()
          soundCopy.currentTime = 0
          soundCopy.remove()
          // Remove the sound from the list
          this.soundCopies = this.soundCopies.filter(sound => sound !== soundCopy)
        }
      }
    })
  }

  stop() {
    // Stop the sound
    this.sound.pause()
    this.sound.currentTime = 0
    // Stop the copies
    this.soundCopies.forEach(soundCopy => {
      soundCopy.pause()
      soundCopy.currentTime = 0
    })
    // Empty the list
    this.soundCopies = []
  }

  onLoad(callback: () => void) {
    // Set the onload callback
    this.sound.addEventListener('loaded', callback)
  }

  onEnd(callback: () => void) {
    // Add the callback to the list
    this.__CALLBACK_ON_END__.push(callback)
  }

  // Getters & Setters

  get loop() {
    return this.sound.loop
  }

  set loop(value: boolean) {
    this.sound.loop = value
  }

  get volume() {
    return this.sound.volume
  }

  set volume(value: number) {
    this.sound.volume = value
    this.soundCopies.forEach(soundCopy => soundCopy.volume = value)
  }
}
