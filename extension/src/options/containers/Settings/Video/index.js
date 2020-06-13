import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Typography,
  Divider,
  Select,
  MenuItem,
  Switch
} from '@material-ui/core';
import {
  KEY_VIDEO_SEEK_SECONDS,
  KEY_APPLY_SEEK_SEC_ON_URL,
  KEY_SCREENSHOT_RESOLUTION
} from '../../../../constants';

const Video = () => {
  const { t } = useTranslation('options');
  const [seekSecond, setSeekSecond] = useState(0);
  const [applySeekSecondsOnUrl, setApplySeekSecondsOnUrl] = useState(false);
  const [resolution, setResolution] = useState(360);

  useEffect(() => {
    browser.storage.local.get('settings').then(data => {
      const settings = data.settings || {};
      setSeekSecond(settings[KEY_VIDEO_SEEK_SECONDS] || 0);
      setApplySeekSecondsOnUrl(settings[KEY_APPLY_SEEK_SEC_ON_URL] || false);
      setResolution(settings[KEY_SCREENSHOT_RESOLUTION] || 360);
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

  const handleApplySeekSecondsOnUrlChange = e => {
    const { checked } = e.target;
    browser.storage.local
      .get('settings')
      .then(data => {
        const settings = data.settings || {};
        settings[KEY_APPLY_SEEK_SEC_ON_URL] = checked;
        return browser.storage.local.set({ settings });
      })
      .then(() => {
        setApplySeekSecondsOnUrl(checked);
      });
  };

  const handleResolutionChange = e => {
    const { value } = e.target;
    browser.storage.local
      .get('settings')
      .then(data => {
        const settings = data.settings || {};
        settings[KEY_SCREENSHOT_RESOLUTION] = value;
        return browser.storage.local.set({ settings });
      })
      .then(() => {
        setResolution(value);
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
      <Grid item container spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="subtitle1">
            {t('settings.seek.generated.url.label')}
          </Typography>
        </Grid>
        <Grid item>
          <Switch
            checked={applySeekSecondsOnUrl}
            onChange={handleApplySeekSecondsOnUrlChange}
            name="applySeekSecondsOnUrl"
          />
        </Grid>
      </Grid>
      <Grid item container spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="subtitle1">
            {t('settings.screenshot.resolution.label')}
          </Typography>
        </Grid>
        <Grid item>
          <Select value={resolution} onChange={handleResolutionChange}>
            <MenuItem value={360}>640x360</MenuItem>
            <MenuItem value={720}>1280x720</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Video;
