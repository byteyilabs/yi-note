import React, { useEffect, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import PreviewIcon from '@material-ui/icons/FindInPageOutlined';
import CloudUploadOIcon from '@material-ui/icons/CloudUploadOutlined';
import Preview from './Preview';
import SendToServices from './SendToServices';
import NoteItem from './NoteItem';
import Editor from './Editor';
import IconButton from '../../components/IconButton';
import ScrollableList from '../../components/ScrollableList';
import { generatePageId } from '../../../common/utils';

export const StyledTitle = styled.div`
  font-weight: 500;
`;

const NotesView = () => {
  const { t } = useTranslation(['notesView', 'bookmark']);
  const {
    videoNotes: {
      page: { id, notes, meta }
    },
    app: { url }
  } = useStoreState(state => state);
  const {
    videoNotes: {
      fetchPage,
      bookmarkPage,
      removePage,
      preview: { setOpen: setPreviewOpen },
      sendToPlatforms: { setOpen: setSendToPlatformsOpen }
    },
    alerts: { show: showAlerts }
  } = useStoreActions(actions => actions);
  const tryLoadMeta = useRef(false);

  useEffect(() => {
    if (!id) {
      const pageId = generatePageId(url);
      fetchPage(pageId);
    } else if ((!meta || !meta.description || !meta.image) && !tryLoadMeta) {
      // Try add more meta info for migrated data
      tryLoadMeta.current = true;
      bookmarkPage();
    }
  }, [id, fetchPage, url, meta, bookmarkPage]);

  const handleRemovePage = () => {
    showAlerts({
      content: t('bookmark:remove.alert'),
      onConfirm: removePage.bind(null, id)
    });
  };

  const handleOpenPreview = () => {
    setPreviewOpen(true);
  };

  const handleOpenSendToPlatforms = () => {
    setSendToPlatformsOpen(true);
  };

  return (
    <>
      <Editor />
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <StyledTitle>{t('title')}</StyledTitle>
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center">
            {id && (
              <>
                <IconButton
                  tooltip={t('preview.tooltip')}
                  onClick={handleOpenPreview}
                >
                  <PreviewIcon />
                </IconButton>
                <IconButton
                  tooltip={t('sendToServices.tooltip')}
                  onClick={handleOpenSendToPlatforms}
                >
                  <CloudUploadOIcon />
                </IconButton>
              </>
            )}
            {!id ? (
              <IconButton
                tooltip={t('bookmark:add.tooltip')}
                onClick={bookmarkPage}
              >
                <BookmarkIcon />
              </IconButton>
            ) : (
              <IconButton
                color="red"
                tooltip={t('bookmark:remove.tooltip')}
                onClick={handleRemovePage}
              >
                <BookmarkIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
      <ScrollableList
        items={notes}
        renderItem={({ id, content, timestamp }) => (
          <NoteItem id={id} content={content} timestamp={timestamp} />
        )}
      />
      <Preview />
      <SendToServices />
    </>
  );
};

export default NotesView;
