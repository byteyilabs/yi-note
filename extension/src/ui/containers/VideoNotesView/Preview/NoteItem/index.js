import React from 'react'
import { useStoreActions } from 'easy-peasy'
import Grid from '@material-ui/core/Grid'
import TextButton from '../../../../components/TextButton'
import { usePlayer } from '../../../../hooks'
import { secondsToTime } from '../../../../../common/utils'

export default ({ content, timestamp, image }) => {
  const playerRef = usePlayer()
  const { setOpen } = useStoreActions(actions => actions.videoNotes.preview)

  const handlePlayNote = () => {
    const player = playerRef.current
    player.seek(timestamp)
    player.play()
    setOpen(false)
  }

  return (
    <Grid container>
      <Grid item md={8} sm={12}>
        <Grid container>
          {image && <img src={image} alt="Screenshot" /> }
        </Grid>
      </Grid>
      <Grid item md={4} sm={12}>
        <TextButton onClick={handlePlayNote}>{secondsToTime(timestamp)}</TextButton>
        <div>{content}</div>
      </Grid>
    </Grid>
  )
}
