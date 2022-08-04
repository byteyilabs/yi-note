import { v5 } from 'uuid';
import compose from 'compose-function';
import videoUrlParser from 'js-video-url-parser';
import { PROVIDER_YOUTUBE } from '../constants';

const NAMESPACE = 'e1433c8f-bc34-431d-99b1-2a78abdd7f35';

const getUrlWithoutHash = url => {
  const parsedUrl = new URL(url);
  parsedUrl.hash = '';
  return parsedUrl.toString();
};

const getVideoInfo = url => {
  const info = videoUrlParser.parse(url) || {};
  return { ...info, url };
};

export default url => {
  const { provider, id, url: urlWithoutHash } = compose(
    getVideoInfo,
    getUrlWithoutHash
  )(url);
  if (provider === PROVIDER_YOUTUBE) {
    return v5(`${provider}-${id}`, NAMESPACE);
  }

  return v5(urlWithoutHash, NAMESPACE);
};
