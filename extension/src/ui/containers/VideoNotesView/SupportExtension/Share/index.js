import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid, IconButton } from '@material-ui/core';
import { getFileUrl } from '@yi-note/common/utils';
import { INSTALLATION_URL } from '@yi-note/common/constants';
import { StyledTitle } from '../styled';
import * as icons from './icons';

const StyledImg = styled.img`
  width: 30px;
  height: 30px;
`;

const StyledStatus = styled.span`
  color: #4763ff;
`;

const methods = ['facebook', 'twitter', 'copylink'];
const hashTags = [
  'edtech',
  'YiNote',
  'Turbonote',
  'mooc',
  'flipclass',
  'video',
  'youtube',
  'notetaking'
];

const Share = () => {
  const { t } = useTranslation('share');
  const [copied, setCopied] = useState(false);

  const openShareDialog = url => {
    const width = 670;
    var height = 340;
    var spec = `width=670, height=340, top=${(window.innerHeight - height) /
      2}, left=${(window.innerWidth - width) / 2}`;
    window.open(url, '', spec);
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(INSTALLATION_URL);
    const text = encodeURIComponent(t('text'));
    const tags = hashTags.map(ht => `#${ht}`).join('');
    openShareDialog(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&hashtag=${encodeURIComponent(
        tags
      )}&quote=${text}`
    );
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(t('text'));
    const url = encodeURIComponent(INSTALLATION_URL);
    const tags = hashTags.join(',');
    openShareDialog(
      `https://twitter.com/share?url=${url}&text=${text}&hashtags=${tags}`
    );
  };

  const copylink = () => {
    browser.runtime
      .sendMessage({
        action: `copy`,
        data: INSTALLATION_URL
      })
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 3 * 1000);
      });
  };

  const handleClick = method => () => {
    switch (method) {
      case 'facebook':
        shareToFacebook();
        return;
      case 'twitter':
        shareToTwitter();
        return;
      case 'copylink':
        copylink();
        return;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2} direction="row" alignItems="center">
        <Grid item>
          <StyledTitle>{t('title')}</StyledTitle>
        </Grid>
        {copied && (
          <Grid item>
            <StyledStatus>{t('copylink.success')}</StyledStatus>
          </Grid>
        )}
      </Grid>
      <Grid item container>
        {methods.map(method => (
          <Grid key={method} item>
            <Grid container justify="center">
              <IconButton onClick={handleClick(method)}>
                <StyledImg src={getFileUrl(icons[`${method}Img`])} />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Share;
