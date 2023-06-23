export {};
function throttle(
  fn: (par: any) => any,
  delay: number = 1000,
  immediately: boolean = true
) {
  let CD: Boolean = false;
  return function (this: any, ...arg: any) {
    if (!CD && immediately) {
      fn.apply(this, arg);
    }
  };
}
