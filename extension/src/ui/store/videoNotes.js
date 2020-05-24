import { action, thunk } from 'easy-peasy';
import { getMetadata } from 'page-metadata-parser';
import { uuid } from 'uuidv4';
import { StorageFactory } from '../../common/services/storage';
import { generatePageId } from '../../common/utils';

export const defaultNote = {
  id: '',
  content: '',
  timestamp: 0,
  image: ''
};

export const defaultPage = {
  id: '',
  notes: []
};

const storage = StorageFactory.getStorage();

const videoNotesModel = {
  editor: {
    active: false,
    note: { ...defaultNote },
    setActive: action((state, active) => {
      state.active = active;
    }),
    setNote: action((state, note) => {
      state.note = { ...state.note, ...note };
    }),
    reset: action(state => {
      state.active = false;
      state.note = {};
    })
  },
  preview: {
    open: false,
    setOpen: action((state, payload) => {
      state.open = payload;
    })
  },
  sendToPlatforms: {
    open: false,
    setOpen: action((state, payload) => {
      state.open = payload;
    })
  },
  share: {
    open: false,
    setOpen: action((state, payload) => {
      state.open = payload;
    })
  },
  edit: action((state, { timestamp, image }) => {
    const existingNote =
      state.page.notes.find(n => n.timestamp === timestamp) || {};
    state.editor.active = true;
    state.editor.note = { ...existingNote, timestamp, image };
  }),
  page: { ...defaultPage },
  setPage: action((state, page) => {
    state.page = { ...state.page, ...page };
  }),
  fetchPage: thunk(async (actions, pageId) => {
    const page = (await storage.getPage(pageId)) || defaultPage;
    actions.setPage({ ...defaultPage, ...page });
  }),
  bookmarkPage: thunk(async (actions, _, { getState, getStoreState }) => {
    const { url } = getStoreState().app;
    const { notes } = getState().page;
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
    const page = getState().page;
    const newPage = await storage.addPage({ ...page, ...updatedPage });
    actions.setPage(newPage);
  }),
  removePage: thunk(async (actions, pageId) => {
    await storage.removePage(pageId);
    actions.setPage(defaultPage);
  }),
  saveNote: thunk(async (actions, note, { getState, getStoreState }) => {
    const { url } = getStoreState().app;
    const { id } = note;
    const { page } = getState();
    let updatedPage;

    if (!page.id) {
      // Page has not been bookmarked yet
      const pageObj = {
        id: generatePageId(url),
        meta: getMetadata(document, url),
        notes: [{ id: uuid(), ...note }],
        createdAt: +new Date()
      };
      updatedPage = await storage.addPage(pageObj);
    } else if (id) {
      // Update note
      const updatedNote = await storage.updateNote(page.id, note);
      const notes = page.notes.map(n =>
        n.id !== updatedNote.id ? n : updatedNote
      );
      updatedPage = { ...page, notes };
    } else {
      // Add note
      const addedNote = await storage.addNote(page.id, { id: uuid(), ...note });
      const notes = [...page.notes, addedNote].sort(
        (n1, n2) => n1.timestamp - n2.timestamp
      );
      updatedPage = { ...page, notes };
    }
    actions.setPage(updatedPage);
    actions.editor.reset();
  }),
  removeNote: thunk(async (actions, noteId, { getState }) => {
    const { id: pageId, notes } = getState().page;
    await storage.removeNote(noteId, pageId);
    const pageObj = {
      id: pageId,
      notes: notes.filter(note => note.id !== noteId)
    };
    actions.setPage(pageObj);
  })
};

export default videoNotesModel;
