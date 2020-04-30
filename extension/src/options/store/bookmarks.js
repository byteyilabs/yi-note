import { action, thunk } from 'easy-peasy'
import { StorageFactory } from '../../common/services/storage'

const storage = StorageFactory.getStorage()

export default {
  bookmarks: [],
  setBookmarks: action((state, payload) => {
    state.bookmarks = [...payload]
  }),
  fetchBookmarks: thunk(async (actions) => {
    const bookmarks = await storage.getBookmarks()
    actions.setBookmarks(bookmarks)
  })
}
