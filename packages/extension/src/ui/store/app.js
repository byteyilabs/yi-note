import { action } from 'easy-peasy';

const appModel = {
  open: false,
  setOpen: action(state => {
    state.open = !state.open;
  }),
  url: window.location.href,
  setUrl: action((state, payload) => {
    state.url = payload;
  }),
  showingAd: false,
  setShowingAd: action((state, payload) => {
    state.showingAd = payload;
  })
};

export default appModel;
