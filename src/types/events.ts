export interface EventProps<T = any> {
  action: (...args: T[]) => void;
  listeners: Array<(event: T) => void>;
}
