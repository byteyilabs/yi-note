import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import GeneralEditor from '../../../components/Editor'
import TextButton from '../../../components/TextButton'
import { usePlayer } from '../../../hooks'
import { secondsToTime, takeScreenshot } from '../../../utils'
import { TYPE_VIDEO_NOTE } from '../../../../constants'

const StyledStatus = styled.span`
  font-weight: bold;
`

const Editor = () => {
  const { t } = useTranslation('notesView')
  const {
    editor: { active, note }
  } = useStoreState(state => state.videoNotes)
  const {
    videoNotes: {
      editor: { setNote, reset },
      edit,
      saveNote,
      removeNote
    },
    alerts: {
      showAlerts
    }
  } = useStoreActions(actions => actions)
  const playerRef = usePlayer()

  const handleFocus = async () => {
    if (active) {
      return
    }

    const player = playerRef.current
    const timestamp = await playerRef.current.getCurrentTime()
    const videoEl = player.getVideoElement()
    const dataUri = takeScreenshot(videoEl)
    console.log(dataUri)
    edit({ timestamp, image: dataUri })
  }

  const handleSave = () => {
    const { id, content } = note
    if (content.trim()) {
      // Upsert note
      saveNote({ ...note, type: TYPE_VIDEO_NOTE })
    } else if (id) {
      // Delete note
      showAlerts({
        content: t('note.remove.alertContent'),
        onConfirm: removeNote.bind(null, note.id)
      })
    } else {
      reset()
    }
  }

  const handleChange = e => {
    const { value } = e.target
    setNote({ content: value })
  }

  return (
    <Grid container spacing={1}>
      <Grid item container>
        <GeneralEditor
          disabled={false} // TODO: use playingAds
          content={note.content}
          placeholder={t('editor.placeholder')}
          onChange={handleChange}
          onSave={handleSave}
          onFocus={handleFocus}
        />
      </Grid>
      {active && (
        <Grid item container alignItems="center">
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item>
                {note.id ? (
                  <StyledStatus>{t('editor.statusExisting')}</StyledStatus>
                ) : (
                  <StyledStatus>{t('editor.statusNew')}</StyledStatus>
                )}
              </Grid>
              <Grid item>{secondsToTime(note.timestamp)}</Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="flex-end" spacing={1}>
              <Grid item>
                <TextButton onClick={reset}>{t('editor.cancelButton')}</TextButton>
              </Grid>
              <Grid item>
                <TextButton onClick={handleSave}>{t('editor.saveButton')}</TextButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default Editor
