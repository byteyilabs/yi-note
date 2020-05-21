export const APP_ID = 'yi-note';
export const PAGE = 'page';

export const GITHUB_URL = 'https://github.com/shuowu/yi-note';
export const INSTALLATION_URL =
  'https://github.com/shuowu/yi-note#installation';

export const TYPE_BOOKMARKS = 'bookmarks';
export const TYPE_NOTES = 'notes';

export const TYPE_VIDEO_NOTE = 'video';

export const PROVIDER_YOUTUBE = 'youtube';

export const NODE_ENV_PLAYGROUND = 'playground';

export const QUERY_AUTO_JUMP = 'yinotetimestamp';

export const REST_BASE_URL = process.env.NODE_ENV === 'production' ? process.env.REST_BASE_URL_PROD : process.env.REST_BASE_URL_DEV;
