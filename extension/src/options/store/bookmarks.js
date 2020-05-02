import { action, thunk } from 'easy-peasy'
import { StorageFactory } from '../../common/services/storage'

const storage = StorageFactory.getStorage()

export default {
  bookmarks: [],
  setBookmarks: action((state, payload) => {
    state.bookmarks = [...payload.sort((b1, b2) => b1.createdAt - b2.createdAt)]
  }),
  setBookmark: action((state, payload) => {
    const { id } = payload
    const bookmarkToUpdate =
      state.bookmarks.find(bookmark => bookmark.id === id) || {}
    state.bookmarks = [
      ...state.bookmarks.filter(bookmark => bookmark.id !== id),
      { ...bookmarkToUpdate, ...payload }
    ].sort((b1, b2) => b1.createdAt - b2.createdAt)
  }),
  fetchBookmarks: thunk(async actions => {
    const bookmarks = await storage.getBookmarks()
    actions.setBookmarks(bookmarks)
  }),
  removeBookmark: thunk(async (actions, pageId, { getState }) => {
    await storage.removePage(pageId)
    const { bookmarks } = getState()
    actions.setBookmarks(bookmarks.filter(bookmark => bookmark.id !== pageId))
  }),
  toolbar: {
    progress: false,
    setProgress: action((state, payload) => {
      state.progress = payload
    })
  },
  reset: action(state => {
    state.bookmarks = []
  })
}
