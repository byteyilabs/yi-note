import videoUrlParser from 'js-video-url-parser';
import YoutubePlayer from './YoutubePlayer';
import YoutubeIframePlayer from './YoutubeIframePlayer';
import HTML5Player from './HTML5Player';
import { retry } from '../../../common/utils';

const playersToTry = [
  {
    selector: 'video',
    player: HTML5Player
  },
  {
    selector: 'iframe[src*="www.youtube.com/embed"]',
    player: YoutubeIframePlayer
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
        if (document.querySelectorAll(player.selector).length === 1) {
          foundSelector = player.selector;
          return true;
        }
      }

      return false;
    };

    const playerResolver = () => {
      const playerClass = playersToTry.find(
        player => player.selector === foundSelector
      ).player;
      this.#player = new playerClass({
        videoEl: document.querySelector(foundSelector)
      });
      resolve(this.#player);
    };

    const playerRejector = () => reject(new Error('Failed to find player'));

    retry(selectorPredicate, playerResolver, playerRejector);
  }

  static getPlayer(options = {}) {
    const { url, onShowingAd, onHidingAd } = options;
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
