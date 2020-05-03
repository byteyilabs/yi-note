import Storage from './Storage';
import { addNoteToList } from '../../utils';

const getAllPages = () =>
  Object.keys(window.localStorage)
    .map(key => {
      let obj = {};
      const value = window.localStorage.getItem(key);
      try {
        obj = JSON.parse(value);
      } catch {
        logger.warn('failed to parse', value);
      }

      return obj;
    })
    .filter(({ id }) => !!id);

export default class LocalStorage extends Storage {
  getPage(id) {
    return new Promise((resolve, reject) => {
      try {
        const page = JSON.parse(window.localStorage.getItem(id));
        resolve(page);
      } catch (e) {
        reject(e);
      }
    });
  }

  addPage(page) {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem(page.id, JSON.stringify(page));
        resolve(page);
      } catch (e) {
        reject(e);
      }
    });
  }

  removePage(id) {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.removeItem(id);
        resolve(id);
      } catch (e) {
        reject(e);
      }
    });
  }

  addNote(pageId, note) {
    return new Promise((resolve, reject) => {
      try {
        const page = JSON.parse(window.localStorage.getItem(pageId));
        page.notes = addNoteToList(page.notes || [], note);
        window.localStorage.setItem(pageId, JSON.stringify(page));
        resolve(note);
      } catch (e) {
        reject(e);
      }
    });
  }

  updateNote(pageId, note) {
    return this.addNote(pageId, note);
  }

  removeNote(id, pageId) {
    return new Promise((resolve, reject) => {
      try {
        const page = JSON.parse(window.localStorage.getItem(pageId));
        page.notes = page.notes || [];
        page.notes = page.notes.filter(note => note.id !== id);
        window.localStorage.setItem(pageId, JSON.stringify(page));
        resolve(id);
      } catch (e) {
        reject(e);
      }
    });
  }

  getBookmarks() {
    return new Promise((resolve, reject) => {
      try {
        const bookmarks = getAllPages().map(({ id, meta = {} }) => ({
          id,
          ...meta
        }));
        resolve(bookmarks);
      } catch (e) {
        reject(e);
      }
    });
  }

  getNotes() {
    return new Promise((resolve, reject) => {
      try {
        const notes = getAllPages().reduce((acc, curr) => {
          if (!curr.notes) {
            return acc;
          }

          return [
            ...acc,
            ...curr.notes.map(note => ({ ...note, page: curr.meta }))
          ];
        }, []);

        resolve(notes);
      } catch (e) {
        reject(e);
      }
    });
  }

  searchBookmarks(query) {
    return new Promise((resolve, reject) => {
      try {
        const bookmarks = getAllPages()
          .filter(({ meta: { title = '', description = '' } }) => {
            const regex = new RegExp(query, 'i');
            return regex.test(title) || regex.test(description);
          })
          .map(({ id, meta = {} }) => ({ id, ...meta }));

        resolve(bookmarks);
      } catch (e) {
        reject(e);
      }
    });
  }

  searchNotes(query) {
    return new Promise((resolve, reject) => {
      try {
        const notes = getAllPages()
          .reduce((acc, curr) => {
            if (!curr.notes) {
              return acc;
            }

            return [
              ...acc,
              ...curr.notes.map(note => ({ ...note, page: curr.meta }))
            ];
          }, [])
          .filter(({ content }) => {
            const regex = new RegExp(query, 'i');
            return regex.test(content);
          });

        resolve(notes);
      } catch (e) {
        reject(e);
      }
    });
  }
}
