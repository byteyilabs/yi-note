import BaseGenerator from '../generator';
import { b64toBlob } from '../utils';
import { secondsToTime, getUrlWithTimestamp } from '../../../common/utils';
import { INSTALLATION_URL } from '../../../constants';

const GOOGLE_API_BASE_URL = 'https://www.googleapis.com';

const getImageDriveUrl = id => `https://drive.google.com/file/d/${id}/view`;

class Generator extends BaseGenerator {
  constructor(data, oauth2) {
    super(data);
    this.oauth2 = oauth2;
    this.trackIndex = 1;
    this.requests = [];
  }

  addSignature() {
    const signature = 'Generated From YiNote';
    this.requests.push({
      insertText: {
        text: signature + '\n\n',
        location: {
          index: this.trackIndex
        }
      }
    });
    this.requests.push({
      updateTextStyle: {
        range: {
          startIndex: this.trackIndex,
          endIndex: 15
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
    this.requests.push({
      updateTextStyle: {
        range: {
          startIndex: 16,
          endIndex: 22
        },
        fields: '*',
        textStyle: {
          link: {
            url: INSTALLATION_URL
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
        }
      }
    });
    this.trackIndex += signature.length + 2;
  }

  addDescription() {
    const { description } = this.data.meta;
    this.requests.push({
      insertText: {
        text: description + '\n\n',
        location: {
          index: this.trackIndex
        }
      }
    });
    this.requests.push({
      updateTextStyle: {
        range: {
          startIndex: this.trackIndex,
          endIndex: this.trackIndex + description.length
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
    this.trackIndex += description.length + 2;
  }

  addNoteTime(note) {
    const { url } = this.data.meta;
    const { timestamp } = note;
    const time = secondsToTime(timestamp);
    this.requests.push({
      insertText: {
        text: time + '   ',
        location: {
          index: this.trackIndex
        }
      }
    });
    this.requests.push({
      updateTextStyle: {
        range: {
          startIndex: this.trackIndex,
          endIndex: this.trackIndex + time.length
        },
        textStyle: {
          link: {
            url: getUrlWithTimestamp(url, timestamp)
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
    this.trackIndex += time.length + 3;
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

  async addScreenshot(note, screenshotsFolderId, pageId) {
    const { image, timestamp } = note;
    const { id: screenshotId } = await this.uploadScreenshot(
      image,
      `${pageId}_${timestamp}.jpg`,
      screenshotsFolderId
    );
    const screenshotText = 'Screenshot';
    this.requests.push({
      insertText: {
        text: `${screenshotText}\n`,
        location: {
          index: this.trackIndex
        }
      }
    });
    this.requests.push({
      updateTextStyle: {
        range: {
          startIndex: this.trackIndex,
          endIndex: this.trackIndex + screenshotText.length
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
    this.trackIndex += screenshotText.length + 1;
  }

  addNoteContent(note) {
    this.requests.push({
      insertText: {
        text: note.content + '\n',
        location: {
          index: this.trackIndex
        }
      }
    });
    this.requests.push({
      updateTextStyle: {
        range: {
          startIndex: this.trackIndex,
          endIndex: this.trackIndex + note.content.length
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
    this.trackIndex += note.content.length + 1;
  }

  async addNotes(screenshotsFolderId, pageId) {
    const { notes } = this.data;
    for (const note of notes) {
      this.addNoteTime(note);
      await this.addScreenshot(note, screenshotsFolderId, pageId);
      this.addNoteContent(note);
    }
  }

  async generatePayload({ screenshotsFolderId, pageId }) {
    this.addSignature();
    this.addDescription();
    await this.addNotes(screenshotsFolderId, pageId);
    return { requests: this.requests };
  }
}

export default Generator;
