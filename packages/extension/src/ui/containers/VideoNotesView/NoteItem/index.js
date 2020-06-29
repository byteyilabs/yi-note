import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import {
  PlayCircleOutlineOutlined as PlayIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';
import { IconButton, MarkdownViewer } from '@yi-note/common/components';
import { secondsToTime } from '@yi-note/common/utils';
import Markdown from '@yi-note/common/services/markdown';
import {
  StyledMainRow,
  StyledSummary,
  StyledTimestamp,
  StyledExpandMoreIcon,
  StyledExpandedSection,
  StyledNote
} from './styled';
import { usePlayer } from '../../../hooks';

const NoteItem = ({ note }) => {
  const { id, content, timestamp } = note;
  const { t } = useTranslation(['notesView', 'note']);
  const {
    videoNotes: { edit },
    alerts: { show: showAlerts },
    page: { removeNote }
  } = useStoreActions(actions => actions);
  const [expanded, setExpanded] = useState(false);
  const playerRef = usePlayer();

  const handleExpand = () => setExpanded(!expanded);

  const handlePlay = () => {
    playerRef.current.seek(timestamp);
  };

  const handleEdit = () => edit(note);

  const handleDelete = () =>
    showAlerts({
      content: t('note:remove.alert'),
      onConfirm: removeNote.bind(null, id)
    });

  const formattedTime = secondsToTime(timestamp);
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
            <StyledSummary>{Markdown.toText(content)}</StyledSummary>
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
            <StyledNote>
              <MarkdownViewer content={content} />
            </StyledNote>
          </Grid>
        </Grid>
      </StyledExpandedSection>
    </Grid>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteItem;
