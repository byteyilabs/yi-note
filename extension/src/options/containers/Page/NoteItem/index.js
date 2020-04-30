import React from 'react'
import { Grid } from '@material-ui/core'

const NoteItem = ({ id, content, timestamp, image }) => {
  return (
    <Grid container>
      <Grid item sm={6} xs={12}>
        <img src={image} alt="" />
      </Grid>
      <Grid item sm={6} xs={12}>
        <div>{timestamp}</div>
        <div>{content}</div>
      </Grid>
    </Grid>
  )
}

export default NoteItem
