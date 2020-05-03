import HTML5Player from './HTML5Player';
import ClassWatcher from '../dom/ClassWatcher';

const ON_AD_CLASSNAME = 'ad-showing';

export default class YoutubePlayer extends HTML5Player {
  constructor({ onShowingAd, onHidingAd }) {
    super();

    const playerEl = document.querySelector('.html5-video-player');
    if (playerEl) {
      new ClassWatcher(playerEl, ON_AD_CLASSNAME, onShowingAd, onHidingAd);
    }
  }
}
