import { findValue } from "../src";

const numArray = [1, 2, 3];

describe("findValue", () => {
  test("Throws if non-array passed", () => {
    expect(() => {
      // @ts-ignore
      findValue(null);
    }).toThrowError("Input must be an array");
  });
  test("Throws if non-function passed as callback", () => {
    expect(() => {
      findValue([], null);
    }).toThrowError("Callback must be a function");
  });
  test("It returns return value of the callback", () => {
    expect(
      findValue(numArray, (n, i) => n % 2 === 0 && `even number on index ${i}`)
    ).toBe("even number on index 1");
  });
  test("It works for objects", () => {
    const object = {
      key: "value",
      cat: "meow",
    };
    expect(
      findValue(object, ([k, v], i) => k === "cat" && `${v} at ${i}`)
    ).toBe("meow at 1");
  });
  test("It returns undefined if value not found", () => {
    expect(findValue(numArray, (n) => n === 55 && "this shouldn't show")).toBe(
      undefined
    );
  });
  test("It returns defaultValue if specified", () => {
    expect(
      findValue(numArray, (n) => n === 55 && "this shouldn't show", {
        defaultValue: "fallback",
      })
    ).toBe("fallback");
  });
  test("Binds on thisArg", () => {
    const array = ["no", "some name"];
    const object = {
      name: "some name",
    };
    function finder(value) {
      if (value === this.name) {
        return `found ${this.name}`;
      }
    }
    expect(findValue(array, finder, { thisArg: object })).toBe(
      "found some name"
    );
  });
});
