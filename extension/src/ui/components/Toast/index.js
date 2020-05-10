import React from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const StyledAlert = styled(Alert)`
  & div {
    font-size: 12px !important;
  }
`;

const Toast = () => {
  const { open, severity, message } = useStoreState(state => state.toast);
  const { setStatus } = useStoreActions(actions => actions.toast);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
      open={open}
      onClose={setStatus.bind(null, { open: false })}
    >
      <StyledAlert
        onClose={setStatus.bind(null, { open: false })}
        severity={severity}
      >
        {message}
      </StyledAlert>
    </Snackbar>
  );
};

export default Toast;
