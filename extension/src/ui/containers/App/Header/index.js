import React from 'react'
import { useStoreActions } from 'easy-peasy'
import { useHistory, useLocation } from 'react-router-dom'
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight'
import { Close as CloseIcon } from 'styled-icons/material/Close'
import Grid from '@material-ui/core/Grid'
import { StyledContainer } from './styled'
import Search from '../Search'
import IconButton from '../../../components/IconButton'

const Header = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const {
    search: { setQuery },
    app: { setOpen: setAppOpen }
  } = useStoreActions(actions => actions)

  const handleCloseSearch = () => {
    history.goBack()
    setQuery('')
  }

  const handleClose = () => setAppOpen(false)

  return (
    <StyledContainer
      container
      justify="space-between"
      alignItems="center"
      direction="row"
      spacing={1}
    >
      <Grid item xs={10}>
        <Search />
      </Grid>
      <Grid item xs={2} container justify="flex-end">
        {pathname === '/search' ? (
          <IconButton onClick={handleCloseSearch}>
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleClose}>
            <KeyboardArrowRight />
          </IconButton>
        )}
      </Grid>
    </StyledContainer>
  )
}

export default Header
