import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, List, ListItem, Chip } from '@material-ui/core';
import BookmarkItem from './BookmarkItem';
import NoBookmark from './NoBookmark';

const StyledContainer = styled(Grid)`
  min-height: 400px;
`;

const Bookmarks = () => {
  const { search } = useLocation();
  const {
    bookmarks: {
      bookmarks,
      tags,
      toolbar: { filtering }
    }
  } = useStoreState(state => state);
  const { fetchBookmarks, fetchTags, selectTag } = useStoreActions(
    actions => actions.bookmarks
  );

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

  return (
    <StyledContainer>
      {bookmarks.length === 0 && !filtering ? (
        <NoBookmark />
      ) : (
        <Grid container>
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
