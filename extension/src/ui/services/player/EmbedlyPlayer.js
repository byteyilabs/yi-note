import Player from './Player';

// For Embedly API details, please refer to https://docs.embed.ly/docs/playerjs
export default class YoutubeIframePlayer extends Player {
  #videoEl;
  #player;

  constructor(options = {}) {
    super(options);

    this.#videoEl = options.videoEl;
    // eslint-disable-next-line no-undef
    this.#player = new embedly.Player(this.#videoEl);
    this.#player.on('ready', () => {
      logger.info('Embedly player ready');
    });
  }

  getVideoElement() {
    return this.#videoEl;
  }

  play() {
    this.#player.play();
  }

  pause() {
    this.#player.pause();
  }

  seek(timestamp) {
    const timeToSeek = timestamp - this.seekSeconds;
    this.#player.setCurrentTime(timeToSeek);
  }

  getCurrentTime() {
    return new Promise(resolve => {
      this.#player.getCurrentTime(currentTime => {
        resolve(Math.floor(currentTime));
      });
    });
  }

  getDuration() {
    return new Promise(resolve => {
      this.#player.getDuration(resolve);
    });
  }
}
