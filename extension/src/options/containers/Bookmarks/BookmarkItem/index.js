import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import styled from 'styled-components';
import { Grid, IconButton, Tooltip, Checkbox } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { useTranslation } from 'react-i18next';

const StyledContainer = styled(Grid)`
  cursor: pointer;
  background-color: ${props => props.theme.palette.grey[100]};
`;

const StyledImg = styled.img`
  width: 120px;
  height: 90px;

  @media (max-width: 960px) {
    width: 352px;
    height: 240px;
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
  const { progress } = useStoreState(state => state.bookmarks.toolbar);
  const {
    bookmarks: { setBookmark, removeBookmark },
    alerts: { show: showAlerts }
  } = useStoreActions(actions => actions);

  const setSelect = () => {
    setBookmark({ id, selected: !selected });
  };

  const handleOpenPageDetail = () => {
    if (progress) {
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
      {image && (
        <Grid item md={2} sm={12}>
          <Grid container justify="center" alignItems="center">
            <StyledImg src={image} />
          </Grid>
        </Grid>
      )}
      <Grid item md={8} sm={12} container spacing={2} direction="column">
        <Grid item>
          <StyledTitle>{title}</StyledTitle>
        </Grid>
        <Grid item>
          <StyledDescription>{description}</StyledDescription>
        </Grid>
      </Grid>
      <Grid item md={2} sm={12}>
        {progress ? (
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
