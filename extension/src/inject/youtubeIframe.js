import { sendMessage } from '../common/utils';
import { APP_ID } from '../constants';

class YoutubeIframe {
  constructor(id) {
    this.player = null;
    this.id = id;

    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  init() {
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      const before = document.getElementsByTagName('script')[0];
      before.parentNode.insertBefore(script, before);
      script.onload = () => {
        let retry = 20;
        const timer = window.setInterval(() => {
          if (window.YT && typeof window.YT.Player !== 'undefined') {
            window.clearInterval(timer);
            this.init();
            return;
          }

          retry--;
          if (retry < 0) {
            window.clearInterval(timer);
          }
        }, 200);
        this.init();
      };
      return;
    }

    if (typeof window.YT.Player === 'undefined') {
      return;
    }

    this.player = new window.YT.Player(this.id, {
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange
      }
    });

    this.addExtensionEventsListener();
  }

  onPlayerReady() {
    console.log('yi-note: iframe youtube player ready');
  }

  onPlayerStateChange() {}

  addExtensionEventsListener() {
    window.addEventListener(
      'message',
      ({ source, data: { from, action, timestamp } = {} }) => {
        if (source !== window || from !== APP_ID) {
          return;
        }

        switch (action) {
          case 'play':
            this.player.playVideo();
            return;
          case 'pause':
            this.player.pauseVideo();
            return;
          case 'seek':
            this.player.seekTo(timestamp);
            return;
          case 'currentTime':
            console.log(this.player.getCurrentTime());
            sendMessage(
              'currentTime',
              {
                data: Math.floor(this.player.getCurrentTime())
              },
              true
            );
            return;
          case 'duration':
            sendMessage(
              'duration',
              { data: Math.floor(this.player.getDuration()) },
              true
            );
            return;
        }
      }
    );
  }
}

export default YoutubeIframe;
