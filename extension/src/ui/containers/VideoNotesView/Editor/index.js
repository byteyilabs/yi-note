import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import GeneralEditor from '../../../components/Editor'
import TextButton from '../../../components/TextButton'
import { usePlayer } from '../../../hooks'
import { secondsToTime } from '../../../utils'
import { TYPE_VIDEO_NOTE } from '../../../../constants'

const StyledStatus = styled.span`
  font-weight: bold;
`

const Editor = () => {
  const { t } = useTranslation('editor')
  const {
    editor: { active, note }
  } = useStoreState(state => state.videoNotes)
  const {
    editor: { setNote, reset },
    edit,
    saveNote
  } = useStoreActions(actions => actions.videoNotes)
  const playerRef = usePlayer()

  const handleFocus = async () => {
    if (active) {
      return
    }

    const timestamp = await playerRef.current.getCurrentTime()
    edit(timestamp)
  }

  const handleSave = () => saveNote({ ...note, type: TYPE_VIDEO_NOTE })

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
          placeholder={t('placeholder')}
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
                  <StyledStatus>{t('statusExisting')}</StyledStatus>
                ) : (
                  <StyledStatus>{t('statusNew')}</StyledStatus>
                )}
              </Grid>
              <Grid item>{secondsToTime(note.timestamp)}</Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="flex-end" spacing={1}>
              <Grid item>
                <TextButton onClick={reset}>{t('cancel')}</TextButton>
              </Grid>
              <Grid item>
                <TextButton onClick={handleSave}>{t('save')}</TextButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default Editor
