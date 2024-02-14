import { v5 } from 'uuid';
import compose from 'compose-function';
import videoUrlParser from 'js-video-url-parser';
import { PROVIDER_YOUTUBE } from '../constants';
import uuidNamespace from './uuid-namespace';

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
    return v5(`${provider}-${id}`, uuidNamespace);
  }

  return v5(urlWithoutHash, uuidNamespace);
};
