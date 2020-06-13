import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Tooltip, IconButton } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import PDFIcon from '@material-ui/icons/PictureAsPdfOutlined';
import TagIcon from '@material-ui/icons/LocalOfferOutlined';
import PDFGenerator from '../../../../common/services/pdf';
import { exportFile } from '../../../../common/services/file';
import { APP_ID } from '../../../../constants';

const Toolbar = () => {
  const { t } = useTranslation('options');
  const { id, url, title, notes } = useStoreState(state => state.page);
  const { setOpen } = useStoreActions(actions => actions.tagDialog);

  const handleAddTag = () => {
    setOpen(true);
  };

  const handleGeneratePDF = async () => {
    const generator = new PDFGenerator();
    const blob = await generator.getBlobOutput({ url, title, notes });
    await exportFile(blob, `${APP_ID}_${id}.pdf`);
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
      <Tooltip title={t('page.pdf.tooltip')}>
        <IconButton color="inherit" onClick={handleGeneratePDF}>
          <PDFIcon />
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
