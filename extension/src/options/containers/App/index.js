import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import Header from './Header';
import Drawer from './Drawer';
import Bookmarks from '../Bookmarks';
import Page from '../Page';
import Settings from '../Settings';
import Alerts from '../../../common/components/Alerts';
import withTheme from '../../../common/withTheme';
import { headerHeight, drawerWidth } from './constants';

const StyledPageContainer = styled(Container)`
  margin-top: ${headerHeight + 10}px;
  @media (min-width: 600px) {
    margin-left: ${drawerWidth}px;
    width: calc(100% - ${drawerWidth}px);
  }
`;

const App = () => {
  const history = useHistory();

  useEffect(() => {
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      const { action, data } = message;
      switch (action) {
        case 'open-page':
          history.push(`/pages/${data}`);
          return true;
        case 'filter-by-tags':
          history.push(`/?tags=${data.join(',')}`);
          return true;
      }
    });
  }, [history]);

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
  );
};

export default withTheme(App);
