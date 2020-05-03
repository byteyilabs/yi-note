import { action } from 'easy-peasy';

const alertsModel = {
  open: false,
  content: '',
  onConfirm: null,
  show: action((state, { title, content, onConfirm }) => {
    state.open = true;
    if (title) {
      state.title = title;
    }
    if (content) {
      state.content = content;
    }
    if (onConfirm) {
      state.onConfirm = onConfirm;
    }
  }),
  hide: action(state => {
    state.open = false;
    state.title = '';
    state.content = '';
    state.onConfirm = null;
  })
};

export default alertsModel;
