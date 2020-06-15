import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useStoreActions } from 'easy-peasy';
import { Grid, Link, Tabs, Tab, IconButton, Tooltip } from '@material-ui/core';
import DrawIcon from '@material-ui/icons/GestureOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import {
  StyledImg,
  StyledNoteContainer,
  StyledEditorContainer,
  StyledTextArea
} from './styled';
import MarkdownViewer from '../../../../common/components/MarkdownViewer';
import { MarkerArea } from 'markerjs';
import { secondsToTime, buildAutoSeekUrl } from '../../../../common/utils';

const EDIT_MODE_WRITE = 'WRITE';
const EDIT_MODE_PREVIEW = 'PREVIEW';
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
  const [editMode, setEditMode] = useState(null);
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
    setEditMode(EDIT_MODE_WRITE);
    setCurrentAction(ACTION_EDIT);
  };

  const handleEditModeChange = (e, type) => setEditMode(type);

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

  const handleEditorChange = e => {
    const { value } = e.target;
    setContentInEdit(value);
  };

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
      setEditMode(null);
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
      setEditMode(null);
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
    <Grid container>
      <Grid item lg={8} md={12}>
        <StyledImg ref={imgRef} src={image} alt="Screenshot" />
      </Grid>
      <StyledNoteContainer
        item
        lg={4}
        md={12}
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
        {editMode ? (
          <StyledEditorContainer
            item
            container
            spacing={1}
            direction="column"
            justify="flex-start"
          >
            <Grid item container>
              <Tabs value={editMode} onChange={handleEditModeChange}>
                <Tab label="Write" value={EDIT_MODE_WRITE} />
                <Tab label="Preview" value={EDIT_MODE_PREVIEW} />
              </Tabs>
            </Grid>
            <StyledTextArea item container>
              {editMode === EDIT_MODE_WRITE ? (
                <textarea value={contentInEdit} onChange={handleEditorChange} />
              ) : (
                <MarkdownViewer content={contentInEdit} />
              )}
            </StyledTextArea>
          </StyledEditorContainer>
        ) : (
          <Grid item>
            <MarkdownViewer content={content} />
          </Grid>
        )}
      </StyledNoteContainer>
    </Grid>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired
};

export default NoteItem;
