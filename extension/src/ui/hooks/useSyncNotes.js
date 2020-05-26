import { useEffect, useState, useRef } from 'react';
import { SyncFactory } from '../services/sync';

export default () => {
  const syncRef = useRef(null);
  const [hasNotes, setHasNotes] = useState(false);

  useEffect(() => {
    if (!syncRef.current) {
      syncRef.current = SyncFactory.getSyncService();
      const hasNotesToSync = syncRef.current.hasNotes();
      setHasNotes(hasNotesToSync);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncRef.current]);

  return syncRef.current
    ? {
        platform: syncRef.current.platform,
        hasNotesToSync: hasNotes,
        getNotesToSync: syncRef.current.getNotes.bind(syncRef.current)
      }
    : {};
};
