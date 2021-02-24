export interface GenericObject {
  [key: string]: any;
}

export type Callback<T, U> = (
  value: T & [string, any],
  index: number,
  array: T[] & [string, any][],
  thisArg?: any
) => U;

export interface Opts<V> {
  thisArg?: any;
  defaultValue?: V;
}
