import { action, thunk } from 'easy-peasy';
import { StorageFactory } from '../../common/services/storage';

const storage = StorageFactory.getStorage();

export default {
  bookmarks: [],
  tags: [],
  setBookmarks: action((state, payload) => {
    state.bookmarks = [
      ...payload.sort((b1, b2) => b1.createdAt - b2.createdAt)
    ];
  }),
  setBookmark: action((state, payload) => {
    const { id } = payload;
    const bookmarkToUpdate =
      state.bookmarks.find(bookmark => bookmark.id === id) || {};
    state.bookmarks = [
      ...state.bookmarks.filter(bookmark => bookmark.id !== id),
      { ...bookmarkToUpdate, ...payload }
    ].sort((b1, b2) => b1.createdAt - b2.createdAt);
  }),
  setTags: action((state, payload) => {
    state.tags = payload.map(tag => ({ tag, selected: false }));
  }),
  selectTag: action((state, payload) => {
    state.tags = state.tags.map(tag => {
      if (tag.tag === payload) {
        tag.selected = !tag.selected;
        return tag;
      }
      return tag;
    });
  }),
  unSelectTags: action(state => {
    state.tags = state.tags.map(tag => {
      tag.selected = false;
      return tag;
    });
  }),
  fetchBookmarks: thunk(async actions => {
    const bookmarks = await storage.getBookmarks();
    actions.setBookmarks(bookmarks);
  }),
  removeBookmark: thunk(async (actions, pageId, { getState }) => {
    await storage.removePage(pageId);
    const { bookmarks } = getState();
    actions.setBookmarks(bookmarks.filter(bookmark => bookmark.id !== pageId));
  }),
  fetchTags: thunk(async actions => {
    const tags = await storage.getTags();
    actions.setTags(tags);
  }),
  filterBookmarksByTags: thunk(async (actions, _, { getState }) => {
    const { tags } = getState();
    const selectedTags = tags
      .filter(({ selected }) => !!selected)
      .map(({ tag }) => tag);
    const bookmarks = await storage.filterBookmarksByTags(selectedTags);
    actions.setBookmarks(bookmarks);
  }),
  toolbar: {
    exporting: false,
    setExporting: action((state, payload) => {
      state.exporting = payload;
    }),
    filtering: false,
    setFiltering: action((state, payload) => {
      state.filtering = payload;
    })
  },
  reset: action(state => {
    state.bookmarks = [];
  })
};
