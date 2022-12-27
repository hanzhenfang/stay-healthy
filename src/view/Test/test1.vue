<script setup lang="ts">
import { onMounted } from "vue";
// class MyPromise {
//   #result: any;
//   #state: "pending" | "fulfilled" | "rejected";
//   #callBackFnArray: Array<any>;
//   constructor(executor: Function) {
//     this.#callBackFnArray = [];
//     this.#state = "pending";
//     executor(this.resolve.bind(this), this.reject.bind(this));
//   }

//   resolve(value) {
//     if (this.#state !== "pending") return;
//     this.#result = value;
//     this.#state = "fulfilled";

//     if (this.#callBackFnArray.length > 0) {
//       queueMicrotask(() => {
//         this.#callBackFnArray.forEach((onFulfilled) => {
//           onFulfilled();
//         });
//       });
//     } else {
//       return;
//     }
//   }

//   reject(value) {
//     if (this.#state !== "pending") return;
//     this.#result = value;
//     this.#state = "rejected";
//   }

//   then(onFulfilled, onRejected?) {
//     return new MyPromise((resolve, reject) => {
//       if (this.#state === "pending") {
//         this.#callBackFnArray.push(() => {
//           resolve(onFulfilled(this.#result));
//         });
//       } else if (this.#state === "fulfilled") {
//         queueMicrotask(() => {
//           resolve(onFulfilled(this.#result));
//         });
//       } else if (this.#state === "rejected") {
//         onRejected(this.#result);
//       }
//     });
//   }
// }

// MyPromise 的实例
// const data = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("我是 MyPromise");
//   }, 2000);
// });

// data
//   .then((result1) => {
//     console.log("result1", result1);
//     return "我是 then1 的返回值";
//   })
//   .then((result2) => {
//     console.log("result2", result2);
//     return "我是 then2 的返回值";
//   })
//   .then((result3) => {
//     console.log("result3", result3);
//     return "我是 then3 的返回值";
//   })
//   .then((result4) => {
//     console.log("result4", result4);
//   });

// data.then((result) => {
//   console.log("我读取的是 then1的值 ", result);
//   return "我是 then2 的返回值";
// });

// data.then(
//   (result) => {
//     console.log("我读取的是 then2的值", result);
//   },
//   () => {}
// );

// console.log("我在主线程，我应该是第一执行的");

// tips: 这是原生 Promise 类
// const yuan = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("我是原生 Promise");
//   }, 1000);
// });

//  yuan.then((result) => {
//   console.log("result", result);
// });
// console.log("test", test);

// console.log("我在主线程，我应该是第一执行的");
async function tst() {
  await new Promise<void>(async (res, rej) => {
    await new Promise(() => {
      throw "fuck";
    });
    console.log("我会执行么?");
    res();
  })
    .then(() => {
      console.log("done.");
    })
    .catch((err) => {
      console.log(`error: ${err}`);
    });
}
onMounted(() => {
  tst();
});
</script>
<template></template>
