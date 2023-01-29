export interface EventProps<T = any> {
  name: string;
  callback: (...args: any[]) => void;
  listeners: Array<(event: T) => void>;
}
