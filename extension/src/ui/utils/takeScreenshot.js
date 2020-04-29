/**
 * Take screenshot for provided dom element with dimensions
 * 
 * @param element - dom element
 * @param width
 * @param height
 * 
 * @return image dataUri
 */
export default (element, width, height) => {
  var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    var ctx = canvas.getContext('2d')
    ctx.drawImage(element, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg')
}
