import React, { useEffect, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid, Chip } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import PreviewIcon from '@material-ui/icons/FindInPageOutlined';
import CloudUploadOIcon from '@material-ui/icons/CloudUploadOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import SyncIcon from '@material-ui/icons/Sync';
import TagIcon from '@material-ui/icons/LocalOfferOutlined';
import Preview from './Preview';
import SendToServices from './SendToServices';
import ShareExtension from './ShareExtension';
import NoteItem from './NoteItem';
import Editor from './Editor';
import IconButton from '../../components/IconButton';
import ScrollableList from '../../components/ScrollableList';
import Spinner from '../../components/Spinner';
import TagDialog from '../../../common/components/TagDialog';
import { generatePageId } from '../../../common/utils';
import { useSyncNotes, useLoadScreenshots } from '../../hooks';

export const StyledTitle = styled.div`
  font-weight: 500;
`;

export const StyledIconContainer = styled(Grid)`
  padding-right: 5px;
`;

const NotesView = () => {
  const { t } = useTranslation(['notesView', 'bookmark']);
  const {
    videoNotes: {
      page: { id, notes, meta, tags }
    },
    app: { url }
  } = useStoreState(state => state);
  const {
    videoNotes: {
      fetchPage,
      bookmarkPage,
      removePage,
      addTag,
      removeTag,
      preview: { setOpen: setPreviewOpen },
      sendToPlatforms: { setOpen: setSendToPlatformsOpen },
      share: { setOpen: setShareExtensionOpen }
    },
    alerts: { show: showAlerts },
    tagDialog: { setOpen: setTagDialogOpen }
  } = useStoreActions(actions => actions);
  const tryLoadMeta = useRef(false);
  const { platform, hasNotesToSync, getNotesToSync } = useSyncNotes();
  const { loading, loadScreenshots } = useLoadScreenshots();

  useEffect(() => {
    if (!id) {
      const pageId = generatePageId(url);
      fetchPage(pageId);
    } else if (
      (!meta || !meta.description || !meta.image) &&
      !tryLoadMeta.current
    ) {
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

  const handleOpenTagDialog = () => {
    setTagDialogOpen(true);
  };

  const handleOpenPreview = () => {
    setPreviewOpen(true);
  };

  const handleOpenSendToPlatforms = () => {
    setSendToPlatformsOpen(true);
  };

  const handleOpenShareExtension = () => {
    setShareExtensionOpen(true);
  };

  const handleSyncNotes = async () => {
    const notesToSync = await getNotesToSync();
    loadScreenshots(notesToSync);
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
            {!id ? (
              <StyledIconContainer item>
                <IconButton
                  tooltip={t('bookmark:add.tooltip')}
                  onClick={bookmarkPage}
                >
                  <BookmarkIcon />
                </IconButton>
              </StyledIconContainer>
            ) : (
              <StyledIconContainer item>
                <IconButton
                  color="red"
                  tooltip={t('bookmark:remove.tooltip')}
                  onClick={handleRemovePage}
                >
                  <BookmarkIcon />
                </IconButton>
              </StyledIconContainer>
            )}
            {hasNotesToSync && (
              <StyledIconContainer item>
                <IconButton
                  tooltip={t('sync.tooltip', { platform })}
                  onClick={handleSyncNotes}
                >
                  <SyncIcon />
                </IconButton>
              </StyledIconContainer>
            )}
            {id && (
              <>
                <StyledIconContainer item>
                  <IconButton
                    tooltip={t('tag.tooltip')}
                    onClick={handleOpenTagDialog}
                  >
                    <TagIcon />
                  </IconButton>
                </StyledIconContainer>
                <StyledIconContainer item>
                  <IconButton
                    tooltip={t('preview.tooltip')}
                    onClick={handleOpenPreview}
                  >
                    <PreviewIcon />
                  </IconButton>
                </StyledIconContainer>
                <StyledIconContainer item>
                  <IconButton
                    tooltip={t('sendToServices.tooltip')}
                    onClick={handleOpenSendToPlatforms}
                  >
                    <CloudUploadOIcon />
                  </IconButton>
                </StyledIconContainer>
              </>
            )}
            <StyledIconContainer item>
              <IconButton
                tooltip={t('share.tooltip')}
                onClick={handleOpenShareExtension}
              >
                <ShareIcon />
              </IconButton>
            </StyledIconContainer>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {tags.map(tag => (
          <Grid item key={tag}>
            <Chip label={tag} color="default" />
          </Grid>
        ))}
      </Grid>
      {loading ? (
        <Spinner />
      ) : (
        <ScrollableList
          items={notes}
          renderItem={({ id, content, timestamp }) => (
            <NoteItem id={id} content={content} timestamp={timestamp} />
          )}
        />
      )}
      <Preview />
      <SendToServices />
      <ShareExtension />
      <TagDialog tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
    </>
  );
};

export default NotesView;
