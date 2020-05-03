import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import ExportIcon from '@material-ui/icons/GetApp';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { StorageFactory } from '../../../../common/services/storage';
import { exportJsonFile } from '../../../../common/services/file';

const Toolbar = () => {
  const { t } = useTranslation('options');
  const {
    toolbar: { progress },
    bookmarks
  } = useStoreState(state => state.bookmarks);
  const { setProgress } = useStoreActions(actions => actions.bookmarks.toolbar);

  const startExport = () => {
    setProgress(true);
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
        exportJsonFile(pages);
      })
      .then(() => setProgress(false));
  };

  const cancelExport = () => {
    setProgress(false);
  };

  return (
    <Grid>
      {progress ? (
        <>
          <IconButton color="inherit" onClick={executeExport}>
            <CheckIcon />
          </IconButton>
          <IconButton color="inherit" onClick={cancelExport}>
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <Tooltip title={t('bookmarks.export.tooltip')}>
          <IconButton color="inherit" onClick={startExport}>
            <ExportIcon />
          </IconButton>
        </Tooltip>
      )}
    </Grid>
  );
};

export default Toolbar;
