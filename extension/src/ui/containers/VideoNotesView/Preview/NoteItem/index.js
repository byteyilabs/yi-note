import React from 'react'
import PropTypes from 'prop-types'
import { useStoreActions } from 'easy-peasy'
import styled from 'styled-components'
import { Grid, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import TextButton from '../../../../components/TextButton'
import { usePlayer } from '../../../../hooks'
import { secondsToTime } from '../../../../../common/utils'

const StyledNote = styled.div`
  white-space: pre;
  word-wrap: break-word;
  word-break: break-all;

  @media (min-width: 960px) {
    width: 250px;
  }
`

const NoteItem = ({ content, timestamp, image }) => {
  const playerRef = usePlayer()
  const { setOpen } = useStoreActions(actions => actions.videoNotes.preview)
  const theme = useTheme()
  const direction = useMediaQuery(
    `(min-width:${theme.breakpoints.values.md}px)`
  )
    ? 'row'
    : 'column'

  const handlePlayNote = () => {
    const player = playerRef.current
    player.seek(timestamp)
    player.play()
    setOpen(false)
  }

  return (
    <Grid container direction={direction} spacing={2}>
      <Grid item>
        <Grid container>{image && <img src={image} alt="Screenshot" />}</Grid>
      </Grid>
      <Grid item>
        <TextButton onClick={handlePlayNote}>
          {secondsToTime(timestamp)}
        </TextButton>
        <StyledNote>{content}</StyledNote>
      </Grid>
    </Grid>
  )
}

NoteItem.propTypes = {
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  image: PropTypes.string
}

export default NoteItem
