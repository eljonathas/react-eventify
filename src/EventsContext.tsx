import React, {
  useRef,
  createContext,
  PropsWithChildren,
  useEffect,
  DependencyList,
} from 'react';

import { EventProps } from './types/events';
import { EventAction, EventsContextProps } from './types/context';

export const EventsContext = createContext({} as unknown as EventsContextProps);

export function EventsProvider({ children }: PropsWithChildren) {
  const events = useRef<Map<string, EventProps>>(new Map());

  function triggerEvent<T>(eventName: string, event?: T) {
    const currentEvent = events.current.get(eventName);

    if (currentEvent) {
      currentEvent.action(event);
      currentEvent.listeners.forEach((l) => l(event));
    } else {
      console.warn(`Event ${eventName} does not exist`);
    }
  }

  function registerEvent<T>(
    eventName: string,
    action: EventAction<T>,
    deps: DependencyList = []
  ) {
    useEffect(() => {
      createEvent(eventName, action);

      return () => {
        removeEvent(eventName);
      };
    }, deps);

    return (args: T) => {
      triggerEvent(eventName, args);
    };
  }

  function createEvent<T>(eventName: string, action: EventAction<T>) {
    const props = {
      action,
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

  const addEventListener = (
    eventName: string,
    callback: (event: any) => any
  ) => {
    const event = events.current.get(eventName);

    if (event) {
      event.listeners.push(callback);
    }
  };

  const removeEventListener = (
    eventName: string,
    callback?: (event: any) => void
  ) => {
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
        addEventListener,
        removeEventListener,
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
