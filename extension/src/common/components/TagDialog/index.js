import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Dialog,
  DialogContent,
  TextField,
  Chip
} from '@material-ui/core';
import { APP_ID } from '../../../constants';

const TagDialog = ({ tags, onAddTag, onRemoveTag }) => {
  const { t } = useTranslation('tagdialog');
  const {
    tagDialog: { open }
  } = useStoreState(state => state);
  const {
    tagDialog: { setOpen }
  } = useStoreActions(actions => actions);
  const [input, setInput] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current = document.getElementById(APP_ID);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onAddTag(input);
      setInput('');
    }
  };

  const handleDelete = tag => {
    onRemoveTag(tag);
  };

  return (
    <Dialog onClose={handleClose} open={open} container={containerRef.current}>
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

TagDialog.propTypes = {
  tags: PropTypes.array.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired
};

export default TagDialog;
