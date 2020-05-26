import React from 'react';
import styled from 'styled-components';
import { Grid, CircularProgress } from '@material-ui/core';

const StyledContainer = styled(Grid)`
  padding: 20px;
  & svg {
    width: 40px;
    height: 40px;
  }
`;

const Spinner = () => {
  return (
    <StyledContainer container alignItems="center" justify="center">
      <Grid item>
        <CircularProgress />
      </Grid>
    </StyledContainer>
  );
};

export default Spinner;
