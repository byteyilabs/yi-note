import { StorageFactory } from '../../common/services/storage';
import {
  KEY_SCREENSHOT_RESOLUTION,
  SCREENSHOT_RESOLUTION
} from '../../constants';

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
  const settings = await StorageFactory.getStorage().getSettings();
  const { x, y } = SCREENSHOT_RESOLUTION[
    settings[KEY_SCREENSHOT_RESOLUTION] || 360
  ];

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
