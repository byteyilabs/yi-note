import React, { useEffect, useState, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { Grid, Backdrop, Fade, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { StyledModal, StyledPaper } from './styled';
import Sponsor from './Sponsor';
import Star from './Star';
import Share from './Share';
import { APP_ID } from '../../../../constants';

const SupportExtension = () => {
  const { t } = useTranslation('notesView');
  const { open } = useStoreState(state => state.videoNotes.support);
  const { setOpen } = useStoreActions(actions => actions.videoNotes.support);
  const containerRef = useRef(null);
  const [message, setMessage] = useState({});

  useEffect(() => {
    containerRef.current = document.getElementById(APP_ID);
  }, []);

  const clearState = () => {
    setMessage({});
  };

  const handleClose = () => {
    clearState();
    setOpen(false);
  };

  return (
    <StyledModal
      container={containerRef.current}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <StyledPaper>
          <Grid container direction="column" spacing={3}>
            {message.status && (
              <Grid item>
                <Alert severity={message.status}>{message.message}</Alert>
              </Grid>
            )}
            <Grid item container justify="center">
              <Typography>{t('support.text')}</Typography>
            </Grid>
            <Grid item>
              <Sponsor />
            </Grid>
            <Grid item>
              <Star />
            </Grid>
            <Grid item>
              <Share />
            </Grid>
          </Grid>
        </StyledPaper>
      </Fade>
    </StyledModal>
  );
};

export default SupportExtension;
