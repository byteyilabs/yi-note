import { action, thunk, actionOn } from 'easy-peasy';
import { StorageFactory } from '../../common/services/storage';
import { TYPE_BOOKMARKS, TYPE_NOTES } from '../../constants';

const storage = StorageFactory.getStorage();

const searchModel = {
  query: '',
  setQuery: action((state, query) => {
    state.query = query;
  }),
  onSetQuery: actionOn(
    actions => actions.setQuery,
    state => {
      const { query, type, bookmarks, notes } = state;
      if (!query) {
        switch (type) {
          case TYPE_BOOKMARKS:
            state.results = [...bookmarks];
            break;
          case TYPE_NOTES:
            state.results = [...notes];
            break;
          default:
            state.results = [];
            break;
        }
      }
    }
  ),
  type: TYPE_BOOKMARKS,
  setType: action((state, type) => {
    state.type = type;
  }),
  results: [],
  setResults: action((state, results) => {
    state.results = [...results];
  }),
  bookmarks: [],
  setBookmarks: action((state, bookmarks) => {
    state.bookmarks = [...bookmarks];
  }),
  fetchBookmarks: thunk(async actions => {
    const bookmarks = await storage.getBookmarks();
    actions.setBookmarks(bookmarks);
  }),
  notes: [],
  setNotes: action((state, notes) => {
    state.notes = [...notes];
  }),
  fetchNotes: thunk(async actions => {
    const notes = await storage.getNotes();
    actions.setNotes(notes);
  }),
  search: thunk(async (actions, _, { getState }) => {
    const { query, type } = getState();
    let results;
    if (type === TYPE_BOOKMARKS) {
      results = await storage.searchBookmarks(query);
    } else if (type === TYPE_NOTES) {
      results = await storage.searchNotes(query);
    }
    actions.setResults(results);
  })
};

export default searchModel;
