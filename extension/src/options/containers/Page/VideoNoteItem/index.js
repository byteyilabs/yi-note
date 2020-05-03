import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Link, Typography } from '@material-ui/core';
import { secondsToTime } from '../../../../common/utils';

const getUrlWithTimeQuery = (url, timestamp) => {
  // eslint-disable-next-line no-undef
  const parsedUrl = new URL(url);
  parsedUrl.search = parsedUrl.search
    ? `${parsedUrl.search}&yinote-timestamp=${timestamp}`
    : `?yinote-timestamp=${timestamp}`;
  return parsedUrl.toString();
};

const NoteItem = ({ content, timestamp, image, url }) => {
  return (
    <Grid container>
      <Grid item lg={6} md={8} sm={12}>
        <img src={image} alt="Screenshot" />
      </Grid>
      <Grid item lg={6} md={4} sm={12}>
        <Link href={getUrlWithTimeQuery(url, timestamp)} target="_blank">
          {secondsToTime(timestamp)}
        </Link>
        <Typography variant="body1">{content}</Typography>
      </Grid>
    </Grid>
  );
};

NoteItem.propTypes = {
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default NoteItem;
