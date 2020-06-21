import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Grid, Chip } from '@material-ui/core';

const Tags = () => {
  const { tags } = useStoreState(state => state.page.data);

  return (
    <Grid container spacing={1}>
      {tags.map(tag => (
        <Grid item key={tag}>
          <Chip label={tag} color="default" />
        </Grid>
      ))}
    </Grid>
  );
};

export default Tags;
