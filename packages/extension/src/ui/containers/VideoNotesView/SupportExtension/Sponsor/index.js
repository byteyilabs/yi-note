import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Link } from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { PatreonIcon, PaypalIcon } from '@yi-note/common/icons';
import { StyledTitle } from '../styled';

const SPONSOR_GITHUB_URL = 'https://github.com/sponsors/shuowu';
const SPONSOR_PATREON_URL = 'https://www.patreon.com/yinote';
const SPONSOR_PAYPAL_URL = 'https://paypal.me/turbonote';

const Sponsor = () => {
  const { t } = useTranslation('sponsor');

  return (
    <Grid container spacing={2}>
      <Grid item>
        <StyledTitle>{t('title')}</StyledTitle>
      </Grid>
      <Grid item container direction="column" spacing={1}>
        <Grid item container spacing={1} alignItems="center">
          <Grid item>
            <GitHubIcon />
          </Grid>
          <Grid item>
            <Link href={SPONSOR_GITHUB_URL} target="_blank" rel="noopener">
              {t('github')}
            </Link>
          </Grid>
        </Grid>
        <Grid item container spacing={1} alignItems="center">
          <Grid item>
            <PatreonIcon />
          </Grid>
          <Grid item>
            <Link href={SPONSOR_PATREON_URL} target="_blank" rel="noopener">
              {t('patreon')}
            </Link>
          </Grid>
        </Grid>
        <Grid item container spacing={1} alignItems="center">
          <Grid item>
            <PaypalIcon />
          </Grid>
          <Grid item>
            <Link href={SPONSOR_PAYPAL_URL} target="_blank" rel="noopener">
              {t('paypal')}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Sponsor;
