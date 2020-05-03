import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NoteItem from './NoteItem';
import BookmarkItem from './BookmarkItem';
import ScrollableList from '../../components/ScrollableList';
import { TYPE_BOOKMARKS, TYPE_NOTES } from '../../../constants';

const StyledItemWrapper = styled.div`
  background: #f6f6f6;
  padding: 3px;
`;

const useStyles = makeStyles({
  tabRoot: { fontSize: '0.9em' }
});

const SearchView = () => {
  const { t } = useTranslation('searchView');
  const classes = useStyles();
  const { query, type, results, bookmarks, notes } = useStoreState(
    state => state.search
  );
  const {
    setQuery,
    setType,
    setResults,
    fetchBookmarks,
    fetchNotes
  } = useStoreActions(actions => actions.search);

  useEffect(() => {
    if (type === TYPE_BOOKMARKS) {
      if (bookmarks.length) {
        setResults(bookmarks);
      } else {
        fetchBookmarks();
      }
    } else if (type === TYPE_NOTES) {
      if (notes.length) {
        setResults(notes);
      } else {
        fetchNotes();
      }
    }
  }, [type, fetchBookmarks, fetchNotes, setResults, bookmarks, notes]);

  const handleTypeChange = (event, newValue) => {
    setType(newValue);
    setQuery('');
  };

  const ItemComponent = {
    [TYPE_BOOKMARKS]: BookmarkItem,
    [TYPE_NOTES]: NoteItem
  }[type];

  return (
    <>
      <Tabs value={type} onChange={handleTypeChange} variant="fullWidth">
        <Tab
          classes={{ root: classes.tabRoot }}
          label={t('tab.bookmarks')}
          value={TYPE_BOOKMARKS}
        />
        <Tab
          classes={{ root: classes.tabRoot }}
          label={t('tab.notes')}
          value={TYPE_NOTES}
        />
      </Tabs>
      <ScrollableList
        items={results}
        renderItem={item => (
          <StyledItemWrapper>
            <ItemComponent item={item} query={query} />
          </StyledItemWrapper>
        )}
      />
    </>
  );
};

export default SearchView;
