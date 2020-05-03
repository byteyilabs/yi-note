import { action } from 'easy-peasy';

const appModel = {
  title: '',
  setTitle: action((state, payload) => {
    state.title = payload;
  }),
  drawer: {
    open: false,
    setOpen: action((state, payload) => {
      state.open = payload;
    })
  },
  reset: action(state => {
    state.title = '';
  })
};

export default appModel;
