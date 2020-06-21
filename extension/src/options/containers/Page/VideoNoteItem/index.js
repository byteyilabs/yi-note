import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useStoreActions } from 'easy-peasy';
import { Grid, Link, IconButton, Tooltip } from '@material-ui/core';
import DrawIcon from '@material-ui/icons/GestureOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { StyledImg, StyledNoteContainer } from './styled';
import MarkdownViewer from '../../../../common/components/MarkdownViewer';
import MarkdownEditor from '../../../../common/components/MarkdownEditor';
import { MarkerArea } from 'markerjs';
import { secondsToTime, buildAutoSeekUrl } from '../../../../common/utils';

const ACTION_EDIT = 'EDIT';
const ACTION_ANNOTATE = 'ANNOTATE';

const NoteItem = ({ note, url }) => {
  const { id, content, timestamp, image } = note;
  const { t } = useTranslation('options');
  const {
    page: { saveNote, removeNote },
    alerts: { show: showAlerts }
  } = useStoreActions(actions => actions);
  const imgRef = useRef(null);
  const markerRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [contentInEdit, setContentInEdit] = useState(content);
  const [currentAction, setCurrentAction] = useState('');

  useEffect(() => {
    if (imgRef.current) {
      markerRef.current = new MarkerArea(imgRef.current);
    }
    return () => {
      try {
        markerRef.current.close();
      } catch (e) {
        logger.error(e);
      }
    };
  }, []);

  const handleStartEditing = () => {
    setEditing(true);
    setCurrentAction(ACTION_EDIT);
  };

  const handleStartAnnotation = () => {
    if (markerRef.current) {
      // Remove last three action buttons from markerJs toolbar
      if (markerRef.current.toolbars.length === 13) {
        Array(3)
          .fill(0)
          .forEach(() => markerRef.current.toolbars.pop());
      }
      // Show toolbars on top of image
      markerRef.current.show();
    }
    setCurrentAction(ACTION_ANNOTATE);
  };

  const handleEditorChange = value => setContentInEdit(value);

  const handleDelete = e => {
    e.stopPropagation();
    showAlerts({
      content: t('note:remove.alert'),
      onConfirm: removeNote.bind(null, id)
    });
  };

  const handleActionFinished = () => {
    if (currentAction === ACTION_EDIT) {
      const newNote = { ...note, content: contentInEdit };
      saveNote(newNote);
      setEditing(false);
    } else if (currentAction === ACTION_ANNOTATE) {
      try {
        markerRef.current.render(dataUri => {
          const newNote = { ...note, image: dataUri };
          saveNote(newNote);
          markerRef.current.close();
        });
      } catch (e) {
        logger.info(e);
      }
    }
    setCurrentAction(null);
  };

  const handleActionCanceled = () => {
    if (currentAction === ACTION_EDIT) {
      setEditing(false);
    } else if (currentAction === ACTION_ANNOTATE) {
      try {
        markerRef.current.close();
      } catch (e) {
        logger.info(e);
      }
    }
    setCurrentAction(null);
  };

  return (
    <Grid container spacing={1}>
      <Grid item lg={8} md={12} container justify="center">
        <StyledImg ref={imgRef} src={image} alt="Screenshot" />
      </Grid>
      <Grid item lg={4} md={12} container justify="center">
        <StyledNoteContainer
          item
          container
          direction="column"
          justify="flex-start"
          spacing={1}
        >
          <Grid
            item
            container
            justify="space-between"
            direction="row"
            spacing={2}
          >
            <Grid item container xs={4} alignItems="center">
              <Link href={buildAutoSeekUrl(url, timestamp)} target="_blank">
                {secondsToTime(timestamp)}
              </Link>
            </Grid>
            <Grid item xs={8}>
              <Grid container direction="row" spacing={1} justify="flex-end">
                {currentAction ? (
                  <>
                    <Grid item>
                      <Tooltip title={t('page.save.tooltip')}>
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={handleActionFinished}
                        >
                          <DoneIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title={t('page.cancel.tooltip')}>
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={handleActionCanceled}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item>
                      <Tooltip title={t('page.annotation.tooltip')}>
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={handleStartAnnotation}
                        >
                          <DrawIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title={t('page.edit.note.tooltip')}>
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={handleStartEditing}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title={t('page.delete.note.tooltip')}>
                        <IconButton
                          size="small"
                          color="inherit"
                          onClick={handleDelete}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
          {editing ? (
            <Grid item container>
              <MarkdownEditor
                content={contentInEdit}
                onChange={handleEditorChange}
              />
            </Grid>
          ) : (
            <Grid item container>
              <MarkdownViewer content={content} />
            </Grid>
          )}
        </StyledNoteContainer>
      </Grid>
    </Grid>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired
};

export default NoteItem;
