import videoUrlParser from 'js-video-url-parser';
import { QUERY_AUTO_JUMP } from '../../constants';

export default (url, timestamp) => {
  if (timestamp < 0) {
    timestamp = 0;
  }

  const { provider } = videoUrlParser.parse(url) || {};
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);
  params.delete('t');
  params.delete(QUERY_AUTO_JUMP);
  if (provider === 'youtube') {
    params.set('t', timestamp);
  } else {
    params.set(QUERY_AUTO_JUMP, timestamp);
  }
  parsedUrl.search = params.toString();
  return parsedUrl.toString();
};
