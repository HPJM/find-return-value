import { Opts, Callback, GenericObject } from "./types";

const isObject = <T>(val: T) =>
  val && Object.prototype.toString.apply(val) === "[object Object]";

const iterate = <T, U, V>(
  collection: T[] | [string, any][],
  callback: Callback<T, U>,
  defaultValue?: V,
  thisArg?: any
): U | V => {
  for (let i = 0; i < collection.length; i++) {
    const value: U = callback.call(thisArg, collection[i], i, collection);
    if (value) {
      return value;
    }
  }
  return defaultValue;
};

export const findValue = <T, U, V>(
  collection: T[] | GenericObject,
  callback: Callback<T, U>,
  { thisArg, defaultValue }: Opts<V> = {}
): U | V => {
  const isArray = Array.isArray(collection);
  const isObj = !isArray && isObject(collection);
  if (!isArray && !isObj) {
    throw new Error("Input must be an array or plain object");
  }
  if (typeof callback !== "function") {
    throw new Error("Callback must be a function");
  }
  const asArray = isArray
    ? (collection as T[])
    : Object.entries(collection as GenericObject);

  return iterate<T, U, V>(asArray, callback, defaultValue, thisArg);
};
