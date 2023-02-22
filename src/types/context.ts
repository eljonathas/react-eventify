export type EventAction<T = any> = (...args: T[]) => void;

export type EventsContextProps = {
  createEvent<T = any>(
    eventName: string,
    action: EventAction<T>
  ): (...args: T[]) => void;
  removeEvent: (eventName: string) => void;
  registerEvent<T = any>(
    eventName: string,
    action: EventAction<T>
  ): (...args: T[]) => void;
  addEventListener<T>(eventName: string, callback: (event: T) => void): void;
  removeEventListener<T>(
    eventName: string,
    callback?: (event: T) => void
  ): void;
  triggerEvent<T>(eventName: string, event: T): void;
};
