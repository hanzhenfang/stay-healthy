<script lang="ts" setup>
import { ref, nextTick } from "vue";
const n = ref(0);

const count = defineModel({ type: Number, default: 13 });

count.value += 1;
count.value += 2;
count.value += 3;
count.value += 4;
console.log(count.value); // 这里为什么打印是 100？

nextTick(() => {
  console.log(count.value); //这里结果为什么是 104？？
});
</script>
<template>
  <div class="w-1000px h-1000px bg-#2ec1cc">
    <div v-if="n == 1" class="test">
      {{ n }}
    </div>

    {{ count }}
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
