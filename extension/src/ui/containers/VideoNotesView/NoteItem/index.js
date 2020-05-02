import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStoreActions } from 'easy-peasy'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import PlayIcon from '@material-ui/icons/PlayCircleOutlineOutlined'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  StyledMainRow,
  StyledSummary,
  StyledTimestamp,
  StyledExpandMoreIcon,
  StyledExpandedSection,
  StyledNote
} from './styled'
import IconButton from '../../../components/IconButton'
import { usePlayer } from '../../../hooks'
import { secondsToTime } from '../../../../common/utils'

const NoteItem = ({ id, content, timestamp }) => {
  const { t } = useTranslation(['notesView', 'note'])
  const {
    videoNotes: { edit, removeNote },
    alerts: { show: showAlerts }
  } = useStoreActions(actions => actions)
  const [expanded, setExpanded] = useState(false)
  const playerRef = usePlayer()

  const handleExpand = () => setExpanded(!expanded)

  const handlePlay = () => {
    playerRef.current.seek(timestamp)
  }

  const handleEdit = () => edit({ timestamp })

  const handleDelete = () =>
    showAlerts({
      content: t('note:remove.alert'),
      onConfirm: removeNote.bind(null, id)
    })

  const formattedTime = secondsToTime(timestamp)
  return (
    <Grid container>
      <StyledMainRow
        item
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <IconButton
              color="red"
              tooltip={t('note.play.tooltip', { formattedTime })}
              onClick={handlePlay}
            >
              <PlayIcon />
            </IconButton>
            <StyledSummary>{content}</StyledSummary>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center">
            {!expanded && <StyledTimestamp>{formattedTime}</StyledTimestamp>}
            <IconButton
              tooltip={
                expanded ? t('note.collapse.tooltip') : t('note.expand.tooltip')
              }
              onClick={handleExpand}
            >
              <StyledExpandMoreIcon
                expanded={expanded ? expanded : undefined}
              />
            </IconButton>
          </Grid>
        </Grid>
      </StyledMainRow>
      <StyledExpandedSection
        expanded={expanded ? expanded : undefined}
        item
        direction="column"
        container
      >
        <Grid container spacing={1}>
          <Grid item container justify="space-between" alignItems="center">
            <StyledTimestamp>{formattedTime}</StyledTimestamp>
            <Grid item>
              <Grid container direction="row">
                <IconButton
                  size="small"
                  tooltip={t('note:edit.tooltip')}
                  onClick={handleEdit}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  tooltip={t('note:remove.tooltip')}
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <StyledNote>{content}</StyledNote>
          </Grid>
        </Grid>
      </StyledExpandedSection>
    </Grid>
  )
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired
}

export default NoteItem
