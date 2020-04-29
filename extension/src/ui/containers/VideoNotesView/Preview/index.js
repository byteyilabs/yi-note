import React, { useState, useEffect, useRef } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress';
import NoteItem from './NoteItem'
import ScrollableList from '../../../components/ScrollableList'
import { usePlayer } from '../../../hooks'
import { delay, takeScreenshot } from '../../../utils'
import { APP_ID } from '../../../../constants'

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledPaper = styled.div`
  background-color: ${props => props.theme.palette.background.paper};
  border: 1px solid #000;
  box-shadow: ${props => props.theme.shadows[2]};
  padding: ${props => props.theme.spacing(2, 4, 3)};
  min-width: 200px;
  max-width: ${props => props.theme.breakpoints.width('md') - 100}px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default () => {
  const { 
    page: { notes },
    preview: { open }
  } = useStoreState(state => state.videoNotes)
  const { 
    preview: { setOpen },
    setPage
  } = useStoreActions(actions => actions.videoNotes)
  const playerRef = usePlayer()
  const [loading, setLoading] = useState(false)
  const containerRef = useRef(null)

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
        )}
        </StyledPaper>
      </Fade>
    </StyledModal>
  )
}
