import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { StyledArchor, StyledImg, StyledMainLine, StyledAdditionalInfo } from '../styled'
import BaseItem from '../BaseItem'

const BookmarkItem = ({ item: { title, icon, description, url }, query }) => {
  return (
    <StyledArchor href={url} target="_blank" rel="noopener noreferrer">
      <Grid container>
        <Grid item>
          <StyledMainLine>
            {icon && <StyledImg src={icon} alt="icon" />}
            <BaseItem origin={title} query={query} />
          </StyledMainLine>
        </Grid>
        <Grid item>
          <StyledAdditionalInfo>
            <BaseItem origin={description} query={query} />
          </StyledAdditionalInfo>
        </Grid>
      </Grid>
    </StyledArchor>
  )
}

BookmarkItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    icon: PropTypes.string,
    description: PropTypes.string
  }),
  query: PropTypes.string
}

export default BookmarkItem
