export const APP_ID = 'yi-note';
export const PAGE = 'page';

export const WEBSITE_URL = 'https://www.yinote.co';
export const INSTALLATION_URL = `${WEBSITE_URL}/#installation`;
export const GITHUB_URL = 'https://github.com/shuowu/yi-note';
export const FAQ_URL = `${WEBSITE_URL}/#faqs`;

export const TYPE_BOOKMARKS = 'bookmarks';
export const TYPE_NOTES = 'notes';

export const TYPE_VIDEO_NOTE = 'video';

export const PROVIDER_YOUTUBE = 'youtube';

export const NODE_ENV_PLAYGROUND = 'playground';

export const QUERY_AUTO_JUMP = 'yinotetimestamp';

export const KEY_VIDEO_SEEK_SECONDS = 'video_seek_seconds';
export const KEY_APPLY_SEEK_SEC_ON_URL = 'apply_seek_sec_on_url';
export const KEY_SCREENSHOT_RESOLUTION = 'screenshot_resolution';
export const KEY_RELOAD_TAB = 'reload_tab';
export const KEY_RELOAD_TAB_ALLOWED_DOMAINS = 'reload_tab_allowed_domains';

export const SCREENSHOT_RESOLUTION = {
  360: { x: 640, y: 360 },
  720: { x: 1280, y: 720 }
};

export const REST_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REST_BASE_URL_PROD
    : process.env.REST_BASE_URL_DEV;
