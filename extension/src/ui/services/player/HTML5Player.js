import Player from './Player'

export default class HTML5Player extends Player {
  /**
   * Create a HTML5Player. Set first find element by selector as video element.
   *
   * @param {object} [options]
   * @param {string} [options.videoEl] - video element
   * @param {string} [options.selector] - Css selector to identify video element.
   * @throws {Error} - throws error if video element not be found.
   */
  constructor(options = {}) {
    super(options)

    const { videoEl, selector } = options
    this.video = videoEl || document.querySelector(selector || 'video')
    if (!this.video) {
      throw new Error('Player initial error')
    }
  }

  play() {
    this.video.play()
  }

  pause() {
    this.video.pause()
  }

  seek(timestamp) {
    this.video.currentTime = timestamp
  }

  async getCurrentTime() {
    return Promise.resolve(Math.floor(this.video.currentTime))
  }

  async getDuration() {
    return Promise.resolve(this.video.duration)
  }
}
