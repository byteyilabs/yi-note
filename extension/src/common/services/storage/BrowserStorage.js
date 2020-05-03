import Storage from './Storage';
import { addNoteToList } from '../../utils';

export default class BrowserStorage extends Storage {
  constructor(area = 'local') {
    super();
    this.storageArea = browser.storage[area];
  }

  getPage(id) {
    return this.storageArea.get(id).then(page => page[id]);
  }

  addPage(page) {
    const storeObj = {
      [page.id]: page
    };
    return this.storageArea.set(storeObj).then(() => page);
  }

  removePage(id) {
    return this.storageArea.remove(id).then(() => id);
  }

  addNote(pageId, note) {
    return this.storageArea
      .get(pageId)
      .then(page => {
        page = page[pageId];
        page.notes = addNoteToList(page.notes, note);
        const storeObj = {
          [pageId]: page
        };

        return this.storageArea.set(storeObj);
      })
      .then(() => note);
  }

  updateNote(pageId, note) {
    return this.addNote(pageId, note);
  }

  getBookmarks() {
    return this.storageArea.get().then(pages => {
      const bookmarks = Object.values(pages).map(
        ({ id, meta = {}, createdAt }) => ({
          id,
          createdAt,
          ...meta
        })
      );
      return bookmarks;
    });
  }

  getNotes() {
    return this.storageArea.get().then(pages => {
      const notes = Object.values(pages).reduce((acc, curr) => {
        if (!curr.notes) {
          return acc;
        }

        return [
          ...acc,
          ...curr.notes.map(note => ({ ...note, page: curr.meta }))
        ];
      }, []);
      return notes;
    });
  }

  searchBookmarks(query) {
    return this.storageArea.get().then(pages => {
      const bookmarks = Object.values(pages)
        .filter(({ meta: { title = '', description = '' } }) => {
          const regex = new RegExp(query, 'i');
          return regex.test(title) || regex.test(description);
        })
        .map(({ id, meta = {} }) => ({
          id,
          ...meta
        }));
      return bookmarks;
    });
  }

  searchNotes(query) {
    return this.storageArea.get().then(pages => {
      const notes = Object.values(pages)
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
      return notes;
    });
  }

  getPagesForExport(ids) {
    let promise;
    if (ids) {
      promise = this.storageArea.get().then(data => {
        return Object.values(data).reduce((acc, page) => {
          if (ids.includes(page.id)) {
            acc.push(page);
          }
          return acc;
        }, []);
      });
    } else {
      promise = this.storageArea.get().then(data => {
        return Object.values(data).reduce((acc, curr) => {
          if (curr.id) {
            acc.push(curr);
          }
          return acc;
        }, []);
      });
    }
    return promise;
  }

  clearAll() {
    return this.storageArea.clear();
  }
}
