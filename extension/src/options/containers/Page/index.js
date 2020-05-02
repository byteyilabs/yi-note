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
    page: { title, url, notes }
  } = useStoreState(state => state)
  const {
    app: { setTitle: setAppTitle },
    page: { fetchPage }
  } = useStoreActions(actions => actions)

  useEffect(() => {
    setAppTitle(t('page.title'))
    fetchPage(id)
  }, [fetchPage, id, setAppTitle, t])

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="subtitle1">{title}</Typography>
      </Grid>
      <Grid item>
        <List>
          {notes.map(({ id, content, timestamp, image }) => (
            <ListItem key={id}>
              <NoteItem
                id={id}
                content={content}
                timestamp={timestamp}
                image={image}
                url={url}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  )
}

export default Page
