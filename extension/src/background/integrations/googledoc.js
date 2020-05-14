import Oauth2 from './oauth2';
import { b64toBlob } from './utils';
import { secondsToTime } from '../../common/utils';

const GOOGLE_API_BASE_URL = 'https://www.googleapis.com';
const DRIVE_API_BASE_URL = 'https://www.googleapis.com/drive/v3';
const DOCS_API_BASE_URL = 'https://docs.googleapis.com/v1/documents';
const ROOT_FOLDER_NAME = 'YiNote';
const STORAGE_KEY_ROOT_FOLDER_ID = 'rootFolderId';
const SCREENSHOTS_FOLDER_NAME = 'Screenshots';
const STORAGE_KEY_SCREENSHOTS_FOLDER_ID = 'screenshotsFolderId';

const getImageDriveUrl = id => `https://drive.google.com/file/d/${id}/view`;

class Googledoc {
  constructor() {
    this.provider = 'googledoc';
    this.driveApiBase = '';
    this.oauth2 = new Oauth2({
      provider: this.provider,
      issuer: 'https://accounts.google.com/o/oauth2/v2/auth',
      clientId:
        '376112093481-4qs1q8b26u0jhqt159j7188hdu505d8v.apps.googleusercontent.com',
      scopes: [
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/documents'
      ],
      tokenExpiryPredicate: data => {
        const { error } = data;
        return error && error.code === 401;
      }
    });
  }

  async sendNotes({ id, meta, notes }) {
    try {
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
      await this.generateNotesInDoc(
        documentId,
        screenshotsFolderId,
        id,
        meta,
        notes
      );
    } catch (e) {
      logger.error(e);
    }
  }

  async getStoredData(key) {
    const data = await browser.storage.local.get(this.provider);
    const providerData = data[this.provider];
    return providerData ? providerData[key] : null;
  }

  async saveMetadataIntoStorage(key, value) {
    const data = await browser.storage.local.get(this.provider);
    const dataToSave = data[this.provider];
    dataToSave[key] = value;
    await browser.storage.local.set({ [this.provider]: dataToSave });
  }

