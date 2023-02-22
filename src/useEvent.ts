import { useEffect } from 'react';
import { useEvents } from './useEvents';

export function useEvent<T>(eventName: string, callback: (event: T) => void) {
  const { addEventListener, removeEventListener } = useEvents();

  useEffect(() => {
    addEventListener(eventName, callback);

    return () => {
      removeEventListener(eventName, callback);
    };
  }, [eventName, callback, addEventListener, removeEventListener]);
}
