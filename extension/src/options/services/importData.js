// IMPORTANT: update import logic if storage or data structure changed

import { StorageFactory } from '../../common/services/storage'

export default async pages => {
  const storage = StorageFactory.getStorage()

  if (!Array.isArray(pages)) {
    throw new Error('Incorrect data formart: pages should be an array')
  }

  for (const page of pages) {
    const { id, notes } = page
    const existingPage = await storage.getPage(id)
    let pageToSave
    if (existingPage) {
      existingPage.notes = [...existingPage.notes, ...notes]
      pageToSave = existingPage
    } else {
      pageToSave = page
    }
    await storage.addPage(pageToSave)
  }
}
