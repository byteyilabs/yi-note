import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Link } from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { StyledTitle } from '../styled';
import { GITHUB_URL } from '@yi-note/common/constants';

const Star = () => {
  const { t } = useTranslation('star');
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={1}>
        <Grid item>
          <StyledTitle>{t('title')}</StyledTitle>
        </Grid>
        <Grid item>
          <div>{t('description')}</div>
        </Grid>
      </Grid>
      <Grid item container spacing={1} alignItems="center">
        <Grid item>
          <GitHubIcon />
        </Grid>
        <Grid item>
          <Link href={GITHUB_URL} target="_blank" rel="noopener">
            {t('github')}
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Star;
