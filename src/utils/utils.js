// custom throttle function to run the function after specified time if triggered multiple times during a specified time
// we use the variable isTimerPaused, on first click it enters the if condition as it is false, then it will skip for the
// specified time because the setTimeout will be in the callback queue and will not be able to update the isTimerPaused to false until the specified time
export const throttle = (func, delay = 1000) => {
  let isTimerPaused = false;
  return (...args) => {
    if (!isTimerPaused) {
      func.apply(this, args);
      isTimerPaused = true;
      setTimeout(() => {
        isTimerPaused = false;
      }, delay);
    }
  };
};

// custom debounce
export const debounce = (func, delay = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
