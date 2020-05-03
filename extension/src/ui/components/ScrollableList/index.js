import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

const StyledContainer = styled(Grid)`
  height: ${props => props.height}px;
  max-height: 100%;
  overflow-y: scroll;
`

const ScrollableList = ({ items, renderItem, height }) => {
  return (
    <StyledContainer container spacing={1} height={height}>
      {items.map(item => (
        <Grid key={item.id} item xs={12}>
          {renderItem(item)}
        </Grid>
      ))}
    </StyledContainer>
  )
}

ScrollableList.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  height: PropTypes.number
}

export default ScrollableList
