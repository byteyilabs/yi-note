import React, { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined'
import NoteItem from './NoteItem'
import Editor from './Editor'
import IconButton from '../../components/IconButton'
import ScrollableList from '../../components/ScrollableList'
import { generatePageId } from '../../utils'

export const StyledTitle = styled.div`
  font-weight: 500;
`

const NotesView = () => {
  const { t } = useTranslation('notesView')
  const {
    videoNotes: {
      page: { id, notes }
    },
    app: { url }
  } = useStoreState(state => state)
  const {
    videoNotes: { fetchPage, bookmarkPage, removePage },
    alerts: { showAlerts }
  } = useStoreActions(actions => actions)

  const handleRemovePage = () => {
    showAlerts({
      content: t('bookmark.remove.alertContent'),
      onConfirm: removePage.bind(null, id)
    })
  }

  useEffect(() => {
    if (!id) {
      const pageId = generatePageId(url)
      fetchPage(pageId)
    }
  }, [id, fetchPage])

  return (
    <>
      <Editor />
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <StyledTitle>{t('title')}</StyledTitle>
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center">
            {!id ? (
              <IconButton
                tooltip={t('bookmark.add.tooltip')}
                onClick={bookmarkPage}
              >
                <BookmarkIcon />
              </IconButton>
            ) : (
              <IconButton
                color="red"
                tooltip={t('bookmark.remove.tooltip')}
                onClick={handleRemovePage}
              >
                <BookmarkIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
      <ScrollableList
        items={notes}
        renderItem={({ id, content, timestamp }) => (
          <NoteItem id={id} content={content} timestamp={timestamp} />
        )}
      />
    </>
  )
}

export default NotesView
