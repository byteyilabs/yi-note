import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import ExportIcon from '@material-ui/icons/GetApp';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import FilterIcon from '@material-ui/icons/FilterList';
import { StorageFactory } from '../../../../common/services/storage';
import { exportJsonFile } from '../../../../common/services/file';

const Toolbar = () => {
  const { t } = useTranslation('options');
  const {
    toolbar: { exporting, filtering },
    bookmarks
  } = useStoreState(state => state.bookmarks);
  const {
    toolbar: { setExporting, setFiltering },
    unSelectTags,
    fetchBookmarks
  } = useStoreActions(actions => actions.bookmarks);

  const startExport = () => {
    setExporting(true);
  };

  const executeExport = () => {
    const ids = bookmarks.reduce((acc, bookmark) => {
      if (bookmark.selected) {
        acc.push(bookmark.id);
      }
      return acc;
    }, []);
    return StorageFactory.getStorage()
      .getPagesForExport(ids)
      .then(pages => {
        exportJsonFile(pages, 'yi-note.json');
      })
      .then(() => setExporting(false));
  };

  const cancelExport = () => {
    setExporting(false);
  };

  const toggleTags = () => {
    if (filtering) {
      // Clear selected tags if cancel filter
      unSelectTags();
      fetchBookmarks();
    }
    setFiltering(!filtering);
  };

  return (
    <Grid>
      {exporting ? (
        <>
          <IconButton color="inherit" onClick={executeExport}>
            <CheckIcon />
          </IconButton>
          <IconButton color="inherit" onClick={cancelExport}>
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Tooltip title={t('bookmarks.tag.tooltip')}>
            <IconButton color="inherit" onClick={toggleTags}>
              <FilterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('bookmarks.export.tooltip')}>
            <IconButton color="inherit" onClick={startExport}>
              <ExportIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Grid>
  );
};

export default Toolbar;
