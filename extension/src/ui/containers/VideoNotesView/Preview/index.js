import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import * as jsPDF from 'jspdf';
import { Grid, Backdrop, Fade, CircularProgress } from '@material-ui/core';
import ExportPDFIcon from '@material-ui/icons/GetApp';
import ReloadIcon from '@material-ui/icons/Autorenew';
import { StyledModal, StyledPaper } from './styled';
import NoteItem from './NoteItem';
import ScrollableList from '../../../components/ScrollableList';
import IconButton from '../../../components/IconButton';
import { usePlayer } from '../../../hooks';
import { takeScreenshot } from '../../../utils';
import { secondsToTime } from '../../../../common/utils';
import { delay } from '../../../../common/utils';
import { APP_ID } from '../../../../constants';
import { addfont } from './fonts/msyh-normal';

addfont(jsPDF.API);

const Preview = () => {
  const { t } = useTranslation('notesView');
  const {
    page: { id: pageId, notes, meta: { title } = {} },
    preview: { open }
  } = useStoreState(state => state.videoNotes);
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

  const handleGeneratePDF = () => {
    var doc = new jsPDF();

    doc.setFont('msyh');
    console.log(doc.getFontList())
    console.log(doc.getFontList())

    var y = 20;
    doc.setFontSize(18);
    doc.setFontType('bold');
    doc.text(20, y, doc.splitTextToSize(title, 180));
    y += 10;
    doc.setFontType('normal');

    doc.setFontSize(14);
    doc.setFontType('bold');
    doc.text(20, y, '-- Notes --');
    y += 10;
    doc.setFontType('normal');
    doc.setFontSize(12);

    for (const note of notes) {
      const content = doc.splitTextToSize(note.content, 180);
      if (y + 66 + 6 + 6 * content.length > 300) {
        doc.addPage();
        y = 20;
      }
      doc.addImage(note.image, 'PNG', 20, y, 100, 60, null, 'NONE');
      y += 66;
      doc.setTextColor(255, 255, 255);
      doc.setTextColor(71, 99, 255);
      doc.text(20, y, secondsToTime(note.timestamp));
      doc.setTextColor(0, 0, 0);
      y += 6;
      doc.text(20, y, content);
      y += 6 * content.length;
    }
    doc.save(`${APP_ID}_${pageId}.pdf`);
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
