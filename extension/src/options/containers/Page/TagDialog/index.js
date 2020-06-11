import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Dialog,
  DialogContent,
  TextField,
  Chip
} from '@material-ui/core';

const TagDialog = () => {
  const { t} = useTranslation('tagdialog');
  const {
    tagDialog: { open },
    tags
  } = useStoreState(state => state.page);
  const {
    tagDialog: { setOpen },
    addTag,
    removeTag
  } = useStoreActions(actions => actions.page);
  const [input, setInput] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      addTag(input);
      setInput('');
    }
  };

  const handleDelete = tag => {
    removeTag(tag);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              label={t('input.label')}
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item container spacing={1}>
            {tags.map(tag => (
              <Grid item key={tag}>
                <Chip
                  label={tag}
                  color="default"
                  onDelete={handleDelete.bind(null, tag)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TagDialog;
