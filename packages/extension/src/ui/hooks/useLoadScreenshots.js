import { useState, useCallback } from 'react';
import { useStoreActions } from 'easy-peasy';
import { delay } from '@yi-note/common/utils';
import usePlayer from './usePlayer';
import { takeScreenshot } from '../utils';

export default () => {
  const [loading, setLoading] = useState(false);
  const { saveNote } = useStoreActions(actions => actions.page);
  const playerRef = usePlayer();

  const loadScreenshots = useCallback(
    async (notes, forceLoad = false) => {
      setLoading(true);
      const player = playerRef.current;
      const currentTime = await player.getCurrentTime();
      const videoEl = player.getVideoElement();
      // Take screenshots
      for (const note of notes) {
        if (note.image && !forceLoad) {
          continue;
        }
        player.seek(note.timestamp);
        await delay(500);
        note.image = await takeScreenshot(videoEl);
        saveNote(note);
      }
      // Resume back to start time and pause video
      player.seek(currentTime);
      playerRef.current.pause();
      setLoading(false);
    },
    [playerRef, saveNote]
  );

  return { loading, loadScreenshots };
};
