import Markdown from '../../../common/services/markdown';
import { secondsToTime, buildAutoSeekUrl } from '../../../common/utils';
import { INSTALLATION_URL } from '../../../constants';

class Generator {
  constructor(data) {
    this.data = data;
  }

  generatePayload() {
    const { meta: { title, description, url } = {}, notes = [] } = this.data;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
        </head>
        <body>
          <span>
            ${browser.i18n.getMessage(
              'services_template_signature',
              `<a href="${INSTALLATION_URL}">YiNote</a>`
            )}
          </span>
          <p><strong>${browser.i18n.getMessage(
            'services_template_description'
          )}</strong>${description}</p>
          <div>
          ${notes.map(note => {
            return `
              <div>
                <img src=${note.image} />
                <span>
                  <a href="${buildAutoSeekUrl(url, note.timestamp)}">
                    ${secondsToTime(note.timestamp)}
                  </a>
                </span>
                <p>${Markdown.toText(note.content)}</p>
              </div>
            `;
          })}
          </div>
        </body>
      </html>
    `;
  }
}

export default Generator;
