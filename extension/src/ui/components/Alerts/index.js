import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles({
  contentText: { fontSize: 14 },
  buttonLabel: { fontSize: 14 }
})

const Alerts = () => {
  const { t } = useTranslation('alerts')
  const classes = useStyles()
  const { open, title, content, onConfirm } = useStoreState(
    state => state.alerts
  )
  const { setOpen } = useStoreActions(actions => actions.alerts)

  const handleConfirm = () => {
    onConfirm()
    setOpen(false)
  }

  const handleClose = () => setOpen(false)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          classes={{ root: classes.contentText }}
        >
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          classes={{ label: classes.buttonLabel }}
        >
          {t('secondary-button')}
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          classes={{ label: classes.buttonLabel }}
          autoFocus
        >
          {t('primary-button')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Alerts
