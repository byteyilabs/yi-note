import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useInterval } from 'react-recipes';
import { Grid } from '@material-ui/core';
import { StyledDrawer, StyledViewWrapper } from './styled';
import Header from './Header';
import Footer from './Footer';
import VideoNotesView from '../VideoNotesView';
import SearchView from '../SearchView';
import ReloadView from '../ReloadView';
import Spinner from '../../components/Spinner';
import Alerts from '../../../common/components/Alerts';
import { PlayerFactory } from '../../services/player';
import withTheme from '../../../common/withTheme';
import {
  QUERY_AUTO_JUMP,
  KEY_RELOAD_TAB,
  KEY_RELOAD_TAB_ALLOWED_DOMAINS
} from '../../../constants';
import { delay } from '../../../common/utils';

const App = () => {
  const {
    app: { open, url },
    settings: { data: settings }
  } = useStoreState(state => state);
  const {
    app: { setOpen, setUrl, setShowingAd },
    settings: { fetchSettings }
  } = useStoreActions(actions => actions);
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
      if (
        settings[KEY_RELOAD_TAB] &&
        (settings[KEY_RELOAD_TAB_ALLOWED_DOMAINS] || []).some(domain =>
          window.location.hostname.includes(domain)
        )
      ) {
        window.location.reload();
      } else {
        setUrl(window.location.href);
        PlayerFactory.reset();
      }
    }
  }, 300);

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
    fetchSettings();
  }, [fetchSettings]);

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
    <StyledDrawer open={open} className={open && 'panel-shadow'}>
      <Grid container>
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
      </Grid>
      <Alerts />
    </StyledDrawer>
  );
};

export default withTheme(App);
