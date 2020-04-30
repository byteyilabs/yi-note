import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useTranslation } from 'react-i18next'
import { Grid, Typography, List, ListItem } from '@material-ui/core'
import NoteItem from './NoteItem'

const Page = () => {
  const { t } = useTranslation('options')
  const { id } = useParams()
  const { 
    page: { title, notes }
  } = useStoreState(state => state)
  const { 
    app: { setTitle: setAppTitle }, 
    page: { fetchPage }
  } = useStoreActions(actions => actions)

  useEffect(() => {
    setAppTitle(t('page.title'))
    fetchPage(id)
  }, [])

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h5" component="h1">{title}</Typography>
      </Grid>
      <Grid item>
        <List>
          {notes.map(({ id, content, timestamp, image }) =>         
            <ListItem key={id}>
              <NoteItem 
                id={id} 
                content={content} 
                timestamp={timestamp}
                image={image}
              />
            </ListItem>
          )}
        </List>
      </Grid>
    </Grid>
  )
}

export default Page
