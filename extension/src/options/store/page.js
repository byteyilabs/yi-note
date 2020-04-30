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
  notes: [],
  setNotes: action((state, payload) => {
    state.notes = [...payload]
  }),
  fetchPage: thunk(async (actions, pageId) => {
    const { id, meta: { title } = {}, notes } = await storage.getPage(pageId)
    actions.setId(id)
    actions.setTitle(title)
    actions.setNotes(notes)
  })
}
