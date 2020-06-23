import { action } from 'easy-peasy';

export const defaultNote = {
  id: '',
  content: '',
  timestamp: 0,
  image: ''
};

export const defaultPage = {
  id: '',
  notes: [],
  tags: []
};

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
  sendToServices: {
    open: false,
    setOpen: action((state, payload) => {
      state.open = payload;
    })
  },
  support: {
    open: false,
    setOpen: action((state, payload) => {
      state.open = payload;
    })
  },
  edit: action((state, note) => {
    state.editor.active = true;
    state.editor.note = { ...note };
  })
};

export default videoNotesModel;
