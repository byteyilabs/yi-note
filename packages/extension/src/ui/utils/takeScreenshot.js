import { storage as StorageService } from '@yi-note/common/services';
import {
  KEY_SCREENSHOT_RESOLUTION,
  SCREENSHOT_RESOLUTION
} from '@yi-note/common/constants';

/**
 * Take screenshot for provided dom element with dimensions
 * Use 360p - 640 * 360 by default
 *
 * @param element - dom element
 * @param width
 * @param height
 *
 * @return image dataUri
 */
export default async element => {
  // TODO: pass in options instead of use settings from storage
  const settings = await StorageService.getStorage().getSettings();
  const { x, y } = SCREENSHOT_RESOLUTION[
    settings[KEY_SCREENSHOT_RESOLUTION] || 360
  ];

  if (!element) {
    logger.error('Missing element');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = x;
  canvas.height = y;
  const ctx = canvas.getContext('2d');
  let imageUri = null;
  try {
    ctx.drawImage(element, 0, 0, x, y);
    imageUri = canvas.toDataURL('image/jpeg');
  } catch (e) {
    logger.error(e);
  }

  return imageUri;
};
