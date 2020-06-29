import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  Grid,
  Typography,
  Divider,
  Select,
  MenuItem,
  Switch,
  TextField,
  IconButton
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import {
  KEY_VIDEO_SEEK_SECONDS,
  KEY_APPLY_SEEK_SEC_ON_URL,
  KEY_RELOAD_TAB,
  KEY_RELOAD_TAB_ALLOWED_DOMAINS
} from '@yi-note/common/constants';

const Video = () => {
  const { t } = useTranslation('options');
  const {
    data: {
      [KEY_VIDEO_SEEK_SECONDS]: seekSecond = 0,
      [KEY_APPLY_SEEK_SEC_ON_URL]: applySeekSecondsOnUrl = false,
      [KEY_RELOAD_TAB]: reloadTab = false,
      [KEY_RELOAD_TAB_ALLOWED_DOMAINS]: reloadTabDomains = []
    }
  } = useStoreState(state => state.settings);
  const { setSetting } = useStoreActions(actions => actions.settings);
  const [domain, setDomain] = useState('');

  const handleSecondChange = e => {
    const { value } = e.target;
    setSetting({ [KEY_VIDEO_SEEK_SECONDS]: value });
  };

  const handleApplySeekSecondsOnUrlChange = e => {
    const { checked } = e.target;
    setSetting({ [KEY_APPLY_SEEK_SEC_ON_URL]: checked });
  };

  const handleReloadTabChange = e => {
    const { checked } = e.target;
    setSetting({ [KEY_RELOAD_TAB]: checked });
  };

  const handleAddDomain = e => {
    e.preventDefault();
    setSetting({
      [KEY_RELOAD_TAB_ALLOWED_DOMAINS]: [
        ...reloadTabDomains.filter(d => d !== domain),
        domain
      ]
    });
    setDomain('');
  };

  const handleDomainChange = e => {
    const { value } = e.target;
    setDomain(value);
  };

  const handleDeleteDomain = domain => {
    const domains = reloadTabDomains.filter(d => d !== domain);
    setSetting({ [KEY_RELOAD_TAB_ALLOWED_DOMAINS]: domains });
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
      <Grid item container direction="column" spacing={1}>
        <Grid item container direction="row" alignItems="center">
          <Grid item>
            <Typography variant="subtitle1">
              {t('settings.reload.tab.label')}
            </Typography>
          </Grid>
          <Grid item>
            <Switch
              checked={reloadTab}
              onChange={handleReloadTabChange}
              name="reloadTab"
            />
          </Grid>
        </Grid>
        {reloadTab &&
          reloadTabDomains.map(domain => (
            <Grid
              key={domain}
              item
              container
              direction="row"
              alignItems="center"
            >
              <Grid item>
                <Typography>{domain}</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  size="small"
                  onClick={handleDeleteDomain.bind(null, domain)}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        {reloadTab && (
          <Grid item>
            <form onSubmit={handleAddDomain}>
              <TextField
                label="Allowed domain"
                required
                value={domain}
                onChange={handleDomainChange}
              />
            </form>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Video;
