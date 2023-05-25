# react-eventify

react-eventify is a lightweight and easy-to-use event library for React applications. It provides a simple way to manage events in a centralized manner and ensures that components can communicate with each other efficiently.

## Installation

To install react-eventify, simply run the following command:

### npm

```bash
npm install react-eventify
```

### yarn

```bash
yarn add react-eventify
```

## Usage

To use react-eventify in your React application, you need to import the EventsProvider component and wrap your root component with it.

```jsx
import { EventsProvider } from 'react-eventify';

const App = () => {
  return (
    <EventsProvider>
      <div>My App</div>
    </EventsProvider>
  );
};
```

Once you done that, you can use the `useEvent` hook to subscribe to events and the `registerEvent` function to create events directly in component scope. Otherwise, you can manually create events using the `createEvent` function and remove them using the `removeEvent` function inside the `useEffect` hook. Also, you can use the `triggerEvent` function to trigger registered events.

```jsx
import { useEvent, registerEvent, triggerEvent } from 'react-eventify';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  const increment = registerEvent('increment', () => {
    setCount(count + 1);
  });

  // also you can create events inside useEffect
  // useEffect(() => {
  //   createEvent('increment', () => {
  //     setCount(count + 1);
  //   });

  //   return () => {
  //     removeEvent('increment');
  //   };
  // }, []);

  useEvent('increment', () => {
    console.log('Incremented!');
  });

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => triggerEvent('increment', null)}>Increment</button>
    </div>
  );
};
```

If you want to remove previously registered events, you can use the `removeEvent` function.

```jsx
import { useEvents } from 'react-eventify';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  const { createEvent, removeEvent } = useEvents();

  const increment = () => {
    setCount(count + 1);
  });

  useEvent('increment', () => {
    console.log('Incremented!');
  });

  useEffect(() => {
    createEvent('increment', increment);

    return () => {
      removeEvent('increment');
    };
  }, []

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => triggerEvent('increment', null)}>Increment</button>
      <button onClick={() => removeEvent('increment')}>Remove Increment</button>
    </div>
  );
};
```

> Note: Events cannot be created with the same name. If you try to create an event with the same name, it will override the previous event.

## API

### `EventsProvider`

The `EventsProvider` component is used to wrap the root component of your application. It is used to provide the context to the `useEvent` and `createEvent` hooks.

### `createEvent(eventName, callback)`

The `createEvent` function is used to create events. It takes two arguments: `eventName` and `callback`. The `eventName` is the name of the event and the `callback` is the function that will be executed when the event is triggered.

### `registerEvent(eventName, callback, deps)`

The `registerEvent` is the combination of the `createEvent` and `removeEvent` functions inside the `useEffect` hook to avoid recreating the event on every render when use it in component scope. It takes three arguments: `eventName`, `callback` and the optional `deps`. The `eventName` is the name of the event, the `callback` is the function that will be executed when the event is triggered and the `deps` is the dependency list of useEffect that causes the remotion and creation of the event every when these values changes. We strongly recommend using this method when you want to wrap functions inside the component scope to register events about them.

### `useEvent(eventName, callback)`

The `useEvent` hook is used to subscribe to events. It takes two arguments: `eventName` and `callback`. The `eventName` is the name of the event and the `callback` is the function that will be executed when the event is triggered.

### `triggerEvent(eventName, event)`

The `triggerEvent` function is used to trigger registered events. It takes two arguments: `eventName` and `event`. The `eventName` is the name of the event and the `event` is the event object that will be passed to the callback function.

### `removeEvent(eventName)`

The `removeEvent` function is used to remove previously registered events. It takes one argument: `eventName`. The `eventName` is the name of the event.

## License

react-eventify is MIT licensed.

## Contribute

Feel free to open an issue or a pull request if you have any suggestions or found a bug.

## Conclusion

react-eventify is a simple and efficient way to manage events in your React application. It provides a centralized way to communicate between components and helps keep your code organized and maintainable.
