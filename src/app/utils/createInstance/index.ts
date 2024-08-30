type Constructor<T> = new () => T;

export function getInstance<T>(Class: Constructor<T>): T {
  return new Class();
}