  async maybeCreateFolderInDrive(name, storageKey, parentFolderId) {
    let folderId;
    let folder;
    try {
      folderId = await this.getStoredData(storageKey);
      if (folderId) {
        try {
          folder = await this.oauth2.callApi(
            `${DRIVE_API_BASE_URL}/files/${folderId}`
          );
        } catch (e) {
          logger.info('Folder not exist in drive');
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
        await this.saveMetadataIntoStorage(storageKey, folder.id);
      }
      folderId = folder.id;
    } catch (e) {
      logger.error(e);
    }
    return folderId;
  }

  async maybeCreateAndMoveDocument(pageId, title, folderId = 'root') {
    let docId;
    let doc;
    try {
      docId = await this.getStoredData(pageId);
      if (docId) {
        try {
          doc = await this.oauth2.callApi(`${DOCS_API_BASE_URL}/${docId}`);
        } catch (e) {
          logger.info('Document not exist in drive');
        }
      }
      if (!docId || !doc) {
        doc = await this.oauth2.callApi(`${DOCS_API_BASE_URL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title })
        });
        docId = doc.documentId;
        await this.oauth2.callApi(
          `${DRIVE_API_BASE_URL}/files/${docId}?addParents=${folderId}&removeParents=root`,
          { method: 'PATCH' }
        );
        await this.saveMetadataIntoStorage(pageId, docId);
      }
    } catch (e) {
      logger.error(e);
    }
    return docId;
  }

  uploadScreenshot(imageUri, name, folderId = 'root') {
    const b64 = imageUri.split(',')[1];
    const blob = b64toBlob(b64, 'image/jpeg');
    // eslint-disable-next-line no-undef
    const form = new FormData();
    form.append(
      'metadata',
      // eslint-disable-next-line no-undef
      new Blob(
        [
          JSON.stringify({
            name,
            mimeType: 'image/jpeg',
            parents: [folderId]
          })
        ],
        { type: 'application/json' }
      )
    );
    form.append('file', blob);
    return this.oauth2.callApi(
      `${GOOGLE_API_BASE_URL}/upload/drive/v3/files?uploadType=multipart&fields=id`,
      { method: 'POST', body: form }
    );
  }

  async generateNotesInDoc(docId, screenshotsFolderId, pageId, meta, notes) {
    let trackIndex = 1;
    const requests = [];
    // Add signature
    const signature = 'Generated from YiNote browser extension';
    requests.push({
      insertText: {
        text: signature + '\n\n',
        location: {
          index: trackIndex
        }
      }
    });
    requests.push({
      updateTextStyle: {
        range: {
          startIndex: trackIndex,
          endIndex: 14
        },
        textStyle: {
          fontSize: {
            magnitude: 12,
            unit: 'PT'
          }
        },
        fields: '*'
      }
    });
    requests.push({
      updateTextStyle: {
        range: {
          startIndex: 16,
          endIndex: 40
        },
        fields: '*',
        textStyle: {
          link: {
            url: 'https://github.com/shuowu/yi-note#installation'
          },
          fontSize: {
            magnitude: 14,
            unit: 'PT'
          },
          foregroundColor: {
            color: {
              rgbColor: {
                blue: 1
              }
            }
          }
        }
      }
    });
    trackIndex += signature.length + 2;

    // Add description
    requests.push({
      insertText: {
        text: meta.description + '\n\n',
        location: {
          index: trackIndex
        }
      }
    });
    requests.push({
      updateTextStyle: {
        range: {
          startIndex: trackIndex,
          endIndex: trackIndex + meta.description.length
        },
        textStyle: {
          fontSize: {
            magnitude: 14,
            unit: 'PT'
          }
        },
        fields: '*'
      }
    });
    trackIndex += meta.description.length + 2;

    // Add notes
    for (const note of notes) {
      // Add timestamp
      const time = secondsToTime(note.timestamp);
      requests.push({
        insertText: {
          text: time + '   ',
          location: {
            index: trackIndex
          }
        }
      });
      requests.push({
        updateTextStyle: {
          range: {
            startIndex: trackIndex,
            endIndex: trackIndex + time.length
          },
          textStyle: {
            link: {
              url: meta.url
            },
            fontSize: {
              magnitude: 12,
              unit: 'PT'
            },
            foregroundColor: {
              color: {
                rgbColor: {
                  blue: 1
                }
              }
            }
          },
          fields: '*'
        }
      });
      trackIndex += time.length + 3;

      // Add screenshot
      const { id: screenshotId } = await this.uploadScreenshot(
        note.image,
        `${pageId}_${note.timestamp}.jpg`,
        screenshotsFolderId
      );
      const screenshotText = 'Screenshot';
      requests.push({
        insertText: {
          text: `${screenshotText}\n`,
          location: {
            index: trackIndex
          }
        }
      });
      requests.push({
        updateTextStyle: {
          range: {
            startIndex: trackIndex,
            endIndex: trackIndex + screenshotText.length
          },
          textStyle: {
            link: {
              url: getImageDriveUrl(screenshotId)
            },
            fontSize: {
              magnitude: 12,
              unit: 'PT'
            },
            foregroundColor: {
              color: {
                rgbColor: {
                  blue: 1
                }
              }
            }
          },
          fields: '*'
        }
      });
      trackIndex += screenshotText.length + 1;

      // Add note
      requests.push({
        insertText: {
          text: note.content + '\n',
          location: {
            index: trackIndex
          }
        }
      });
      requests.push({
        updateTextStyle: {
          range: {
            startIndex: trackIndex,
            endIndex: trackIndex + time.length
          },
          textStyle: {
            fontSize: {
              magnitude: 12,
              unit: 'PT'
            }
          },
          fields: '*'
        }
      });
      trackIndex += note.content.length + 1;
    }

    await this.oauth2.callApi(`${DOCS_API_BASE_URL}/${docId}:batchUpdate`, {
      method: 'POST',
      body: JSON.stringify({ requests })
    });
  }
}

export default Googledoc;
