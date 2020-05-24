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
import { StyledModal, StyledPaper } from './styled';
import { getFileUrl } from '../../../../common/utils';
import { APP_ID, INSTALLATION_URL } from '../../../../constants';
import * as icons from './icons';

const methods = ['facebook', 'twitter', 'copylink'];
const hashTags = [
  'edtech',
  'YiNote',
  'Turbonote',
  'mooc',
  'flipclass',
  'video',
  'youtube',
  'notetaking'
];

const ShareExtension = () => {
  const { t } = useTranslation('notesView');
  const { open } = useStoreState(state => state.videoNotes.share);
  const { setOpen } = useStoreActions(actions => actions.videoNotes.share);
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

  const openShareDialog = url => {
    const width = 670;
    var height = 340;
    var spec = `width=670, height=340, top=${(window.innerHeight - height) /
      2}, left=${(window.innerWidth - width) / 2}`;
    window.open(url, '', spec);
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(INSTALLATION_URL);
    const text = encodeURIComponent(t('share.text'));
    const tags = hashTags.map(ht => `#${ht}`).join('');
    openShareDialog(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&hashtag=${encodeURIComponent(
        tags
      )}&quote=${text}`
    );
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(t('share.text'));
    const url = encodeURIComponent(INSTALLATION_URL);
    const tags = hashTags.join(',');
    openShareDialog(
      `https://twitter.com/share?url=${url}&text=${text}&hashtags=${tags}`
    );
  };

  const copylink = () => {
    browser.runtime
      .sendMessage({
        action: `copy`,
        data: INSTALLATION_URL
      })
      .then(() => {
        setMessage({ status: 'success', message: t('share.copylink.success') });
      });
  };

  const handleClick = method => () => {
    switch (method) {
      case 'facebook':
        shareToFacebook();
        return;
      case 'twitter':
        shareToTwitter();
        return;
      case 'copylink':
        copylink();
        return;
    }
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
              <Typography>{t('share.title')}</Typography>
            </Grid>
            <Grid
              item
              container
              spacing={3}
              alignItems="center"
              justify="center"
            >
              {methods.map(method => (
                <Grid key={method} item>
                  <Grid container justify="center">
                    <IconButton onClick={handleClick(method)}>
                      <img src={getFileUrl(icons[`${method}Img`])} />
                    </IconButton>
                  </Grid>
                  <Typography align="center">
                    {t(`share.${method}.label`)}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </StyledPaper>
      </Fade>
    </StyledModal>
  );
};

export default ShareExtension;
