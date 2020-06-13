import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Link, Typography } from '@material-ui/core';
import { secondsToTime, buildAutoSeekUrl } from '../../../../common/utils';

const StyledImg = styled.img`
  @media (max-width: 940px) {
    width: 426px;
    height: 240px;
  }

  width: 640px;
  height: 360px;
`;

const NoteItem = ({ content, timestamp, image, url }) => {
  return (
    <Grid container>
      <Grid item lg={8} md={12}>
        <StyledImg src={image} alt="Screenshot" />
      </Grid>
      <Grid item md={4} sm={12}>
        <Link href={buildAutoSeekUrl(url, timestamp)} target="_blank">
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
