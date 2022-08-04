import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useInterval } from 'react-recipes';
import { Grid } from '@material-ui/core';
import { Alerts } from '@yi-note/common/components';
import { withTheme } from '@yi-note/common';
import { delay } from '@yi-note/common/utils';
import { StyledDrawer, StyledViewWrapper } from './styled';
import Header from './Header';
import Footer from './Footer';
import VideoNotesView from '../VideoNotesView';
import SearchView from '../SearchView';
import ReloadView from '../ReloadView';
import Spinner from '../../components/Spinner';
import { PlayerFactory } from '../../services/player';
import {
  QUERY_AUTO_JUMP,
  KEY_RELOAD_TAB,
  KEY_RELOAD_TAB_ALLOWED_DOMAINS
} from '@yi-note/common/constants';

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
        PlayerFactory.reset();
        // setUrl will trigger side effect UI states reset
        setUrl(window.location.href);
      }
    }
  }, 300);

  useEffect(() => {
    const maybeSeekToTimestamp = async () => {
      // Make sure to get new player when url change
      const player = await getPlayer();
      const urlCompinents = new URL(window.location.href);
      const params = new URLSearchParams(urlCompinents.search);
      if (params.has(QUERY_AUTO_JUMP)) {
        const timestamp = +params.get(QUERY_AUTO_JUMP);
        await delay(1500);
        await player.seek(timestamp);
        await player.play();
      }
    };
    maybeSeekToTimestamp();
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
    <StyledDrawer
      // fixes toggling the drawer open and closed.
      // For some reason passing `open` doesn't update the component's styles
      style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      open={open}
      className={open && 'panel-shadow'}
    >
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
