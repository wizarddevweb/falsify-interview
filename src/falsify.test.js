import falsify from "./falsify";

describe("function", () => {
  // example function to be falsified
  function isMultipleOf4(num) {
    return num % 4 === 0;
  }

  // example of a falsified function
  const isNotMultipleOf4 = falsify(isMultipleOf4);

  test("return type is a new function", () => {
    expect(typeof isNotMultipleOf4).toEqual("function");
    expect(isNotMultipleOf4).not.toBe(isMultipleOf4);
  });

  test("returns expected boolean values", () => {
    expect(isNotMultipleOf4(1)).toBe(true);
    expect(isNotMultipleOf4(8)).toBe(false);
  });

  test("returns opposite of wrapped function", () => {
    expect(isNotMultipleOf4(1)).not.toEqual(isMultipleOf4(1));
    expect(isNotMultipleOf4(4)).not.toEqual(isMultipleOf4(4));
  });

  function isBetween(num, min, max) {
    return num > min && num < max;
  }
  const isOutside = falsify(isBetween);

  test("works with multiple params", () => {
    expect(isOutside(20, 1, 10)).toBe(true);
    expect(isOutside(5, 1, 10)).toBe(false);
  });
});

// This is a bonus condition. In order to work as a method,
// this wrapper function must preserve context.
describe("method", () => {
  const user = {
    age: 21,
    isAdult() {
      return this.age >= 18;
    }
  };

  user.isNotAdult = falsify(user.isAdult);

  test("works as a method", () => {
    expect(user.isNotAdult()).not.toEqual(user.isAdult());
  });

  test("works on dynamic context", () => {
    expect(user.isNotAdult()).toBe(false);

    const newUser = { ...user, age: 16 };
    expect(newUser.isNotAdult()).toBe(true);
  });
});
