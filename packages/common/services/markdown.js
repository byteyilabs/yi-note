import marked from 'marked';
import { secondsToTime, buildAutoSeekUrl } from '../utils';
import { INSTALLATION_URL } from '../constants';

class Markdown {
  static toText(markdownContent) {
    const div = document.createElement('div');
    div.innerHTML = marked(markdownContent);
    return div.innerText;
  }

  static toHTML(markdownContent) {
    return marked(markdownContent);
  }

  static pagesToMarkdown(pages) {
    let data = `<!-- ${browser.i18n.getMessage(
      'services_template_signature',
      `<a href="${INSTALLATION_URL}">YiNote</a>`
    )} -->\n\n`;

    for (let page of pages) {
      const { meta, notes } = page;
      data += `# [${meta.title}](${meta.url})\n\n`;

      for (let note of notes) {
        data += `## [${secondsToTime(note.timestamp)}](${buildAutoSeekUrl(
          meta.url,
          note.timestamp
        )})\n\n`;
        data += note.content + '\n\n';
      }
    }

    return data;
  }
}

export default Markdown;
