<script setup lang="ts">
import { promisify } from "util";

class MyPromise {
  #result: any;
  #state: "pending" | "fulfilled" | "rejected";
  constructor(executor: Function) {
    this.#state = "pending";
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.#state !== "pending") return;
    this.#result = value;
    this.#state = "fulfilled";
  }

  reject(value) {
    if (this.#state !== "pending") return;
    this.#result = value;
    this.#state = "rejected";
  }

  then(onFulfilled, onRejected) {
    if (this.#state === "fulfilled") {
      onFulfilled(this.#result);
    }
    if (this.#state === "rejected") {
      onRejected(this.#result);
    }
  }
}

// MyPromise 的实例
const data = new MyPromise((resolve, reject) => {
  resolve("1");
});

data.then(
  (result) => {
    console.log("result", result);
  },
  () => {}
);

console.log("我应该是第一执行的");

//tips: 这是原生 Promise 类
new Promise(() => {
  console.log("我这里是同步代码");
});

// 原生 Promise
// new Promise((resolve) => {
//   resolve("1");
//   resolve("2");
//   resolve("3");
// }).then((result) => {
//   console.log("result", result);
// });
</script>
<template></template>
