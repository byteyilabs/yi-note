const noop = () => {}

export default class ClassWatcher {

  constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
    this.targetNode = targetNode
    this.classToWatch = classToWatch
    this.classAddedCallback = classAddedCallback || noop
    this.classRemovedCallback = classRemovedCallback || noop
    this.observer = null
    this.lastClassState = targetNode.classList.contains(this.classToWatch)

    this.init()
  }

  init() {
    this.observer = new window.MutationObserver(this.mutationCallback)
    this.observe()
  }

  observe() {
    this.observer.observe(this.targetNode, { attributes: true })
  }

  disconnect() {
    this.observer.disconnect()
  }

  mutationCallback = mutationsList => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        let currentClassState = mutation.target.classList.contains(this.classToWatch)
        if (this.lastClassState !== currentClassState) {
          this.lastClassState = currentClassState
          if (currentClassState) {
            this.classAddedCallback()
          }
          else {
            this.classRemovedCallback()
          }
        }
      }
    }
  }
}