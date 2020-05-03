import { useEffect, useRef } from 'react';
import { useStoreState } from 'easy-peasy';
import { PlayerFactory } from '../services/player';

export default () => {
  const playerRef = useRef(null);
  const { url } = useStoreState(state => state.app);

  useEffect(() => {
    const loadPlayer = async () => {
      try {
        playerRef.current = await PlayerFactory.getPlayer();
      } catch (e) {
        logger.error(e);
        throw e;
      }
    };

    if (!playerRef.current) {
      loadPlayer();
    }
  }, [url]);

  return playerRef;
};
