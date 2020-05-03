import { uuid } from 'uuidv4'
import { generatePageId } from '../../common/utils'
import { StorageFactory } from '../../common/services/storage'

const storage = StorageFactory.getStorage()

const processSyncStorageBookmarks = async data => {
  for (const key in data) {
    if (typeof data[key] !== 'object' || Array.isArray(data[key])) {
      continue
    }
    const meta = data[key]
    const url = `https://${key}`
    const id = generatePageId(url)
    const existingPage = await storage.getPage(id)
    if (!existingPage) {
      const page = {
        id,
        notes: [],
        meta: {
          title: meta.title,
          url
        },
        createAt: +new Date()
      }
      await storage.addPage(page)
    }
  }
}

const processSyncStorageNotes = async (key, data) => {
  const url = `https://${key}`
  const pageId = generatePageId(url)
  for (const timestamp in data) {
    const note = {
      id: uuid(),
      content: data[timestamp].content,
      timestamp: +timestamp,
      type: 'video'
    }
    await storage.addNote(pageId, note)
  }
}

const processLocalStoragePage = async (key, data) => {
  // eslint-disable-next-line no-undef
  const { origin, pathname, search } = new URL(`https://${key}`)
  const url = `${origin}${pathname}${search}`
  const pageId = generatePageId(url)
  let page = await storage.getPage(pageId)
  if (!page) {
    const pageObj = {
      id: pageId,
      notes: [],
      meta: {
        title: data.title,
        url
      },
      createAt: +new Date()
    }
    page = await storage.addPage(pageObj)
  }

  for (const key in data) {
    const { comment } = data[key]
    if (comment) {
      const note = {
        id: uuid(),
        content: comment.content,
        type: 'article'
      }
      await storage.addNote(pageId, note)
    }
  }
}

export default async () => {
  // Process data in local storage
  const dataInLocal = await browser.storage.local.get()
  await browser.storage.local.clear()
  for (const key in dataInLocal) {
    const value = dataInLocal[key]
    if (typeof value !== 'object' || Array.isArray(value)) {
      continue
    }
    await processLocalStoragePage(key, value)
  }

  // Process data in sync storage
  const dataInSync = await browser.storage.sync.get()
  await browser.storage.sync.clear()
  for (const key in dataInSync) {
    if (
      key === 'settings' ||
      (key.startsWith('vn-') && key !== 'vn-bookmarks')
    ) {
      continue
    }

    if (key === 'vn-bookmarks') {
      await processSyncStorageBookmarks(dataInSync['vn-bookmarks'])
    } else {
      await processSyncStorageNotes(key, dataInSync[key])
    }
  }
}
