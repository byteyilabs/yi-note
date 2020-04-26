import { sendMessage } from '../common'
import { APP_ID } from '../constants'

class YoutubeIframe {
  constructor(id) {
    this.player = null
    this.id = id

    this.onPlayerReady = this.onPlayerReady.bind(this)
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
  }

  init() {
    if (!window.YT) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      const before = document.getElementsByTagName('script')[0]
      before.parentNode.insertBefore(script, before)
      window.onload = () => this.init()
      return
    }

    this.player = new YT.Player(this.id, {
      events: {
        'onReady': this.onPlayerReady,
        'onStateChange': this.onPlayerStateChange
      }
    });

    this.addExtensionEventsListener()
  }

  onPlayerReady() {
    console.log('yi-note: iframe youtube player ready')
  }

  onPlayerStateChange() {}

  addExtensionEventsListener() {
    window.addEventListener(
      'message',
      ({ source, data: { from, action, timestamp } = {} }) => {
        if (source !== window || from !== APP_ID) {
          return
        }

        switch (action) {
          case 'play':
            this.player.playVideo()
            return
          case 'pause':
            this.player.pauseVideo()
            return
          case 'seek':
            this.player.seekTo(timestamp)
            return
          case 'currentTime':
            sendMessage(
              'currentTime',
              {
                data: Math.floor(this.player.getCurrentTime())
              },
              true
            )
            return
          case 'duration':
            sendMessage(
              'duration',
              { data: Math.floor(this.player.getDuration()) },
              true
            )
            return
        }
      }
    )
  }
}

export default YoutubeIframe
