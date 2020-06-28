import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { useHistory, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon
} from '@material-ui/icons';
import { IconButton } from '@yi-note/common/components';
import { StyledContainer } from './styled';
import Search from '../Search';

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const {
    search: { setQuery },
    app: { setOpen: setAppOpen }
  } = useStoreActions(actions => actions);

  const handleCloseSearch = () => {
    if (history.length > 1) {
      history.goBack();
    } else {
      setAppOpen(false);
    }
    setQuery('');
  };

  const handleClose = () => setAppOpen(false);

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
        {pathname === '/search' && history.length > 1 ? (
          <IconButton onClick={handleCloseSearch}>
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleClose}>
            <ChevronRightIcon />
          </IconButton>
        )}
      </Grid>
    </StyledContainer>
  );
};

export default Header;
