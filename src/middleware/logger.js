export default function loggerMiddleware() {
  return next => action => {
    console.log(action); // eslint-disable-line no-console
    return next(action);
  };
}
