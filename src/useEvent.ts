import { useEffect } from 'react';
import { useEvents } from './useEvents';

export function useEvent<T>(eventName: string, callback: (event: T) => void) {
  const { startListener, stopListener } = useEvents();

  useEffect(() => {
    startListener(eventName, callback);

    return () => {
      stopListener(eventName, callback);
    };
  }, [eventName, callback, startListener, stopListener]);
}
