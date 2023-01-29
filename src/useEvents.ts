import { useContext } from 'react';
import { EventsContext } from './types/EventsContext';

export function useEvents() {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error('useEvents must be used within a EventsProvider');
  }

  return context;
}
