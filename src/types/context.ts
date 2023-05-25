export type EventAction<T = any> = (...args: T[]) => void;

export type EventsContextProps = {
  /**
   * Use this method to create an event.
   * @param eventName - the name of the event.
   * @param action - the action to be called when the event is triggered.
   *
   * **Note**: Recommended to use this inside useEffect hook to avoid memory leaks.
   */
  createEvent<T = any>(
    eventName: string,
    action: EventAction<T>
  ): (...args: T[]) => void;
  /**
   * Use this method to remove an event.
   * @param eventName - the name of the event.
   *
   * **Note:** Recommended to use this inside useEffect return function to remove the event when the component is unmounted.
   */
  removeEvent: (eventName: string) => void;
  /**
   * Use this method to register an event. It returns a function that can be used to trigger the event.
   * @param eventName the name of the event
   * @param action the action to be called when the event is triggered
   * @returns a function that can be used to trigger the event
   *
   * **Note:** This method is a combination of `createEvent` and `registerEvent`.
   * `const click = registerEvent('click', (event) => console.log(event));`
   */
  registerEvent<T = any>(
    eventName: string,
    action: EventAction<T>
  ): (...args: T[]) => void;
  /**
   * Use this method to add an event listener that will be called when the event is triggered.
   * @param eventName the name of the event
   * @param callback the callback function
   *
   * **Note:** Recommended to use this inside useEffect hook to avoid memory leaks.
   */
  addEventListener<T>(eventName: string, callback: (event: T) => void): void;
  /**
   * Use this method to remove an event listener. If the callback is not provided, all listeners for the event will be removed.
   * @param eventName the name of the event
   * @param callback the callback function
   *
   * **Note:** Recommended to use this inside useEffect return function.
   */
  removeEventListener<T>(
    eventName: string,
    callback?: (event: T) => void
  ): void;
  /**
   * Use this method to trigger an event. All listeners for the event will be called with the event parameter provided.
   * @param eventName the name of the event
   * @param event the event parameter to be passed to the listeners and the action
   */
  triggerEvent<T>(eventName: string, event?: T): void;
};
