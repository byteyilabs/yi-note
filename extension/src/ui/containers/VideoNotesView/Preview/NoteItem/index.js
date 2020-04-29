import React from 'react'
import { useStoreActions } from 'easy-peasy'
import Grid from '@material-ui/core/Grid'
import TextButton from '../../../../components/TextButton'
import { usePlayer } from '../../../../hooks'
import { secondsToTime } from '../../../../utils'

export default ({ content, timestamp, dataUri }) => {
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
          {dataUri && <img src={dataUri} alt="Failed to take screenshot" /> }
        </Grid>
      </Grid>
      <Grid item md={4} sm={12}>
        <TextButton onClick={handlePlayNote}>{secondsToTime(timestamp)}</TextButton>
        <div>{content}</div>
      </Grid>
    </Grid>
  )
}
