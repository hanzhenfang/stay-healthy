export function debounce(fn: Function) {
  let timeID: number = 0;

  
  return function () {
    if (timeID) {
      clearTimeout(timeID);
    }

    timeID = setTimeout(() => {
      fn();
    }, 1200);
  };
}
