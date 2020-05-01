import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '@material-ui/core'
import Header from './Header'
import Drawer from './Drawer'
import Bookmarks from '../Bookmarks'
import Page from '../Page'
import Settings from '../Settings'
import Alerts from '../../../common/components/Alerts'
import withTheme from '../../../common/withTheme'
import { headerHeight, drawerWidth } from './constants'

const StyledPageContainer = styled(Container)`
  margin-top: ${headerHeight}px;
  @media (min-width: 600px) {
    margin-left: ${drawerWidth}px;
    width: calc(100% - ${drawerWidth}px);
  }
`

const App = () => {
  return (
    <>
      <Header />
      <Drawer />
      <StyledPageContainer maxWidth="lg">
        <Switch>
          <Route exact path={'/'} component={Bookmarks} />
          <Route exact path={'/settings'} component={Settings} />
          <Route path={'/pages/:id'} component={Page} />
        </Switch>
      </StyledPageContainer>
      <Alerts />
    </>
  )
}

export default withTheme(App)
