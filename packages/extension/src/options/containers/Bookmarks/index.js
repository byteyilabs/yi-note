import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  Grid,
  List,
  ListItem,
  Chip,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import BookmarkItem from './BookmarkItem';
import NoBookmark from './NoBookmark';

const StyledContainer = styled(Grid)`
  min-height: 400px;
`;

const Bookmarks = () => {
  const { t } = useTranslation('options');
  const { search } = useLocation();
  const {
    bookmarks: {
      bookmarks,
      tags,
      toolbar: { filtering, exporting, exportFormat }
    }
  } = useStoreState(state => state);
  const {
    fetchBookmarks,
    fetchTags,
    selectTag,
    toolbar: { setExportFormat }
  } = useStoreActions(actions => actions.bookmarks);

  useEffect(() => {
    let tagsFromUrl = [];
    const tagsStr = new URLSearchParams(search).get('tags');
    if (tagsStr) {
      tagsFromUrl = tagsStr.split(',');
    }
    fetchBookmarks();
    fetchTags(tagsFromUrl);
  }, [fetchBookmarks, fetchTags, search]);

  const handleSelectTag = tag => {
    selectTag(tag);
  };

  const handleExportFormatChange = e => setExportFormat(e.target.value);

  return (
    <StyledContainer>
      {bookmarks.length === 0 && !filtering ? (
        <NoBookmark />
      ) : (
        <Grid container>
          {exporting && (
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <FormLabel>{t('bookmarks.export.format.label')}</FormLabel>
              </Grid>
              <Grid item>
                <RadioGroup
                  row
                  value={exportFormat}
                  onChange={handleExportFormatChange}
                >
                  <FormControlLabel
                    value="json"
                    control={<Radio size="small" />}
                    label="JSON"
                  />
                  <FormControlLabel
                    value="markdown"
                    control={<Radio size="small" />}
                    label="Markdown (no image)"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          )}
          {filtering && (
            <Grid item container spacing={1}>
              {tags.map(({ tag, selected }) => (
                <Grid item key={tag}>
                  <Chip
                    label={tag}
                    color={selected ? 'primary' : 'default'}
                    clickable
                    onClick={handleSelectTag.bind(null, tag)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          <Grid item>
            <List>
              {bookmarks.map(
                ({ id, title, description, url, image, selected }) => {
                  return (
                    <ListItem key={id}>
                      <BookmarkItem
                        id={id}
                        title={title}
                        description={description}
                        url={url}
                        image={image}
                        selected={selected}
                      />
                    </ListItem>
                  );
                }
              )}
            </List>
          </Grid>
        </Grid>
      )}
    </StyledContainer>
  );
};

export default Bookmarks;
