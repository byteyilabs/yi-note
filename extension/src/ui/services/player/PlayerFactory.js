import videoUrlParser from 'js-video-url-parser';
import YoutubePlayer from './YoutubePlayer';
import YoutubeIframePlayer from './YoutubeIframePlayer';
import EmbedlyPlayer from './EmbedlyPlayer';
import HTML5Player from './HTML5Player';
import { retry } from '../../../common/utils';
import isHidden from '../dom/isHidden';

const playersToTry = [
  {
    selector: 'video',
    player: HTML5Player
  },
  {
    selector: 'iframe[src*="youtube"]',
    player: YoutubeIframePlayer
  },
  {
    selector: 'iframe[src*="embedly.com"]',
    player: EmbedlyPlayer
  }
];

export default class PlayerFactory {
  constructor() {}

  static #player;

  // General way to assign player by selector and class map
  static #detectPlayer(resolve, reject) {
    let foundSelector;

    const selectorPredicate = () => {
      for (const player of playersToTry) {
        if (document.querySelectorAll(player.selector).length) {
          foundSelector = player.selector;
          return true;
        }
      }

      return false;
    };

    const playerResolver = () => {
      // Use first visible element
      const playerClass = playersToTry.find(
        player => player.selector === foundSelector
      ).player;
      const els = document.querySelectorAll(foundSelector);
      let videoEl;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!isHidden(el)) {
          videoEl = el;
          break;
        }
      }
      if (videoEl) {
        this.#player = new playerClass({ videoEl });
        resolve(this.#player);
        return;
      }
      resolve(null);
    };

    const playerRejector = () => reject(new Error('Failed to find player'));

    retry(selectorPredicate, playerResolver, playerRejector);
  }

  static getPlayer(options = {}) {
    const { url } = options;
    const { id, provider } = videoUrlParser.parse(url) || {};

    return new Promise((resolve, reject) => {
      if (PlayerFactory.#player) {
        resolve(PlayerFactory.#player);
        return;
      }

      if (provider === 'youtube' && id) {
        this.#player = new YoutubePlayer(options);
        resolve(this.#player);
        return;
      }

      // Generally detect player in dom
      this.#detectPlayer(resolve, reject);
    });
  }

  static reset() {
    this.#player = null;
  }
}
