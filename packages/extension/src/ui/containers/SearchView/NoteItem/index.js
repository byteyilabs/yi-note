import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlighter';
import Grid from '@material-ui/core/Grid';
import { secondsToTime, buildAutoSeekUrl } from '@yi-note/common/utils';
import Markdown from '@yi-note/common/services/markdown';
import { StyledTimestamp } from './styled';
import {
  StyledImg,
  StyledArchor,
  StyledMainLine,
  StyledAdditionalInfo
} from '../styled';

const NoteItem = ({
  item: { content, timestamp, page: { title, url, icon } = {} },
  query
}) => {
  return (
    <StyledArchor
      href={buildAutoSeekUrl(url, timestamp)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Grid container direction="column">
        <Grid item xs={12}>
          <StyledMainLine>
            <StyledTimestamp>{secondsToTime(timestamp)}</StyledTimestamp>
            <Highlight search={query}>{Markdown.toText(content)}</Highlight>
          </StyledMainLine>
        </Grid>
        <Grid item xs={12}>
          <StyledAdditionalInfo>
            {icon && <StyledImg src={icon} alt="icon" />}
            <span>{title}</span>
          </StyledAdditionalInfo>
        </Grid>
      </Grid>
    </StyledArchor>
  );
};

NoteItem.propTypes = {
  item: PropTypes.shape({
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string
    })
  }),
  query: PropTypes.string
};

export default NoteItem;
