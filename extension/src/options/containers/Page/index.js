import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Chip } from '@material-ui/core';
import VideoNoteItem from './VideoNoteItem';
import { TagDialog } from '@yi-note/common/components';
import { TYPE_VIDEO_NOTE } from '@yi-note/common/constants';

const Page = () => {
  const { t } = useTranslation('options');
  const { id } = useParams();
  const {
    data: {
      meta: { title, url },
      notes,
      tags
    }
  } = useStoreState(state => state.page);
  const {
    app: { setTitle: setAppTitle },
    page: { fetchPage, addTag, removeTag }
  } = useStoreActions(actions => actions);

  useEffect(() => {
    setAppTitle(t('page.title'));
    fetchPage(id);
  }, [fetchPage, id, setAppTitle, t]);

  return (
    <>
      <Grid container direction="column" spacing={3}>
        <Grid item container>
          <Typography variant="subtitle1">{title}</Typography>
        </Grid>
        <Grid item container spacing={1}>
          {tags.map(tag => (
            <Grid item key={tag}>
              <Chip label={tag} color="default" />
            </Grid>
          ))}
        </Grid>
        <Grid item container spacing={6}>
          {notes.map(note => (
            <Grid key={note.id} item container>
              {note.type === TYPE_VIDEO_NOTE ? (
                <VideoNoteItem note={note} url={url} />
              ) : (
                <div>{note.content}</div>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
      <TagDialog tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
    </>
  );
};

export default Page;
