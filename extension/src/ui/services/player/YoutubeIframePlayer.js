import Player from './Player';

export default class YoutubeIframePlayer extends Player {
  #videoEl;
  #player;

  constructor(options = {}) {
    super(options);

    this.#videoEl = options.videoEl;
    if (!this.#videoEl.id) {
      this.#videoEl.id = 'yinote-youtube-iframe';
    }
    this.#setIframeQueryParams();
    this.#player = new YT.Player(this.#videoEl.id, {
      events: {
        onReady: () => logger.info('youtube iframe player ready')
      }
    });
  }

  #setIframeQueryParams() {
    const parsedUrl = new URL(this.#videoEl.src);
    const queryParams = new URLSearchParams(parsedUrl.search);
    queryParams.set('enablejsapi', '1');
    queryParams.delete('origin');
    parsedUrl.search = queryParams.toString();
    this.#videoEl.src = parsedUrl.toString();
  }

  getVideoElement() {
    return this.#videoEl;
  }

  play() {
    this.#player.playVideo();
  }

  pause() {
    this.#player.pauseVideo();
  }

  seek(timestamp) {
    this.#player.seekTo(timestamp);
  }

  async getCurrentTime() {
    return new Promise((resolve, reject) => {
      const currentTime = this.#player.getCurrentTime();
      resolve(Math.floor(currentTime));
    });
  }

  async getDuration() {
    return new Promise((resolve, reject) => {
      const duration = this.#player.getDuration();
      resolve(Math.floor(duration));
    });
  }
}
