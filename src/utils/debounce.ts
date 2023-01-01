/**
 *
 * @param fn 要被防抖的函数
 * @param delay  防抖的延迟时间
 * @param immediately 第一次的时候是否立即执行,默认为 true
 */

export function debounce(
  fn: Function,
  delay: number = 1000,
  immediately: boolean = true
) {
  let timerID: number = -1;
  return function () {
    if (timerID < 0 && immediately) {
      fn();
      timerID = 1;
      console.log("第一次执行不防抖");
      return;
    }
    if (timerID > 0) {
      console.log("我清除的 id 是", timerID);
      clearTimeout(timerID);
    }
    timerID = window.setTimeout(() => {
      fn();
    }, delay);
  };
}
