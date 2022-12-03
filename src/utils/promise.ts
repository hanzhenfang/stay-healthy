class MyPromise {
  #result: any;
  #state: "pending" | "fulfilled" | "rejected";
  #callBack: Function | undefined;
  constructor(executor: (resolve: Function, reject: Function) => void) {
    this.#state = "pending";
    executor(this.#resolve.bind(this), this.#reject.bind(this));
  }
  // 设置私有属性 resolve reject ，使之不允许被实例调用
  #resolve(_value: any) {
    if (this.#state !== "pending") return;
    this.#result = _value;
    this.#state = "fulfilled";
    queueMicrotask(() => {
      this.#callBack?.(this.#result);
    });
  }
  #reject(_value: any) {
    if (this.#state !== "pending") return;
    this.#result = _value;
    this.#state = "rejected";
  }

  then(onFulfilled: Function, onRejected?: Function) {
    if (this.#state === "pending") {
      this.#callBack = onFulfilled;
    } else if (this.#state === "fulfilled") {
      queueMicrotask(() => {
        onFulfilled(this.#result);
      });
    }
  }
}

const mp = new MyPromise((resovle, reject) => {
  setTimeout(() => {
    resovle("我成功执行");
  }, 1000);
});

mp.then(
  (res: any) => {
    console.log("我是 resolve 的返回值", res);
  },
  (res: any) => {
    console.log("我是 rejected 的返回值", res);
  }
);

mp.then((res) => {
  console.log("res2222222222", res);
});
export default MyPromise;
