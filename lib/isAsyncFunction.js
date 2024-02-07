export function isAsyncFunction(func) {
  if (!(func instanceof Function))
    throw new TypeError(`The parameter is not a function is: ${typeof func}`);
  return func.constructor.name === "AsyncFunction";
}
