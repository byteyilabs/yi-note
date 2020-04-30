import React from 'react'
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom'
import styled from 'styled-components'
import { useStoreState } from 'easy-peasy'
import { AppBar, Toolbar, Typography, IconButton, Container }  from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import MenuIcon from '@material-ui/icons/Menu'
import Bookmarks from '../Bookmarks'
import Page from '../Page'
import Settings from '../Settings'
import withTheme from '../../../common/withTheme'

const StyledPageContainer = styled(Container)`
  margin-top: 64px;
`

const StyledToolbar = styled(Toolbar)`
  justify-content: flex-start;
`

const StyledTitle = styled(Typography)`
  margin-left: ${props => props.theme.spacing(2)}px;
`

const App = () => {
  const { title } = useStoreState(state => state.app)
  const history = useHistory()

  const handleClickSettings = () => {
    history.push('/settings')
  }

  return (
    <>
      <AppBar position="fixed">
        <StyledToolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <StyledTitle variant="h6">{title}</StyledTitle>
          {/* <IconButton 
            color="inherit" 
            edge="end" 
            onClick={handleClickSettings}
          >
            <SettingsIcon />
          </IconButton> */}
        </StyledToolbar>
      </AppBar>
      <StyledPageContainer maxWidth="lg">
        <Switch>
          <Route exact path={'/'} component={Bookmarks} />
          <Route exact path={'/settings'} component={Settings} />
          <Route path={'/pages/:id'} component={Page} />
        </Switch>
      </StyledPageContainer>
    </>
  )
}

export default withTheme(App)
