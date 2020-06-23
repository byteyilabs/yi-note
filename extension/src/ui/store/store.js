import { actionOn } from 'easy-peasy';
import app from './app';
import videoNotes, { defaultPage, defaultNote } from './videoNotes';
import search from './search';
import page from '../../common/store/page';
import alerts from '../../common/components/Alerts/store';
import tagDialog from '../../common/components/TagDialog/store';

const storeModel = {
  app,
  alerts,
  tagDialog,
  videoNotes,
  search,
  page,
  onSetPage: actionOn(
    actions => actions.page.setPage,
    state => {
      state.search.bookmarks = [];
      state.search.notes = [];
    }
  ),
  onSetUrl: actionOn(
    actions => actions.app.setUrl,
    state => {
      state.videoNotes.page = { ...defaultPage };
      state.videoNotes.editor.active = false;
      state.videoNotes.editor.note = { ...defaultNote };
    }
  )
};

export default storeModel;
