import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import styled from 'styled-components';
import { Grid, IconButton, Tooltip, Checkbox } from '@material-ui/core';
import {
  OpenInNew as OpenInNewIcon,
  DeleteOutlineOutlined as DeleteIcon
} from '@material-ui/icons';

const StyledContainer = styled(Grid)`
  cursor: pointer;
  background-color: ${props => props.theme.palette.grey[100]};
`;

const StyledImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #b6d2e0;

  width: 120px;
  height: 90px;
  @media (max-width: 960px) {
    width: 352px;
    height: 240px;
  }

  & img {
    width: 100%;
    height: 100%;
  }
`;

const StyledTitle = styled.div`
  font-weight: 500;
`;

const StyledDescription = styled.div`
  font-size: 0.8em;
  color: grey;
`;

const BookmarkItem = ({ id, title, description, url, image, selected }) => {
  const { t } = useTranslation(['bookmark', 'options']);
  const history = useHistory();
  const { exporting } = useStoreState(state => state.bookmarks.toolbar);
  const {
    bookmarks: { setBookmark, removeBookmark },
    alerts: { show: showAlerts }
  } = useStoreActions(actions => actions);

  const setSelect = () => {
    setBookmark({ id, selected: !selected });
  };

  const handleOpenPageDetail = () => {
    if (exporting) {
      setSelect();
      return;
    }
    history.push(`/pages/${id}`);
  };

  const handleOpenPageInNewTab = e => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  const handleDelete = e => {
    e.stopPropagation();
    showAlerts({
      content: t('remove.alert'),
      onConfirm: removeBookmark.bind(null, id)
    });
  };

  return (
    <StyledContainer
      container
      direction="row"
      spacing={1}
      onClick={handleOpenPageDetail}
    >
      <Grid item md={2} sm={12}>
        <Grid container justify="center" alignItems="center">
          <StyledImgContainer src={image}>
            {image ? <img src={image} /> : <div>{t('options:appName')}</div>}
          </StyledImgContainer>
        </Grid>
      </Grid>
      <Grid item md={8} sm={12} container spacing={2} direction="column">
        <Grid item>
          <StyledTitle>{title}</StyledTitle>
        </Grid>
        <Grid item>
          <StyledDescription>{description}</StyledDescription>
        </Grid>
      </Grid>
      <Grid item md={2} sm={12}>
        {exporting ? (
          <Checkbox checked={!!selected} onChange={setSelect} />
        ) : (
          <>
            <Tooltip title={t('open.tooltip')}>
              <IconButton onClick={handleOpenPageInNewTab}>
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('remove.tooltip')}>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Grid>
    </StyledContainer>
  );
};

BookmarkItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  selected: PropTypes.bool
};

export default BookmarkItem;
