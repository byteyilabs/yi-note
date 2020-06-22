import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Tooltip, IconButton } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import PDFIcon from '@material-ui/icons/PictureAsPdfOutlined';
import TagIcon from '@material-ui/icons/LocalOfferOutlined';
import EvernoteIcon from '../../../../assets/icons/evernote.svg';
import GoogleDocsIcon from '../../../../assets/icons/googledocs.svg';
import OneNoteIcon from '../../../../assets/icons/onenote.svg';
import PDFGenerator from '../../../../common/services/pdf';
import { exportFile } from '../../../../common/services/file';
import * as services from '../../../../common/services/integrations';
import { capitalize } from '../../../../common/utils';
import { APP_ID } from '../../../../constants';

const Toolbar = () => {
  const { t } = useTranslation('options');
  const {
    data: { id, meta = {}, notes }
  } = useStoreState(state => state.page);
  const {
    tagDialog: { setOpen: setTagDialogOpen },
    alerts: { show: showAlerts },
    app: {
      setProgress,
      snackbar: { setStates: setSnackbar }
    }
  } = useStoreActions(actions => actions);

  const handleAddTag = () => {
    setTagDialogOpen(true);
  };

  const handleGeneratePDF = async () => {
    const generator = new PDFGenerator();
    const blob = await generator.getBlobOutput({
      url: meta.url,
      title: meta.title,
      notes
    });
    await exportFile(blob, `${APP_ID}_${id}.pdf`);
  };

  const handleSendNotesToService = namespace => {
    const className = capitalize(namespace);
    const service = new services[className](namespace, { id, meta, notes });

    const send = () => {
      setProgress(true);
      return service
        .sendNotes()
        .then(res => {
          logger.info(`Sent notes to ${namespace}`, res);
          setSnackbar({
            open: true,
            message: t('services:success'),
            severity: 'success'
          });
          setProgress(false);
        })
        .catch(err => {
          logger.error(err);
          setSnackbar({
            open: true,
            message: t('services:error'),
            severity: 'error'
          });
          setProgress(false);
        });
    };

    service.getExistingId().then(id => {
      if (id) {
        showAlerts({
          content: t('services:exist.message', {
            service: t(`services:${namespace}`)
          }),
          onConfirm: send
        });
      } else {
        send();
      }
    });
  };

  const handleOpenPage = () => {
    window.open(meta.url, '_blank');
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
      <Tooltip title={t('page.evernote.tooltip')}>
        <IconButton
          color="inherit"
          onClick={handleSendNotesToService.bind(null, 'evernote')}
        >
          <EvernoteIcon fill="#ffffff" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('page.googledocs.tooltip')}>
        <IconButton
          color="inherit"
          onClick={handleSendNotesToService.bind(null, 'googledocs')}
        >
          <GoogleDocsIcon fill="#ffffff" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('page.onenote.tooltip')}>
        <IconButton
          color="inherit"
          onClick={handleSendNotesToService.bind(null, 'onenote')}
        >
          <OneNoteIcon fill="#ffffff" />
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
