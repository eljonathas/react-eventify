import React, { useCallback, useRef } from 'react';
import { createContext, PropsWithChildren } from 'react';
import { EventProps } from './events';
import { EventAction, EventsContextProps } from './context';

export const EventsContext = createContext({} as unknown as EventsContextProps);

export function EventsProvider({ children }: PropsWithChildren) {
  const events = useRef<EventProps[]>([]);

  function triggerEvent<T>(eventName: string, event: T) {
    const eventIndex = events.current.findIndex((e) => e.name === eventName);

    if (eventIndex !== -1) {
      events.current[eventIndex].callback(event);
      events.current[eventIndex].listeners.forEach((l) => l(event));
    }
  }

  function createEvent<T>(eventName: string, action: EventAction<T>) {
    const eventIndex = events.current.findIndex((e) => e.name === eventName);

    const newEvent = {
      name: eventName,
      callback: action,
      listeners: [],
    };

    if (eventIndex === -1) {
      events.current.push(newEvent);
    } else {
      events.current[eventIndex] = newEvent;
    }

    return (...args: T[]) => {
      triggerEvent(eventName, args);
    };
  }

  function removeEvent(eventName: string) {
    events.current = events.current.filter((e) => e.name !== eventName);
  }

  const startListener = useCallback(
    (eventName: string, callback: (...args: any[]) => any) => {
      const eventIndex = events.current.findIndex((e) => e.name === eventName);

      if (eventIndex !== -1) {
        events.current[eventIndex].listeners.push(callback);
      }
    },
    []
  );

  const stopListener = useCallback(
    (eventName: string, callback: (event: any) => void) => {
      const eventIndex = events.current.findIndex((e) => e.name === eventName);

      if (eventIndex !== -1) {
        events.current[eventIndex].listeners = events.current[
          eventIndex
        ].listeners.filter((l) => l !== callback);
      }
    },
    []
  );

  return (
    <EventsContext.Provider
      value={{
        startListener,
        stopListener,
        createEvent,
        removeEvent,
        triggerEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
