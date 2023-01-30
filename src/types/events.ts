export interface EventProps<T = any> {
  callback: (...args: T[]) => void;
  listeners: Array<(event: T) => void>;
}
