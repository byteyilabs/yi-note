import React from 'react';
import PropTypes from 'prop-types';
import { useStoreActions } from 'easy-peasy';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import TextButton from '../../../../components/TextButton';
import { usePlayer } from '../../../../hooks';
import { secondsToTime } from '../../../../../common/utils';
import Markdown from '../../../../../common/services/markdown';

const StyledNote = styled.div`
  white-space: pre;
  word-wrap: break-word;
  word-break: break-all;

  @media (min-width: 960px) {
    width: 250px;
  }
`;

const NoteItem = ({ content, timestamp, image }) => {
  const playerRef = usePlayer();
  const { setOpen } = useStoreActions(actions => actions.videoNotes.preview);

  const handlePlayNote = () => {
    const player = playerRef.current;
    player.seek(timestamp);
    player.play();
    setOpen(false);
  };

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item>
        <Grid container>
          {image && (
            <img src={image} width="426" height="240" alt="Screenshot" />
          )}
        </Grid>
      </Grid>
      <Grid item>
        <TextButton onClick={handlePlayNote}>
          {secondsToTime(timestamp)}
        </TextButton>
        <StyledNote>{Markdown.toText(content)}</StyledNote>
      </Grid>
    </Grid>
  );
};

NoteItem.propTypes = {
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  image: PropTypes.string
};

export default NoteItem;
