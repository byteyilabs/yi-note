import { QUERY_AUTO_JUMP } from '../../constants';
import addQueryToUrl from './addQueryToUrl';

export default (url, timestamp) => {
  let res = addQueryToUrl(url, QUERY_AUTO_JUMP, timestamp);
  res = addQueryToUrl(res, 't', `${timestamp}s`);
  return res;
};
