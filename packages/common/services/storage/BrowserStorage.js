import { validate } from 'uuid';
import Storage from './Storage';
import { addNoteToList, addTagToList } from '../../utils';

export default class BrowserStorage extends Storage {
  constructor(area = 'local') {
    super();
    this.storage = browser.storage[area];
  }

  _getPages() {
    return this.storage.get().then(pages => {
      return Object.keys(pages)
        .filter(key => validate(key))
        .map(key => pages[key]);
    });
  }

  getPage(id) {
    return this.storage.get(id).then(page => page[id]);
  }

  addPage(page) {
    const storeObj = {
      [page.id]: page
    };
    return this.storage.set(storeObj).then(() => page);
  }

  removePage(id) {
    return this.storage.remove(id).then(() => id);
  }

  addNote(pageId, note) {
    return this.storage
      .get(pageId)
      .then(page => {
        page = page[pageId];
        page.notes = addNoteToList(page.notes, note);
        const storeObj = {
          [pageId]: page
        };

        return this.storage.set(storeObj);
      })
      .then(() => note);
  }

  removeNote(pageId, noteId) {
    return this.storage.get(pageId).then(page => {
      page = page[pageId];
      page.notes = page.notes.filter(note => note.id !== noteId);
      const storeObj = {
        [pageId]: page
      };

      return this.storage.set(storeObj);
    });
  }

  updateNote(pageId, note) {
    return this.addNote(pageId, note);
  }

  getNotes() {
    return this._getPages().then(pages => {
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

  addTag(pageId, tag) {
    return this.storage
      .get(pageId)
      .then(page => {
        page = page[pageId];
        page.tags = addTagToList(page.tags || [], tag);
        const storeObj = {
          [pageId]: page
        };

        return this.storage.set(storeObj);
      })
      .then(() => tag);
  }

  removeTag(pageId, tag) {
    return this.storage.get(pageId).then(page => {
      page = page[pageId];
      page.tags = (page.tags || []).filter(t => t !== tag);
      const storeObj = {
        [pageId]: page
      };

      return this.storage.set(storeObj);
    });
  }

  getTags() {
    return this._getPages().then(pages => {
      const tagsSet = Object.values(pages).reduce((acc, curr) => {
        if (!curr.tags) {
          return acc;
        }

        curr.tags.forEach(tag => acc.add(tag));
        return acc;
      }, new Set());
      return Array.from(tagsSet);
    });
  }

  getBookmarks() {
    return this._getPages().then(pages => {
      return Object.values(pages).map(page => {
        const { id, meta = {}, createdAt } = page;
        return { id, createdAt, ...meta };
      });
    });
  }

  searchBookmarks(query) {
    return this._getPages().then(pages => {
      const bookmarks = Object.values(pages)
        .filter(({ meta: { title = '' } }) => {
          const regex = new RegExp(query, 'i');
          return regex.test(title);
        })
        .map(({ id, meta = {} }) => ({
          id,
          ...meta
        }));
      return bookmarks;
    });
  }

  filterBookmarksByTags(tags) {
    return this._getPages().then(pages => {
      const bookmarks = Object.values(pages)
        .filter(({ tags: tagsInPage = [] }) => {
          return tags.reduce((acc, curr) => {
            return acc && tagsInPage.includes(curr);
          }, true);
        })
        .map(({ id, meta = {} }) => ({
          id,
          ...meta
        }));
      return bookmarks;
    });
  }

  searchNotes(query) {
    return this._getPages().then(pages => {
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
      promise = this._getPages().then(data => {
        return Object.values(data).reduce((acc, page) => {
          if (ids.includes(page.id)) {
            acc.push(page);
          }
          return acc;
        }, []);
      });
    } else {
      promise = this._getPages().then(data => {
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

  getServiceData(provider) {
    return this.storage.get(provider).then(data => data[provider]);
  }

  getSettings() {
    return this.storage.get('settings').then(data => {
      return data.settings || {};
    });
  }

  setSetting(setting) {
    return this.storage.get('settings').then(data => {
      let settings = data.settings || {};
      settings = { ...settings, ...setting };
      return this.storage.set({ settings }).then(() => settings);
    });
  }

  clearAll() {
    return this.storage.clear();
  }
}
