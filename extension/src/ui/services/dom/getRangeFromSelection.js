export default () => {
  if (!document) {
    return null
  }

  let range
  const selection = document.getSelection()
  if (selection.rangeCount > 0) {
    range = selection.getRangeAt(0)
  }

  return [range, selection.anchorNode, selection.focusNode]
}
