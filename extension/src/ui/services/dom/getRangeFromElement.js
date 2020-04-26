import isElement from './isElement'

export default el => {
  if (!isElement(el)) {
    return null
  }

  const range = document.createRange()
  range.selectNodeContents(el)

  return range
}
