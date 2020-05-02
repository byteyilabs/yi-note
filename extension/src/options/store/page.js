import { action, thunk } from 'easy-peasy'
import { StorageFactory } from '../../common/services/storage'

const storage = StorageFactory.getStorage()

export default {
  id: '',
  setId: action((state, payload) => {
    state.id = payload
  }),
  title: '',
  setTitle: action((state, payload) => {
    state.title = payload
  }),
  url: '',
  setUrl: action((state, payload) => {
    state.url = payload
  }),
  notes: [],
  setNotes: action((state, payload) => {
    state.notes = [...payload]
  }),
  fetchPage: thunk(async (actions, pageId) => {
    const { id, meta: { title, url } = {}, notes } = await storage.getPage(pageId)
    actions.setId(id)
    actions.setTitle(title)
    actions.setUrl(url)
    actions.setNotes(notes)
  }),
  reset: action(state => {
    state.id = ''
    state.title = ''
    state.url = ''
    state.notes = []
  })
}
