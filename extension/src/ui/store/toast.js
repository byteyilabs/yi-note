import { action } from 'easy-peasy';

const toastModel = {
  open: false,
  severity: '',
  message: '',
  setStatus: action((state, { open, severity, message }) => {
    state.open = open;
    state.severity = severity;
    state.message = message;
  })
};

export default toastModel;
