export function throttle(
  fn: Function,
  interval: number = 1000,
  immediately = true
) {
  let CD: boolean = false;
  return function () {
    if (immediately) {
      fn();
      immediately = false;
      return;
    }
    if (CD) {
      console.log("不行，在 CD");
      return;
    }
    CD = true;
    setTimeout(() => {
      fn();
      CD = false;
    }, interval);
  };
}
