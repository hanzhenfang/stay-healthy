import { sign } from "crypto";
import { setUncaughtExceptionCaptureCallback } from "process";

export {};

// ruduce 接受四个参数
// 1. 上一次的值（或者说初始值）
// 2. 当前正在处理的值（也就是说当有初始值的时候，它是数组的第1个元素,没有初始值的时候，它是元素第二个参数）
// 3. 第三个是当前处理元素的 索引值
// 4. 第四个参数是数组本身

function reduce<T>(fn: (...arg: any) => any, arr: Array<T>, initialValue?: T) {
  const haveInit = !!initialValue;
  const initValue = haveInit ? initialValue : arr[0];
  if (arr.length === 1) return initValue;
  let privious = initValue;

  for (let i = haveInit ? 0 : 1; i < arr.length; i++) {
    privious = fn(privious, arr[i]);
  }
  const result = privious;
  return result;
}
