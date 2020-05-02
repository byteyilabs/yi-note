import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useInterval } from 'react-recipes'
import { StyledContainer, StyledMain, StyledViewWrapper } from './styled'
import Header from './Header'
import Footer from './Footer'
import VideoNotesView from '../VideoNotesView'
import SearchView from '../SearchView'
import ReloadView from '../ReloadView'
import Alerts from '../../../common/components/Alerts'
import { PlayerFactory } from '../../services/player'
import withTheme from '../../../common/withTheme'

const App = () => {
  const { open, url } = useStoreState(state => state.app)
  const { setOpen, setUrl, setVersion } = useStoreActions(
    actions => actions.app
  )
  const history = useHistory()

  useInterval(() => {
    if (url !== window.location.href) {
      PlayerFactory.reset()
      setUrl(window.location.href)
    }
  }, 100)

  useEffect(() => {
    // Register message listener
    try {
      browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        const { action, version } = request
        switch (action) {
          case 'togglePanel':
            sendResponse({ message: 'connected' })
            setOpen(!open)
            setVersion(version)
            return
        }
      })
    } catch (e) {
      logger.error(new Error('Failed to register extension message listener.'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    try {
      const port = browser.runtime.connect({ name: 'yinote' })
      port.onDisconnect.addListener(() => history.replace('/reload'))
    } catch (e) {
      logger.error(new Error('Failed to connect to extension.'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledContainer open={open} className={open && 'panel-shadow'}>
      <StyledMain>
        <Header />
        <StyledViewWrapper>
          <Switch>
            <Route path="/video-notes" component={VideoNotesView} />
            <Route path="/search" component={SearchView} />
            <Route path="/reload" component={ReloadView} />
          </Switch>
        </StyledViewWrapper>
        <Footer />
      </StyledMain>
      <Alerts />
    </StyledContainer>
  )
}

export default withTheme(App)
