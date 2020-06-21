import React, { useEffect, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { Grid, Backdrop, Fade } from '@material-ui/core';
import ExportPDFIcon from '@material-ui/icons/GetApp';
import ReloadIcon from '@material-ui/icons/Autorenew';
import { StyledModal, StyledPaper } from './styled';
import NoteItem from './NoteItem';
import Spinner from '../../../components/Spinner';
import ScrollableList from '../../../components/ScrollableList';
import IconButton from '../../../../common/components/IconButton';
import { usePlayer, useLoadScreenshots } from '../../../hooks';
import { exportFile } from '../../../../common/services/file';
import PDFGenerator from '../../../../common/services/pdf';
import { APP_ID } from '../../../../constants';

const Preview = () => {
  const { t } = useTranslation('notesView');
  const {
    app: { url },
    page: {
      data: { id: pageId, notes, meta: { title } = {} }
    },
    videoNotes: {
      preview: { open }
    }
  } = useStoreState(state => state);
  const {
    preview: { setOpen },
    setPage
  } = useStoreActions(actions => actions.videoNotes);
  const playerRef = usePlayer();
  const { loading, loadScreenshots } = useLoadScreenshots();
  const containerRef = useRef(null);
  const previewContentRef = useRef(null);
  const triedLoadScreenshots = useRef(false);

  useEffect(() => {
    containerRef.current = document.getElementById(APP_ID);
  }, []);

  useEffect(() => {
    const shouldLoadImages = notes.reduce((acc, note) => {
      return !note.image || acc;
    }, false);
    if (open && shouldLoadImages && !triedLoadScreenshots.current) {
      triedLoadScreenshots.current = true;
      loadScreenshots(notes);
    }
  }, [loadScreenshots, notes, open, playerRef, setPage]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleGeneratePDF = async () => {
    const generator = new PDFGenerator();
    const blob = await generator.getBlobOutput({ url, title, notes });
    await exportFile(blob, `${APP_ID}_${pageId}.pdf`);
  };

  const handleReloadScreenshots = async () => {
    await loadScreenshots(notes, true);
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
            <Spinner />
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
