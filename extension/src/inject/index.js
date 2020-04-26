import YoutubeIframe from './youtubeIframe'
import { APP_ID } from '../constants'

let player

window.addEventListener(
  'message',
  ({ source, data: { from, action, id } = {} }) => {
    if (source !== window || from !== APP_ID) {
      return
    }

    if (player) {
      return
    }

    switch (action) {
      case 'initYoutubeIframe':
        player = new YoutubeIframe(id)
        player.init()
        return
    }
  }
)
