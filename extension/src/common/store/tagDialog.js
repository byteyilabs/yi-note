import { action } from 'easy-peasy';

const tagDialogModel = {
  open: false,
  setOpen: action((state, payload) => {
    state.open = payload;
  })
};

export default tagDialogModel;
