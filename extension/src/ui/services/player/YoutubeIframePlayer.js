import Player from './Player'
import { injectScriptToDOM } from '../dom'
import { sendMessage } from '../../../common'
import { PAGE } from '../../../constants'

export default class YoutubeIframePlayer extends Player {
  #videoEl
  #callbacks = {}

  constructor(options = {}) {
    super(options)

    this.#videoEl = options.videoEl
    if (!this.#videoEl.id) {
      this.#videoEl.id = 'yinote-youtube-iframe'
    }
    this.#enableJSApi()
    injectScriptToDOM().then(() => {
      sendMessage('initYoutubeIframe', { id: this.#videoEl.id })
    })
    this.#addCallbackListeners()
  }

  #enableJSApi() {
    const parsedUrl = new URL(this.#videoEl.src)
    const { search } = parsedUrl
    if (!search.includes('enablejsapi=1')) {
      parsedUrl.search = search.includes('?') ? `${search}&enablejsapi=1` : '?enablejsapi=1'
      this.#videoEl.src = parsedUrl.toString()
    }
  }

  #addCallbackListeners() {
    window.addEventListener(
      'message',
      ({ source, data: { action, data, from } }) => {
        if (source !== window || from !== PAGE) {
          return
        }

        if (typeof this.#callbacks[action] === 'function') {
          this.#callbacks[action](data)
        } 
      }
    )
  }

  play() {
    sendMessage('play')
  }

  pause() {
    sendMessage('pause')
  }

  seek(timestamp) {
    sendMessage('seek', { timestamp })
  }

  async getCurrentTime() {
    return new Promise((resolve, reject) => {
      sendMessage('currentTime')
      this.#callbacks.currentTime = resolve
      window.setTimeout(() => {
        reject('Get youtube iframe player currentTime overtime.')
      }, 500)
    })
  }

  async getDuration() {
    return new Promise((resolve, reject) => {
      sendMessage('duration')
      this.#callbacks.duration = resolve
      window.setTimeout(() => {
        reject('Get youtube iframe player currentTime overtime.')
      }, 500)
    })
  }
}
