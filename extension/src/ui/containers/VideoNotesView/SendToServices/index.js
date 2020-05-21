import React, { useEffect, useState, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Backdrop,
  Fade,
  IconButton,
  Typography
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { StyledModal, StyledPaper, StyledSpinner } from './styled';
import * as icons from './icons';
// import evernoteImg from './evernote-48.png';
// import onenoteImg from './onenote-48.png';
// import googledocsImg from './googledocs-48.png';
import TextButton from '../../../components/TextButton';
import { StorageFactory } from '../../../../common/services/storage';
import { getFileUrl } from '../../../../common/utils';
import { APP_ID } from '../../../../constants';

const services = ['evernote', 'googledocs', 'onenote'];

const SendToServices = () => {
  const { t } = useTranslation('services');
  const containerRef = useRef(null);
  const {
    page: { id, meta, notes },
    sendToPlatforms: { open }
  } = useStoreState(state => state.videoNotes);
  const {
    sendToPlatforms: { setOpen }
  } = useStoreActions(actions => actions.videoNotes);
  const [hasExistingNote, setHasExistingNote] = useState(false);
  const [service, setService] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});

  useEffect(() => {
    containerRef.current = document.getElementById(APP_ID);
  }, []);

  const clearState = () => {
    setLoading(false);
    setService('');
    setHasExistingNote(false);
    setMessage({});
  };

  const sendActionToBackground = (service, serviceNoteId) => {
    setLoading(true);
    browser.runtime
      .sendMessage({
        action: `send-to-${service}`,
        data: { id, meta, notes, serviceNoteId }
      })
      .then(({ code }) => {
        clearState();
        showMessage(code);
      })
      .catch(({ code, error }) => {
        logger.error(error);
        clearState();
        showMessage(code);
      });
  };

  const handleClose = () => {
    clearState();
    setOpen(false);
  };

  const handleClickService = service => async () => {
    clearState();
    const serviceData =
      (await StorageFactory.getStorage().getServiceData(service)) || {};
    if (serviceData[id]) {
      setHasExistingNote(true);
    } else {
      sendActionToBackground(service);
    }
    setService(service);
  };

  const handleSendAction = () => {
    sendActionToBackground(service);
  };

  const showMessage = status => {
    setMessage({ status, message: t(status) });
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
              <Typography>{t('send.title')}</Typography>
            </Grid>
            <Grid
              item
              container
              spacing={3}
              alignItems="center"
              justify="center"
            >
              {services.map(s => (
                <Grid item>
                  <Grid container justify="center">
                    <IconButton
                      disabled={!!service}
                      onClick={handleClickService(s)}
                    >
                      <img src={getFileUrl(icons[`${s}Img`])} />
                    </IconButton>
                  </Grid>
                  <Typography>{t(s)}</Typography>
                </Grid>    
              ))}
            </Grid>
            {hasExistingNote && !loading && (
              <Grid item container direction="column" spacing={2}>
                <Grid item>
                  <Typography color="primary">
                    {t('exist.message', { service: t(service) })}
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  justify="flex-end"
                  spacing={3}
                >
                  <Grid item>
                    <TextButton onClick={handleClose}>
                      {t('cancel.button')}
                    </TextButton>
                  </Grid>
                  <Grid item>
                    <TextButton onClick={handleSendAction}>
                      {t('proceed.button')}
                    </TextButton>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {loading && (
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <StyledSpinner />
                </Grid>
              </Grid>
            )}
          </Grid>
        </StyledPaper>
      </Fade>
    </StyledModal>
  );
};

export default SendToServices;
