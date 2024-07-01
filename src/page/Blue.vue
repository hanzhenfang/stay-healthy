<script lang="ts" setup>
import { onMounted } from "vue";

import { name, ammendName } from "./test";

onMounted(() => {
  const div = document.querySelector("#box");
  console.log("div", div);

  const test = div?.getClientRects();
  console.log("test", test);
});

const test = [1, 2, 3, 4, 5];
test.forEach((item, index, arr) => {
  if (index == 1) {
    test.pop();
  }
  console.log(item);
});
</script>

<template>
  <div class="w-300px h-300px bg-blue p-30px ml-auto">
    <div class="text-20px">希望大家可以从我博客中学到一些新的知识</div>
    <div class="text-20px mt-20px text-end">---韩振方</div>

    <div class="text-15px mt-60px">https://juejin.cn/user/3065861918435437</div>
    <div class="text-20px mt-20px text-end">---韩振方</div>
  </div>
</template>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  font-size: 20px;
  white-space: nowrap;
  color: red;
  background: black;
  overflow: auto;
}
</style>
