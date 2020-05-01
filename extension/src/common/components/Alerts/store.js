import { action } from 'easy-peasy'

const alertsModel = {
  open: false,
  setOpen: action((state, open) => {
    state.open = open
  }),
  showAlerts: action((state, { title, content, onConfirm }) => {
    state.open = true

    if (title) {
      state.title = title
    }

    if (content) {
      state.content = content
    }

    if (onConfirm) {
      state.onConfirm = onConfirm
    }
  })
}

export default alertsModel
