import EvernoteSDK from 'evernote';
import md5 from 'md5';
import { getBinaryFromBase64 } from '../utils';
import Markdown from '../../markdown';
import { secondsToTime, buildAutoSeekUrl } from '../../../utils';
import { INSTALLATION_URL } from '../../../constants';

const escape = url => {
  var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };
  return url.replace(/[&<>]/g, tag => {
    return tagsToReplace[tag] || tag;
  });
};

class Generator {
  constructor(data) {
    this.data = data;
  }

  generatePayload(notebook) {
    const { meta: { title, description, url } = {}, notes = [] } = this.data;
    let nBody =
      '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
    nBody += '<en-note>';
    nBody += `<span>${browser.i18n.getMessage(
      'services_template_signature',
      `<a style="padding-bottom: 20px;" href="${INSTALLATION_URL}">YiNote</a>`
    )}</span>`;
    nBody += '<br/>';
    nBody += `<div>${description}</div>`;
    nBody += '<br/>';
    const resources = [];
    notes.forEach(note => {
      const timestampedUrl = buildAutoSeekUrl(url, note.timestamp);
      if (note.image) {
        // Convert image to binary, then save as Evernote resource
        const fileMime = 'image/jpeg';
        const fileName = `${note.timestamp}.jpeg`;
        const binaryResource = getBinaryFromBase64(note.image);
        const md5Hash = md5(binaryResource);
        const resourceAttributes = new EvernoteSDK.Types.ResourceAttributes({
          fileName
        });
        const resource = new EvernoteSDK.Types.Resource({
          data: new EvernoteSDK.Types.Data({ body: binaryResource }),
          mime: fileMime,
          attributes: resourceAttributes
        });
        resources.push(resource);

        nBody += `<en-media width="640" height="480" type="${fileMime}" hash="${md5Hash}" />`;
      }
      nBody += `<div><span style="padding-right: 20px;"><a href="${escape(
        timestampedUrl
      )}">${secondsToTime(note.timestamp)}</a></span><p>${Markdown.toText(
        note.content
      )}</p></div>`;
    });

    nBody += '</en-note>';

    // Create note object
    const note = new EvernoteSDK.Types.Note();
    note.notebookGuid = notebook.guid;
    note.title = title;
    note.content = nBody;
    note.resources = resources;

    return note;
  }
}

export default Generator;
