import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { Grid, Backdrop, Fade, CircularProgress } from '@material-ui/core';
import ExportPDFIcon from '@material-ui/icons/GetApp';
import ReloadIcon from '@material-ui/icons/Autorenew';
import { StyledModal, StyledPaper } from './styled';
import NoteItem from './NoteItem';
import ScrollableList from '../../../components/ScrollableList';
import IconButton from '../../../components/IconButton';
import { usePlayer } from '../../../hooks';
import { takeScreenshot } from '../../../utils';
import { delay } from '../../../../common/utils';
import { exportFile } from '../../../../common/services/file';
import { PdfFactory } from '../../../services/pdf';
import { APP_ID } from '../../../../constants';

const Preview = () => {
  const { t } = useTranslation('notesView');
  const {
    app: { url },
    videoNotes: {
      page: { id: pageId, notes, meta: { title } = {} },
      preview: { open }
    }
  } = useStoreState(state => state);
  const {
    preview: { setOpen },
    setPage,
    saveNote
  } = useStoreActions(actions => actions.videoNotes);
  const playerRef = usePlayer();
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const previewContentRef = useRef(null);
  const triedLoadScreenshots = useRef(false);

  const loadScreenshots = useCallback(
    async (forceLoad = false) => {
      setLoading(true);
      const player = playerRef.current;
      const currentTime = await player.getCurrentTime();
      const videoEl = player.getVideoElement();
      // Take screenshots
      for (const note of notes) {
        if (note.image && !forceLoad) {
          continue;
        }
        player.seek(note.timestamp);
        await delay(500);
        note.image = takeScreenshot(videoEl);
        saveNote(note);
      }
      // Resume back to start time and pause video
      player.seek(currentTime);
      playerRef.current.pause();
      setLoading(false);
    },
    [notes, playerRef, saveNote]
  );

  useEffect(() => {
    containerRef.current = document.getElementById(APP_ID);
  }, []);

  useEffect(() => {
    const shouldLoadImages = notes.reduce((acc, note) => {
      return !note.image || acc;
    }, false);
    if (open && shouldLoadImages && !triedLoadScreenshots.current) {
      triedLoadScreenshots.current = true;
      loadScreenshots();
    }
  }, [loadScreenshots, notes, open, playerRef, setPage]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleGeneratePDF = async () => {
    const blob = PdfFactory.getGenerator({ url, title, notes }).getBlobOutput();
    await exportFile(blob, `${APP_ID}_${pageId}.pdf`);
  };

  const handleReloadScreenshots = async () => {
    await loadScreenshots(true);
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
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid
              ref={previewContentRef}
              container
              direction="column"
              spacing={6}
            >
              <Grid item container justify="flex-end" spacing={2}>
                <Grid item>
                  <IconButton
                    tooltip={t('preview.reload.tooltip')}
                    onClick={handleReloadScreenshots}
                  >
                    <ReloadIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    tooltip={t('preview.pdf.tooltip')}
                    onClick={handleGeneratePDF}
                  >
                    <ExportPDFIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <ScrollableList
                height={600}
                items={notes}
                renderItem={({ content, timestamp, image }) => (
                  <NoteItem
                    content={content}
                    timestamp={timestamp}
                    image={image}
                  />
                )}
              />
            </Grid>
          )}
        </StyledPaper>
      </Fade>
    </StyledModal>
  );
};

export default Preview;
