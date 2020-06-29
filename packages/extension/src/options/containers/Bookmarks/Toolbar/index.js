import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import {
  GetApp as ExportIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  FilterList as FilterIcon
} from '@material-ui/icons';
import {
  storage as StorageService,
  file as FileService
} from '@yi-note/common/services';

const Toolbar = () => {
  const { t } = useTranslation('options');
  const {
    toolbar: { exporting, filtering },
    bookmarks
  } = useStoreState(state => state.bookmarks);
  const {
    toolbar: { setExporting, setFiltering },
    unSelectTags
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
    return StorageService.getStorage()
      .getPagesForExport(ids)
      .then(pages => {
        FileService.exportJsonFile(pages, 'yi-note.json');
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
