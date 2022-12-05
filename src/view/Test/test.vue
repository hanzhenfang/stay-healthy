<script lang="ts" setup>
//假设这个 data 是后端要传递的数据
const data = { name: "han", age: 18 };

function getData(callBackFn: Function) {
  setTimeout(() => {
    callBackFn(data.age++);
  }, 1000);
}

const myAge = getData((userAge: number) => {
  console.log("userAge", userAge);
});
</script>
<template>
  <div></div>
</template>
我是页面，我需要等 alter 方法执行完才可以渲染
