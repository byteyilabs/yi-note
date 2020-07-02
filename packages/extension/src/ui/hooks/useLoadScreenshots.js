import { useState, useCallback } from 'react';
import { useStoreActions } from 'easy-peasy';
import { delay } from '@yi-note/common/utils';
import { takeScreenshot } from '../utils';
import { PlayerFactory } from '../services/player';

export default () => {
  const [loading, setLoading] = useState(false);
  const { saveNote } = useStoreActions(actions => actions.page);

  const loadScreenshots = useCallback(
    async (notes, forceLoad = false) => {
      setLoading(true);
      const player = await PlayerFactory.getPlayer();
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
      player.pause();
      setLoading(false);
    },
    [saveNote]
  );

  return { loading, loadScreenshots };
};
