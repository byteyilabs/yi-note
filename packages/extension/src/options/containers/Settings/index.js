import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreActions } from 'easy-peasy';
import { Grid } from '@material-ui/core';
import Video from './Video';
import ExportAndImport from './ExportAndImport';

const Settings = () => {
  const { t } = useTranslation('options');
  const {
    app: { setTitle }
  } = useStoreActions(actions => actions);

  useEffect(() => {
    setTitle(t('settings.title'));
  }, [setTitle, t]);

  return (
    <Grid container spacing={6}>
      <Grid item container>
        <Video />
      </Grid>
      <Grid item container>
        <ExportAndImport />
      </Grid>
    </Grid>
  );
};

export default Settings;
