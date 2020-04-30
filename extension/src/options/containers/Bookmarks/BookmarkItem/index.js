import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

const StyledContainer = styled(Grid)`
  cursor: pointer;
  background-color: ${props => props.theme.palette.grey[100]};
`

const StyledImg = styled.img`
  width: 120px;
  height: 90px;
  ${props => props.theme.breakpoints.down('xs')} {
    width: 352px;
    height: 240px
  }
`

const StyledTitle = styled.div`
  font-weight: 500;
`

const StyledDescription = styled.div`
  font-size: 0.8em;
  color: grey;
`

const BookmarkItem = ({ id, title, description, url, image }) => {
  const history = useHistory()

  const handleOpenPageDetail = () => {
    history.push(`/pages/${id}`)
  }

  return (
    <StyledContainer 
      container 
      direction="row"
      spacing={1}
      onClick={handleOpenPageDetail}
    >
      <Grid item sm={2} xs={12}>
        <Grid container justify="center" alignItems="center">
          <StyledImg src={image} alt="" />
        </Grid>
      </Grid>
      <Grid item sm={10} xs={12} container spacing={2} direction="column">
        <Grid item>
          <StyledTitle>{title}</StyledTitle>
        </Grid>
        <Grid item>
          <StyledDescription>{description}</StyledDescription>
        </Grid>
      </Grid>
    </StyledContainer>
  )
}

BookmarkItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string
}

export default BookmarkItem
