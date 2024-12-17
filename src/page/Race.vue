<script lang="ts" setup>
import { ref, watch, reactive } from "vue";

import axios from "axios";

const text = ref();

const source = reactive([1, 2, 3]); // 使用 ref 包装源数据

watch(source, (n) => {
  console.log("变化", n);
});

setInterval(() => {
  source.splice(0, 1);
}, 1000);

function cancelCache() {
  let aborter = null;
  return async function api() {
    if (aborter) aborter.abort("重复请求");
    aborter = new AbortController();
    const data = await axios({
      url: "http://localhost:9563/race",
      signal: aborter.signal
    });
    text.value = data;
  };
}

const fn = cancelCache();
setInterval(() => {
  console.log("韩振方");
}, 1000);
</script>
<template>
  <div class="w-100vw h-100vh bg-blue flex items-center justify-center">
    <div class="w-500px h-500px bg-white flex flex-col items-center gap-30px">
      <div
        @click="fn"
        class="w-100px h-100px bg-black text-white flex items-center justify-center">
        <span>点击发送请求</span>
      </div>

      <span class="text-black text-20px">{{ text }}</span>
    </div>
  </div>
</template>
