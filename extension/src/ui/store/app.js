import { action } from 'easy-peasy'

const appModel = {
  open: false,
  setOpen: action(state => {
    state.open = !state.open
  }),
  url: window.location.href,
  setUrl: action((state, payload) => {
    state.url = payload
  }),
  version: '',
  setVersion: action((state, payload) => {
    state.version = payload
  })
}

export default appModel
