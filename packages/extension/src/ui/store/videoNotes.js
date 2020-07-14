import { action, thunk } from 'easy-peasy';

export const defaultNote = {
  id: '',
  content: '',
  timestamp: 0,
  image: ''
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
  support: {
    open: false,
    setOpen: action((state, payload) => {
      state.open = payload;
    })
  },
  edit: action((state, note) => {
    state.editor.active = true;
    state.editor.note = { ...note };
  }),
  reset: thunk(async actions => {
    actions.editor.reset();
  })
};

export default videoNotesModel;
