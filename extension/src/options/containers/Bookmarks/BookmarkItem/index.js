import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'
import styled from 'styled-components'
import { Grid, IconButton, Tooltip } from '@material-ui/core'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { useTranslation } from 'react-i18next'


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
  const { t } = useTranslation('options')
  const history = useHistory()
  const { 
    bookmarks: { removeBookmark },
    alerts: { showAlerts }
  } = useStoreActions(actions => actions)

  const handleOpenPageDetail = () => {
    history.push(`/pages/${id}`)
  }

  const handleOpenPageInNewTab = e => {
    e.stopPropagation()
    window.open(url, '_blank');
  }

  const handleDelete = e => {
    e.stopPropagation()
    showAlerts({
      content: t('bookmark.remove.alertContent'),
      onConfirm: removeBookmark.bind(null, id)
    })
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
      <Grid item sm={8} xs={12} container spacing={2} direction="column">
        <Grid item>
          <StyledTitle>{title}</StyledTitle>
        </Grid>
        <Grid item>
          <StyledDescription>{description}</StyledDescription>
        </Grid>
      </Grid>
      <Grid item sm={2} xs={12}>
        <Tooltip title={t('bookmark.open.tooltip')}>
          <IconButton onClick={handleOpenPageInNewTab}>
            <OpenInNewIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('bookmark.delete.tooltip')}>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
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
