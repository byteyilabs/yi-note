import React, { useState, useEffect, useRef } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useTranslation } from 'react-i18next'
import jsPDF from 'jspdf'
import { Grid, Backdrop, Fade, CircularProgress } from '@material-ui/core'
import { StyledModal, StyledPaper } from './styled'
import NoteItem from './NoteItem'
import ScrollableList from '../../../components/ScrollableList'
import TextButton from '../../../components/TextButton'
import { usePlayer } from '../../../hooks'
import { delay, takeScreenshot, secondsToTime } from '../../../utils'
import { APP_ID } from '../../../../constants'

export default () => {
  const { t } = useTranslation('notesView')
  const { 
    page: { id: pageId, notes, meta: { title } = {} },
    preview: { open }
  } = useStoreState(state => state.videoNotes)
  const { 
    preview: { setOpen },
    setPage
  } = useStoreActions(actions => actions.videoNotes)
  const playerRef = usePlayer()
  const [loading, setLoading] = useState(false)
  const containerRef = useRef(null)
  const previewContentRef = useRef(null)

  useEffect(() => {
    containerRef.current = document.getElementById(APP_ID)
  }, [])

  useEffect(() => {
    const maybeLoadImages = async () => {
      const shouldLoadImages = notes.reduce((acc, note) => {
        return !note.dataUri || acc
      }, false)
      if (shouldLoadImages) {
        setLoading(true)
        const player = playerRef.current
        const currentTime = await player.getCurrentTime()
        const videoEl = player.getVideoElement()
        // Take screenshots
        for (const note of notes) {
          if (note.dataUri) {
            continue
          }
          player.seek(note.timestamp)
          await delay(500)
          note.dataUri = takeScreenshot(videoEl, 426, 240)
        }
        // Resume back to start time and pause video
        player.seek(currentTime)
        playerRef.current.pause()
        setLoading(false)
        setPage({notes: [...notes]})
      }
    }

    if (open) {
      maybeLoadImages()
    }
  }, [open])

  const handleClose = () => {
    setOpen(false)
  }

  const handleGeneratePDF = () => {
    var doc = new jsPDF();
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
      doc.addImage(note.dataUri, 'PNG', 20, y, 100, 60, null, 'NONE');
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
  }

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
            <Grid ref={previewContentRef} container direction="column" spacing={6}> 
              <Grid item container justify="flex-end">
                <TextButton onClick={handleGeneratePDF}>{t('preview.pdf.button')}</TextButton>
              </Grid>
              <ScrollableList 
                items={notes}
                renderItem={({ content, timestamp, dataUri }) => (
                  <NoteItem 
                    content={content} 
                    timestamp={timestamp}
                    dataUri={dataUri}
                  />
                )}
              />
            </Grid>    
          )}
        </StyledPaper>
      </Fade>
    </StyledModal>
  )
}
