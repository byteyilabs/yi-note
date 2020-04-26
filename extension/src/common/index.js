import { APP_ID, PAGE } from '../constants'

export const retry = (
  predicate,
  resolve,
  reject = () => {},
  maxTimes = 30,
  interval = 200
) => {
  if (predicate()) {
    resolve()
    return
  }

  let counter = 0
  let timer = window.setInterval(() => {
    if (counter++ >= maxTimes) {
      window.clearInterval(timer)
      reject()
    }

    if (predicate()) {
      resolve()
      window.clearInterval(timer)
    }
  }, interval)
}

export const sendMessage = (action, data, notFromExtension) =>
  window.postMessage(
    { action, from: notFromExtension ? PAGE : APP_ID, ...data },
    '*'
  )
