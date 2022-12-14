export {};

class MyPromise {
  constructor(executor: Function) {
    executor(this.resolve, this.reject);
  }

  resolve(value) {
    console.log("我是手写的 resolve 传递的数据是", value);
  }

  reject() {}
}

// MyPromise 的实例
const data = new MyPromise((resolve, reject) => {
  resolve("韩振方");
});

// 原生 Promise
new Promise((resolve, reject) => {
  resolve("我是原生 resolve");
});
