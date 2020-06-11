import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, List, ListItem, Chip } from '@material-ui/core';
import VideoNoteItem from './VideoNoteItem';
import TagDialog from './TagDialog';
import { TYPE_VIDEO_NOTE } from '../../../constants';

const Page = () => {
  const { t } = useTranslation('options');
  const { id } = useParams();
  const {
    page: { title, url, notes, tags }
  } = useStoreState(state => state);
  const {
    app: { setTitle: setAppTitle },
    page: { fetchPage }
  } = useStoreActions(actions => actions);

  useEffect(() => {
    setAppTitle(t('page.title'));
    fetchPage(id);
  }, [fetchPage, id, setAppTitle, t]);

  return (
    <>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="subtitle1">{title}</Typography>
        </Grid>
        <Grid item container spacing={1}>
          {tags.map(tag => (
            <Grid item key={tag}>
              <Chip label={tag} color="default" />
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <List>
            {notes.map(({ id, content, timestamp, image, type }) => (
              <ListItem key={id}>
                {type === TYPE_VIDEO_NOTE ? (
                  <VideoNoteItem
                    id={id}
                    content={content}
                    timestamp={timestamp}
                    image={image}
                    url={url}
                  />
                ) : (
                  <div>{content}</div>
                )}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <TagDialog />
    </>
  );
};

export default Page;
