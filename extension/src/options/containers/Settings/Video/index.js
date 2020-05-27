import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Divider, Select, MenuItem } from '@material-ui/core';
import { KEY_VIDEO_SEEK_SECONDS } from '../../../../constants';

const Video = () => {
  const { t } = useTranslation('options');
  const [seekSecond, setSeekSecond] = useState(0);

  useEffect(() => {
    browser.storage.local.get('settings').then(data => {
      const settings = data.settings || {};
      setSeekSecond(settings[KEY_VIDEO_SEEK_SECONDS] || 0);
    });
  }, []);

  const handleSecondChange = e => {
    const { value } = e.target;
    browser.storage.local
      .get('settings')
      .then(data => {
        const settings = data.settings || {};
        settings[KEY_VIDEO_SEEK_SECONDS] = value;
        return browser.storage.local.set({ settings });
      })
      .then(() => {
        setSeekSecond(value);
      });
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item container spacing={1} direction="column">
        <Grid item>
          <Typography variant="h6">{t('settings.video.title')}</Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            {t('settings.video.description')}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="subtitle1">
            {t('settings.seek.label')}
          </Typography>
        </Grid>
        <Grid item>
          <Select value={seekSecond} onChange={handleSecondChange}>
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Video;
