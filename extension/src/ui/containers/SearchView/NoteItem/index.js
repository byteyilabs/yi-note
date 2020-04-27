import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { StyledTimestamp, StyledPageInfo } from './styled'
import { StyledImg, StyledArchor, StyledMainLine, StyledAdditionalInfo } from '../styled'
import BaseItem from '../BaseItem'
import { secondsToTime } from '../../../utils'

const NoteItem = ({
  item: { content, timestamp, page: { title, url, icon } = {} },
  query
}) => {
  return (
    <StyledArchor href={url} target="_blank" rel="noopener noreferrer">
      <Grid container direction="column">
        <Grid item>
          <StyledMainLine>
            <StyledTimestamp>{secondsToTime(timestamp)}</StyledTimestamp>
            <BaseItem origin={content} query={query} />
          </StyledMainLine>
        </Grid>
        <Grid item>
          <StyledAdditionalInfo>
            {icon && <StyledImg src={icon} alt="icon" />}
            <span>{title}</span>
          </StyledAdditionalInfo>
        </Grid>
      </Grid>
    </StyledArchor>
  )
}

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
}

export default NoteItem
