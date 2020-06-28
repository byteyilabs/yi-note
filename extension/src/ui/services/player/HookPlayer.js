import Player from './Player';
import { APP_ID } from '@yi-note/common/constants';

const ACTION_GET_CURRENT_TIME = 'getCurrentTime';
const ACTION_GET_DURATION = 'getDuration';

const sendMessage = message => {
  window.postMessage({ ...message, from: APP_ID }, '*');
};

export default class HookPlayer extends Player {
  #videoEl;
  #resolves;

  constructor(options = {}) {
    super(options);
    this.#videoEl = options.videoEl;
    this.#resolves = {};
  }

  getVideoElement() {
    return this.#videoEl;
  }

  play() {
    sendMessage({ action: 'play' });
  }

  pause() {
    sendMessage({ action: 'pause' });
  }

  seek(timestamp) {
    const timeToSeek = timestamp - this.seekSeconds;
    sendMessage({ action: 'seek', data: timeToSeek });
  }

  #getCurrentTimeHandler = event => {
    const { action, data } = event.data;
    if (action === ACTION_GET_CURRENT_TIME) {
      this.#resolves[action](data);
    }
  };

  getCurrentTime() {
    return new Promise((resolve, reject) => {
      this.#resolves[ACTION_GET_CURRENT_TIME] = resolve;
      sendMessage({ action: ACTION_GET_CURRENT_TIME });
      window.removeEventListener('message', this.#getCurrentTimeHandler, false);
      window.addEventListener('message', this.#getCurrentTimeHandler, false);
      window.setTimeout(() => {
        reject(new Error('getCurrentTime timeout'));
      }, 500);
    });
  }

  #getDurationHandler = event => {
    const { action, data } = event.data;
    if (action === ACTION_GET_CURRENT_TIME) {
      this.#resolves[action](data);
    }
  };

  getDuration() {
    return new Promise((resolve, reject) => {
      this.#resolves[ACTION_GET_DURATION] = resolve;
      sendMessage({ action: ACTION_GET_DURATION });
      window.removeEventListener('message', this.#getDurationHandler, false);
      window.addEventListener('message', this.#getDurationHandler, false);
      window.setTimeout(() => {
        reject(new Error('getDuration timeout'));
      }, 500);
    });
  }
}
