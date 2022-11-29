export function debounce(fn: Function) {
  let timeID: number = 0;
  console.log("debounce外的timeID", timeID);
  return function () {
    if (timeID) {
      console.log("上一次的timeID", timeID);
      clearTimeout(timeID);
    }

    timeID = setTimeout(() => {
      fn();
    }, 3000);
  };
}
