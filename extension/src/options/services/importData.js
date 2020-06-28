// IMPORTANT: update import logic if storage or data structure changed

import { storage as StorageService } from '@yi-note/common/services';

export default async pages => {
  const storage = StorageService.getStorage();

  if (!Array.isArray(pages)) {
    throw new Error('Incorrect data formart: pages should be an array');
  }

  for (const page of pages) {
    const { id, notes } = page;
    const existingPage = await storage.getPage(id);
    let pageToSave;
    if (existingPage) {
      existingPage.notes = [...existingPage.notes, ...notes];
      pageToSave = existingPage;
    } else {
      pageToSave = page;
    }
    await storage.addPage(pageToSave);
  }
};
