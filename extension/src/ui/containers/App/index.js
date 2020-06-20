import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useInterval } from 'react-recipes';
import { StyledContainer, StyledMain, StyledViewWrapper } from './styled';
import Header from './Header';
import Footer from './Footer';
import VideoNotesView from '../VideoNotesView';
import SearchView from '../SearchView';
import ReloadView from '../ReloadView';
import Spinner from '../../components/Spinner';
import Alerts from '../../../common/components/Alerts';
import { PlayerFactory } from '../../services/player';
import withTheme from '../../../common/withTheme';
import { QUERY_AUTO_JUMP } from '../../../constants';
import { delay } from '../../../common/utils';

const App = () => {
  const { open, url } = useStoreState(state => state.app);
  const { setOpen, setUrl, setShowingAd } = useStoreActions(
    actions => actions.app
  );
  const history = useHistory();
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(false);

  const onShowingAd = useCallback(() => setShowingAd(true), [setShowingAd]);
  const onHidingAd = useCallback(() => setShowingAd(false), [setShowingAd]);

  const getPlayer = useCallback(() => {
    return PlayerFactory.getPlayer({ url, onShowingAd, onHidingAd });
  }, [onHidingAd, onShowingAd, url]);

  useInterval(() => {
    if (url !== window.location.href) {
      PlayerFactory.reset();
      setUrl(window.location.href);
    }
  }, 100);

  useEffect(() => {
    const jumpToTimestamp = async t => {
      getPlayer().then(async player => {
        await delay(1500);
        await player.seek(t);
        await player.play();
      });
    };

    const urlCompinents = new URL(window.location.href);
    const params = new URLSearchParams(urlCompinents.search);
    if (params.has(QUERY_AUTO_JUMP)) {
      const timestamp = +params.get(QUERY_AUTO_JUMP);
      jumpToTimestamp(timestamp);
    }
  }, [getPlayer, url]);

  useEffect(() => {
    // Register message listener
    if (typeof browser !== 'undefined') {
      browser.runtime.onMessage.addListener(request => {
        const { action } = request;
        switch (action) {
          case 'togglePanel':
            setOpen(!open);
            return;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof browser !== 'undefined') {
      const port = browser.runtime.connect({ name: 'yinote' });
      port.onDisconnect.addListener(() => history.replace('/reload'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open && pathname === '/') {
      setProgress(true);
      // First load of player, options needed.
      getPlayer()
        .then(player => {
          setProgress(false);
          history.replace(player ? '/video-notes' : '/search');
        })
        .catch(err => {
          logger.info(err);
          setProgress(false);
          history.replace('/search');
        });
    }
  }, [getPlayer, history, open, pathname]);

  return (
    <StyledContainer open={open} className={open && 'panel-shadow'}>
      <StyledMain>
        <Header />
        <StyledViewWrapper>
          {progress ? (
            <Spinner />
          ) : (
            <Switch>
              <Route path="/video-notes" component={VideoNotesView} />
              <Route path="/search" component={SearchView} />
              <Route path="/reload" component={ReloadView} />
            </Switch>
          )}
        </StyledViewWrapper>
        <Footer />
      </StyledMain>
      <Alerts />
    </StyledContainer>
  );
};

export default withTheme(App);
