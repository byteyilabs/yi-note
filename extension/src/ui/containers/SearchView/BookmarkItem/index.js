import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlighter';
import Grid from '@material-ui/core/Grid';
import {
  StyledArchor,
  StyledImg,
  StyledMainLine,
  StyledAdditionalInfo
} from '../styled';

const BookmarkItem = ({ item: { title, icon, description, url }, query }) => {
  return (
    <StyledArchor href={url} target="_blank" rel="noopener noreferrer">
      <Grid container>
        <Grid item>
          <StyledMainLine>
            {icon && <StyledImg src={icon} alt="icon" />}
            <Highlight search={query}>{description}</Highlight>
          </StyledMainLine>
        </Grid>
        <Grid item>
          <StyledAdditionalInfo>
            <Highlight search={query}>{description}</Highlight>
          </StyledAdditionalInfo>
        </Grid>
      </Grid>
    </StyledArchor>
  );
};

BookmarkItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    icon: PropTypes.string,
    description: PropTypes.string
  }),
  query: PropTypes.string
};

export default BookmarkItem;
