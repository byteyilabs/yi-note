import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import styled from 'styled-components';
import { Grid, List, ListItem, Chip } from '@material-ui/core';
import BookmarkItem from './BookmarkItem';
import NoBookmark from './NoBookmark';

const StyledContainer = styled(Grid)`
  min-height: 400px;
`;

const Bookmarks = () => {
  const {
    bookmarks,
    tags,
    toolbar: { filtering }
  } = useStoreState(state => state.bookmarks);
  const {
    fetchBookmarks,
    fetchTags,
    selectTag,
    filterBookmarksByTags
  } = useStoreActions(actions => actions.bookmarks);

  useEffect(() => {
    fetchBookmarks();
    fetchTags();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectTag = tag => {
    selectTag(tag);
    filterBookmarksByTags();
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
