import { APP_ID, PAGE } from '../../constants'

// Function for extension and host webpage communication
export default (action, data, notFromExtension) =>
  window.postMessage(
    { action, from: notFromExtension ? PAGE : APP_ID, ...data },
    '*'
  )
