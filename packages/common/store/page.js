import { action, thunk } from 'easy-peasy';
import { getMetadata } from 'page-metadata-parser';
import { v5 } from 'uuid';
import { storage as StorageService } from '../services';
import { generatePageId, addTagToList, addNoteToList } from '../utils';
import uuidNamespace from '../utils/uuid-namespace';

export const defaultPage = {
  id: '',
  meta: {},
  notes: [],
  tags: []
};

const storage = StorageService.getStorage();

const pageModel = {
  data: { ...defaultPage },
  setPage: action((state, page) => {
    state.data = { ...state.data, ...page };
  }),
  fetchPage: thunk(async (actions, pageId) => {
    const page = (await storage.getPage(pageId)) || defaultPage;
    actions.setPage({ ...defaultPage, ...page });
  }),
  bookmarkPage: thunk(async (actions, _, { getState, getStoreState }) => {
    const { url } = getStoreState().app;
    const { notes } = getState().data;
    const id = generatePageId(url);
    const page = await storage.addPage({
      id,
      meta: getMetadata(document, url),
      notes: notes || [],
      createdAt: +new Date()
    });
    actions.setPage(page);
  }),
  updatePage: thunk(async (actions, updatedPage, { getState }) => {
    const { data } = getState();
    const newPage = await storage.addPage({ ...data, ...updatedPage });
    actions.setPage(newPage);
  }),
  removePage: thunk(async (actions, pageId) => {
    await storage.removePage(pageId);
    actions.setPage(defaultPage);
  }),
  saveNote: thunk(async (actions, note, { getState, getStoreState }) => {
    const { url } = getStoreState().app;
    const id = note.id || v5(note.content + note.timestamp, uuidNamespace);
    let { data: page } = getState();

    if (!page.id) {
      // Page has not been bookmarked yet
      const pageObj = {
        id: generatePageId(url),
        meta: getMetadata(document, url),
        notes: [{ id, ...note }],
        createdAt: +new Date()
      };
      page = await storage.addPage(pageObj);
    } else {
      // Add note
      const noteFromPage = page.notes.find(note => note.id === id);
      let noteFromResponse;
      if (noteFromPage) {
        noteFromResponse = await storage.updateNote(page.id, { id, ...note });
      } else {
        noteFromResponse = await storage.addNote(page.id, { id, ...note });
      }
      const notes = addNoteToList(page.notes, noteFromResponse);
      page = { ...page, notes };
    }
    actions.setPage(page);
  }),
  removeNote: thunk(async (actions, noteId, { getState }) => {
    const { id: pageId, notes } = getState().data;
    await storage.removeNote(pageId, noteId);
    const pageObj = {
      id: pageId,
      notes: notes.filter(note => note.id !== noteId)
    };
    actions.setPage(pageObj);
  }),
  addTag: thunk(async (actions, tag, { getState }) => {
    const { data } = getState();
    const { id, tags } = data;
    await storage.addTag(id, tag);
    actions.setPage({ ...data, tags: addTagToList(tags, tag) });
  }),
  removeTag: thunk(async (actions, tag, { getState }) => {
    const { data } = getState();
    const { id, tags } = data;
    await storage.removeTag(id, tag);
    actions.setPage({ ...data, tags: tags.filter(t => t !== tag) });
  }),
  reset: action(state => {
    state.data = { ...defaultPage };
  })
};

export default pageModel;
