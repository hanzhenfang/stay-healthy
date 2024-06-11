import { rejects } from "assert";

export async function sleep(delay: number) {
  return new Promise((res, reject) => {
    setTimeout(() => {
      console.log("结束");
      res(true);
    }, delay);
  });
}

export function f_reactive(obj: [] | Object) {
  return new Proxy(obj, {
    get(target, key) {
      console.log("target", target);
      console.log("获取元素的值为", key);
      return target[key];
    },
    set(target, key, newValue) {
      target[key] = newValue;
      return true;
    },
  });
}
