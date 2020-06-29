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
  }),
  progress: false,
  setProgress: action((state, payload) => {
    state.progress = payload;
  }),
  snackbar: {
    horizontal: 'center',
    vertical: 'bottom',
    message: '',
    open: false,
    severity: 'info',
    duration: 5000,
    setStates: action((state, payload) => {
      const {
        horizontal,
        vertical,
        message,
        open,
        severity,
        duration
      } = payload;
      state.open = open;
      if (horizontal) {
        state.horizontal = horizontal;
      }
      if (vertical) {
        state.vertical = vertical;
      }
      if (message) {
        state.message = message;
      }
      if (severity) {
        state.severity = severity;
      }
      if (duration) {
        state.duration = duration;
      }
    })
  }
};

export default appModel;
