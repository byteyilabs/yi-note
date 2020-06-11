import { action, thunk } from 'easy-peasy';
import { StorageFactory } from '../../common/services/storage';
import { addTagToList } from '../../common/utils';

const storage = StorageFactory.getStorage();

export default {
  id: '',
  setId: action((state, payload) => {
    state.id = payload;
  }),
  title: '',
  setTitle: action((state, payload) => {
    state.title = payload;
  }),
  url: '',
  setUrl: action((state, payload) => {
    state.url = payload;
  }),
  notes: [],
  setNotes: action((state, payload) => {
    state.notes = [...payload];
  }),
  tags: [],
  setTags: action((state, payload) => {
    state.tags = [...payload];
  }),
  fetchPage: thunk(async (actions, pageId) => {
    const {
      id,
      meta: { title, url } = {},
      notes = [],
      tags = []
    } = await storage.getPage(pageId);
    actions.setId(id);
    actions.setTitle(title);
    actions.setUrl(url);
    actions.setNotes(notes);
    actions.setTags(tags);
  }),
  addTag: thunk(async (actions, tag, { getState }) => {
    const { id, tags } = getState();
    await storage.addTag(id, tag);
    actions.setTags(addTagToList(tags, tag));
  }),
  removeTag: thunk(async (actions, tag, { getState }) => {
    const { id, tags } = getState();
    await storage.removeTag(id, tag);
    actions.setTags(tags.filter(t => t !== tag));
  }),
  reset: action(state => {
    state.id = '';
    state.title = '';
    state.url = '';
    state.notes = [];
  }),
  tagDialog: {
    open: false,
    setOpen: action((state, payload) => {
      state.open = payload;
    })
  }
};
