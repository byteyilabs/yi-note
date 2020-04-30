import { action } from 'easy-peasy'

const appModel = {
  title: '',
  setTitle: action((state, payload) => {
    state.title = payload
  })
}

export default appModel
