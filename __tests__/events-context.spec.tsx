import React, { useEffect, useState } from 'react';
import { act, render } from '@testing-library/react';

import { EventsProvider, useEvent, useEvents } from '../src';

const Component = () => {
  const [test, setTest] = useState('test1');
  const { createEvent } = useEvents();

  const handleChange = createEvent('changeText', (text: string) => {
    act(() => {
      setTest(text);
    });
  });

  useEvent('changeText', (text: string) => {
    act(() => {
      setTest(text + '2');
    });
  });

  useEffect(() => {
    setTimeout(() => {
      handleChange('batata');
    }, 1000);
  }, []);

  return <div>{test}</div>;
};

describe('EventsContext', () => {
  it('should trigger event', (done) => {
    const { getByText } = render(
      <EventsProvider>
        <Component />
      </EventsProvider>
    );

    expect(getByText('test1')).toBeInTheDocument();

    setTimeout(() => {
      expect(getByText('batata2')).toBeInTheDocument();
      done();
    }, 3000);
  });
});
