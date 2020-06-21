import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Grid, Chip } from '@material-ui/core';
import { StorageFactory } from '../../../../common/services/storage';

const Tags = () => {
  const { tags } = useStoreState(state => state.page.data);

  const handleTagClick = tag => {
    StorageFactory.getStorage()
      .setStates({ tags: [tag] })
      .then(() => browser.runtime.sendMessage({ action: 'open-options' }));
  };

  return (
    <Grid container spacing={1}>
      {tags.map(tag => (
        <Grid item key={tag}>
          <Chip
            label={tag}
            color="default"
            clickable
            onClick={handleTagClick.bind(null, tag)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Tags;
