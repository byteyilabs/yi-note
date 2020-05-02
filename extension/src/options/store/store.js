import app from './app'
import bookmarks from './bookmarks'
import page from './page'
import alerts from '../../common/components/Alerts/store'
import { thunk } from 'easy-peasy'

const storeModel = {
  app,
  bookmarks,
  page,
  alerts,
  reset: thunk(actions => {
    for (const model in actions) {
      if (typeof actions[model].reset === 'undefined') {
        continue
      }
      actions[model].reset()
    }
  })
}

export default storeModel
