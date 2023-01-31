import React, {
  useRef,
  createContext,
  PropsWithChildren,
  useEffect,
} from 'react';

import { EventProps } from './types/events';
import { EventAction, EventsContextProps } from './types/context';

export const EventsContext = createContext({} as unknown as EventsContextProps);

export function EventsProvider({ children }: PropsWithChildren) {
  const events = useRef<Map<string, EventProps>>(new Map());

  function triggerEvent<T>(eventName: string, event: T) {
    const currentEvent = events.current.get(eventName);

    if (currentEvent) {
      currentEvent.callback(event);
      currentEvent.listeners.forEach((l) => l(event));
    } else {
      throw new Error(`Event ${eventName} not found`);
    }
  }

  function registerEvent<T>(eventName: string, action: EventAction<T>) {
    useEffect(() => {
      createEvent(eventName, action);

      return () => {
        removeEvent(eventName);
      };
    }, []);

    return (...args: T[]) => {
      triggerEvent(eventName, args);
    };
  }

  function createEvent<T>(eventName: string, action: EventAction<T>) {
    const props = {
      callback: action,
      listeners: [],
    };

    events.current.set(eventName, props);

    return (...args: T[]) => {
      triggerEvent(eventName, args);
    };
  }

  function removeEvent(eventName: string) {
    events.current.delete(eventName);
  }

  const startListener = (eventName: string, callback: (event: any) => any) => {
    const event = events.current.get(eventName);

    if (event) {
      event.listeners.push(callback);
    }
  };

  const stopListener = (eventName: string, callback?: (event: any) => void) => {
    const event = events.current.get(eventName);

    if (event) {
      if (!callback) {
        event.listeners = [];
      } else {
        event.listeners = event.listeners.filter((l) => l !== callback);
      }
    }
  };

  return (
    <EventsContext.Provider
      value={{
        startListener,
        stopListener,
        createEvent,
        removeEvent,
        triggerEvent,
        registerEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
