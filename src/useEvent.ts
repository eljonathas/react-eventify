import { useEffect } from 'react';
import { useEvents } from './useEvents';

/**
 * Create an event listener that will be called when the event is triggered.
 * @param eventName the name of the event
 * @param callback the callback function
 *
 * **Note**: Recommended to use this like useEffect hook inside component: `useEvent('click', (event) => console.log(event));`
 */
export function useEvent<T>(eventName: string, callback: (event: T) => void) {
  const { addEventListener, removeEventListener } = useEvents();

  useEffect(() => {
    addEventListener(eventName, callback);

    return () => {
      removeEventListener(eventName, callback);
    };
  }, [eventName, callback, addEventListener, removeEventListener]);
}
