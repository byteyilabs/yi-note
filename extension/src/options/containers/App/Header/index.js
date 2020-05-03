import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import styled from 'styled-components';
import {
  AppBar,
  Grid,
  Typography,
  IconButton,
  Hidden,
  useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from './Toolbar';
import { drawerWidth, headerHeight } from '../constants';

const StyledAppBar = styled(AppBar)`
  @media (min-width: 600px) {
    margin-left: ${drawerWidth}px;
    width: calc(100% - ${drawerWidth}px);
  }

  > div {
    height: ${headerHeight}px;
  }
`;

const StyledTitle = styled(Typography)`
  margin-left: ${props => props.theme.spacing(2)}px;
`;

const StyledMenuButton = styled(IconButton)`
  margin-left: 15px;
`;

const Header = () => {
  const {
    title,
    drawer: { open: drawerOpen }
  } = useStoreState(state => state.app);
  const { setOpen: setDrawOpen } = useStoreActions(
    actions => actions.app.drawer
  );
  const theme = useTheme();
  const justify = !useMediaQuery(`(min-width:${theme.breakpoints.values.sm}px)`)
    ? 'space-between'
    : 'flex-end';

  const handleDrawerToggle = () => {
    setDrawOpen(!drawerOpen);
  };

  return (
    <StyledAppBar position="fixed">
      <Grid container direction="row" alignItems="center" justify={justify}>
        <Grid item>
          <Hidden smUp>
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
          </Hidden>
        </Grid>
        <Grid item>
          <Toolbar />
        </Grid>
      </Grid>
    </StyledAppBar>
  );
};

export default Header;
