export default function falsify(func) {
  // should return a function that returns the opposite boolean value
  // of the given `func`
  // see falsify.test.js for test cases
  // return function (...args) {
  //   const f1 = func.bind(this);
  //   return !f1(...args);
  // };
  return function () {
    return !func.apply(this, arguments);
  };
}
