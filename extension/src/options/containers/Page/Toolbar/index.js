import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Tooltip, IconButton } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import TagIcon from '@material-ui/icons/LocalOfferOutlined';

const Toolbar = () => {
  const { t } = useTranslation('options');
  const { url } = useStoreState(state => state.page);
  const { setOpen } = useStoreActions(actions => actions.tagDialog);

  const handleAddTag = () => {
    setOpen(true);
  };

  const handleOpenPage = () => {
    window.open(url, '_blank');
  };

  return (
    <>
      <Tooltip title={t('page.tag.tooltip')}>
        <IconButton color="inherit" onClick={handleAddTag}>
          <TagIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('page.open.tooltip')}>
        <IconButton color="inherit" onClick={handleOpenPage}>
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Toolbar;
