import Oauth2 from '@yi-note/browser-extension-oauth2';
import Service from '../service';
import Generator from './generator';

const DRIVE_API_BASE_URL = 'https://www.googleapis.com/drive/v3';
const DOCS_API_BASE_URL = 'https://docs.googleapis.com/v1/documents';
const ROOT_FOLDER_NAME = 'YiNote';
const STORAGE_KEY_ROOT_FOLDER_ID = 'rootFolderId';
const SCREENSHOTS_FOLDER_NAME = 'Screenshots';
const STORAGE_KEY_SCREENSHOTS_FOLDER_ID = 'screenshotsFolderId';

class Googledocs extends Service {
  constructor(namespace, data) {
    super(namespace, data);

    this.oauth2 = new Oauth2({
      provider: this.namespace,
      authorization_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      client_id:
        '376112093481-4qs1q8b26u0jhqt159j7188hdu505d8v.apps.googleusercontent.com',
      scopes: [
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/documents'
      ]
    });
    this.generator = new Generator(data, this.oauth2);
  }

  async sendNotes() {
    const { id, meta, notes } = this.data;
    const rootFolderId = await this.maybeCreateFolderInDrive(
      ROOT_FOLDER_NAME,
      STORAGE_KEY_ROOT_FOLDER_ID
    );
    const screenshotsFolderId = await this.maybeCreateFolderInDrive(
      SCREENSHOTS_FOLDER_NAME,
      STORAGE_KEY_SCREENSHOTS_FOLDER_ID,
      rootFolderId
    );
    const documentId = await this.maybeCreateAndMoveDocument(
      id,
      meta.title,
      rootFolderId
    );
    return this.generateNotesInDoc(
      documentId,
      screenshotsFolderId,
      id,
      meta,
      notes
    );
  }

  async maybeCreateFolderInDrive(name, storageKey, parentFolderId) {
    let folderId;
    let folder;
    folderId = await this.storage.get(storageKey);
    if (folderId) {
      try {
        folder = await this.oauth2.callApi(
          `${DRIVE_API_BASE_URL}/files/${folderId}`
        );
      } catch (e) {
        if (e.status === 404) {
          logger.info('Folder not exist in drive');
          await this.saveMetadataIntoStorage(storageKey, '');
        } else {
          throw e;
        }
      }
    }
    if (!folder || !folderId) {
      const payload = {
        name,
        mimeType: 'application/vnd.google-apps.folder'
      };
      if (parentFolderId) {
        payload.parents = [parentFolderId];
      }
      folder = await this.oauth2.callApi(`${DRIVE_API_BASE_URL}/files`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      await this.storage.set(storageKey, folder.id);
    }
    folderId = folder.id;
    return folderId;
  }

  async maybeCreateAndMoveDocument(pageId, title, folderId = 'root') {
    let doc;
    doc = await this.oauth2.callApi(`${DOCS_API_BASE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    await this.oauth2.callApi(
      `${DRIVE_API_BASE_URL}/files/${doc.documentId}?addParents=${folderId}&removeParents=root`,
      { method: 'PATCH' }
    );
    await this.storage.set(pageId, doc.documentId);
    return doc.documentId;
  }

  async generateNotesInDoc(docId, screenshotsFolderId, pageId) {
    const payload = await this.generator.generatePayload({
      screenshotsFolderId,
      pageId
    });
    return this.oauth2.callApi(`${DOCS_API_BASE_URL}/${docId}:batchUpdate`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
}

export default Googledocs;
