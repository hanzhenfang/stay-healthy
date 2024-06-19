<script lang="ts" setup>
import { ref, nextTick } from "vue";
const n = ref(0);

const childrenCount = defineModel({ type: Number, default: 13 });

async function test() {
  childrenCount.value = childrenCount.value + 1;
  childrenCount.value = childrenCount.value + 1;

  childrenCount.value = childrenCount.value + 1;
  childrenCount.value = childrenCount.value + 1;
}

test();

console.log(childrenCount.value); // 这里为什么打印是 100？

nextTick(() => {
  console.log(childrenCount.value); //这里结果为什么是 104？？
});
</script>
<template>
  <div class="w-1000px h-1000px bg-#2ec1cc">
    <div v-if="n == 1" class="test">
      {{ n }}
    </div>
    <span class="text-200px">
      {{ childrenCount }}
    </span>
  </div>
</template>

<style scoped>
.test {
  position: fixed;
  width: 50%;
  height: 50%;
  background-color: red;
}
</style>
