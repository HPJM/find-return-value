# `findValue`

This is a JS array util that augments the functionality of the existing array helpers. It works in a similar manner to `Array.prototype.find`, except that instead of returning the first value that meets the predicate, it returns the first truthy return value of the callback. This is useful if an additional processing step needs to be done once the value has been found, or if a completely different value needs to be returned for whatever reason.

## Usage

```js
import { findValue } from "find-return-value";

const array = ["dog", "cat", "whale"];

findValue(array, (animal, index) => {
  if (animal === "cat") {
    return "A cat has been found at " + index;
  }
});
```

For flexibility, it also works on plain objects, where the element passed is a key-value pair:

```js
import { findValue } from "find-return-value";

const object = { truthy: 1, falsy: 0 };

findValue(object, ([key, value]) => {
  if (value) {
    return key;
  }
});
```

## Reference

```js
findValue(arrayOrObject, callback, thisArg, defaultValue);
```

- `arrayOrObject: T[]` - the array or object to iterate over
- `callback(value: T, index: number, array: T[] | [string, any][])` - this callback is invoked for each element in the array (or key-value pair in the object) being passed the current value (or pair), the index, and the array i.e. the same signature as the other array methods
- `thisArg?` - specify the object to bind to
- `defaultValue?` - if callback does not return a truthy result for any element, then this value is returned
