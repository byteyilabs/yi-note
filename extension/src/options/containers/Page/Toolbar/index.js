import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState } from 'easy-peasy';
import { Tooltip, IconButton } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const Toolbar = () => {
  const { t } = useTranslation('options');
  const { url } = useStoreState(state => state.page);

  const handleOpenPage = () => {
    window.open(url, '_blank');
  };

  return (
    <Tooltip title={t('page.open.tooltip')}>
      <IconButton color="inherit" onClick={handleOpenPage}>
        <OpenInNewIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Toolbar;
