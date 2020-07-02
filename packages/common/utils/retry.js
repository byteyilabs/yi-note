export default (
  predicate,
  resolve,
  reject = () => {},
  maxTimes = 15,
  interval = 300
) => {
  if (predicate()) {
    resolve();
    return;
  }

  let counter = 0;
  let timer = window.setInterval(() => {
    if (counter++ >= maxTimes) {
      window.clearInterval(timer);
      reject();
    }

    if (predicate()) {
      resolve();
      window.clearInterval(timer);
    }
  }, interval);
};
