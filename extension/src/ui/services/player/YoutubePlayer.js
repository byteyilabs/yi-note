import HTML5Player from './HTML5Player'
import ClassWatcher from '../dom/ClassWatcher'

const ON_AD_CLASSNAME = 'ad-showing'

export default class YoutubePlayer extends HTML5Player {
  constructor(adsWatcherCallbacks = {}) {
    super()

    const playerEl = document.querySelector('.html5-video-player')
    playerEl &&
      new ClassWatcher(
        playerEl,
        ON_AD_CLASSNAME,
        adsWatcherCallbacks.onAdd,
        adsWatcherCallbacks.onRemove
      )
  }
}
