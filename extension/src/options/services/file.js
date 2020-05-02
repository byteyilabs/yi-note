import { saveAs } from 'file-saver'

export const readAsJson = file => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader()
    reader.readAsText(file)

    reader.onload = event => {
      const { result } = event.target
      try {
        resolve(JSON.parse(result))
      } catch (e) {
        reject(e)
      }
    }

    reader.onerror = err => {
      reject(err)
    }
  })
}

export const exportJsonFile = (data, filename) => {
  // eslint-disable-next-line no-undef
  const blob = new Blob([JSON.stringify(data)], {
    type: 'text/json;charset=utf-8'
  })
  saveAs(blob, filename)
}
