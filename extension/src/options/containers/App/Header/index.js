import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import styled from 'styled-components'
import { AppBar, Grid, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { drawerWidth, headerHeight } from '../constants'

const StyledAppBar = styled(AppBar)`
  @media (min-width: 600px) {
    margin-left: ${drawerWidth}px;
    width: calc(100% - ${drawerWidth}px);
  }

  > div {
    height: ${headerHeight}px;
  }
`

const StyledTitle = styled(Typography)`
  margin-left: ${props => props.theme.spacing(2)}px;
`

const StyledMenuButton = styled(IconButton)`
  margin-left: 15px;
  @media (min-width: 600px) {
    display: none;
  }
`

const Header = () => {
  const {
    title,
    drawer: { open: drawerOpen }
  } = useStoreState(state => state.app)
  const { setOpen: setDrawOpen } = useStoreActions(
    actions => actions.app.drawer
  )

  const handleDrawerToggle = () => {
    setDrawOpen(!drawerOpen)
  }

  return (
    <StyledAppBar position="fixed">
      <Grid container direction="row" alignItems="center">
        <StyledMenuButton
          edge="start"
          color="inherit"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </StyledMenuButton>
        <StyledTitle variant="h6" noWrap>
          {title}
        </StyledTitle>
      </Grid>
    </StyledAppBar>
  )
}

export default Header
