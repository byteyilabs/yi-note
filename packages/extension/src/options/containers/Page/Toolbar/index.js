import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Tooltip, IconButton } from '@material-ui/core';
import {
  OpenInNew as OpenInNewIcon,
  PictureAsPdfOutlined as PDFIcon,
  LocalOfferOutlined as TagIcon
} from '@material-ui/icons';
import {
  EvernoteIcon,
  GoogleDocsIcon,
  OneNoteIcon,
  MarkdownIcon
} from '@yi-note/common/icons';
import {
  pdf as PDFService,
  file as FileService,
  integration as IntegrationService,
  markdown as MarkdownService
} from '@yi-note/common/services';
import { capitalize } from '@yi-note/common/utils';
import { APP_ID } from '@yi-note/common/constants';

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
    const generator = new PDFService();
    const blob = await generator.getBlobOutput({
      url: meta.url,
      title: meta.title,
      notes
    });
    await FileService.exportFile(blob, `${APP_ID}_${id}.pdf`);
  };

  const handleSendNotesToService = namespace => {
    const className = capitalize(namespace);
    const service = new IntegrationService[className](namespace, {
      id,
      meta,
      notes
    });

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

  const handleExportMarkdown = () => {
    const data = MarkdownService.pagesToMarkdown([{ meta, notes }]);

    // Removing notifications count and " - Youtube" at the end
    const fileName = meta.title
      .replace(/^\(.*\) /g, '')
      .replace(/ - YouTube$/g, '');

    return FileService.exportMarkdownFile(data, `${fileName}.md`);
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
      <Tooltip title={t('page.export.markdown.tooltip')}>
        <IconButton color="inherit" onClick={handleExportMarkdown}>
          <MarkdownIcon fill="#ffffff" />
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
