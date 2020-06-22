import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Snackbar = () => {
  const {
    horizontal,
    vertical,
    message,
    open,
    severity,
    duration
  } = useStoreState(state => state.app.snackbar);
  const { setStates } = useStoreActions(actions => actions.app.snackbar);

  const handleClose = () => {
    setStates({ open: false, message: '' });
  }

  return (
    <MuiSnackbar
      anchorOrigin={{ horizontal, vertical }}
      message={message}
      autoHideDuration={duration}
      open={open}
      onClose={handleClose}
    >
      <MuiAlert severity={severity}>{message}</MuiAlert>
    </MuiSnackbar>
  );
};

export default Snackbar;
