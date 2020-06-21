import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Grid, Chip } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import PreviewIcon from '@material-ui/icons/FindInPageOutlined';
import CloudUploadOIcon from '@material-ui/icons/CloudUploadOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import SyncIcon from '@material-ui/icons/Sync';
import TagIcon from '@material-ui/icons/LocalOfferOutlined';
import IconButton from '../../../components/IconButton';
import { useSyncNotes, useLoadScreenshots } from '../../../hooks';

export const StyledIconContainer = styled(Grid)`
  padding-right: 5px;
`;

const Toolbar = () => {
  const { t } = useTranslation(['notesView', 'bookmark']);
  const { id } = useStoreState(state => state.page.data);
  const {
    videoNotes: {
      preview: { setOpen: setPreviewOpen },
      sendToServices: { setOpen: setSendToServicesOpen },
      share: { setOpen: setShareExtensionOpen }
    },
    page: { fetchPage, bookmarkPage, removePage, addTag, removeTag },
    alerts: { show: showAlerts },
    tagDialog: { setOpen: setTagDialogOpen }
  } = useStoreActions(actions => actions);
  const { platform, hasNotesToSync, getNotesToSync } = useSyncNotes();
  const { loading, loadScreenshots } = useLoadScreenshots();

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

  const handleOpenSendToServices = () => {
    setSendToServicesOpen(true);
  };

  const handleOpenShareExtension = () => {
    setShareExtensionOpen(true);
  };

  const handleSyncNotes = async () => {
    const notesToSync = await getNotesToSync();
    loadScreenshots(notesToSync);
  };

  return (
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
              tooltip={t('services:send.tooltip')}
              onClick={handleOpenSendToServices}
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
  );
};

export default Toolbar;
