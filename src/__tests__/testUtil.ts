export const sleep = (timeout?: number) => {
  return new Promise<void>(resolve => {
    if (timeout) {
      setTimeout(() => resolve(), timeout);
    } else {
      setImmediate(() => resolve());
    }
  });
};
