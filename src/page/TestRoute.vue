<script lang="ts" setup>
import { reactive, watch } from "vue";

let arr = reactive([]);

function debounce(
  fn: Function,
  delay: number = 1000,
  immediately: boolean = true
) {
  let timerID: number = -1;
  return function (this: any, ...arg: any) {
    if (timerID < 0 && immediately) {
      fn.apply(this, arg);
      timerID = 1;
      return;
    }
    if (timerID > 0) {
      clearTimeout(timerID);
    }
    timerID = window.setTimeout(() => {
      console.log("arg", arg);
      fn.apply(this, arg);
    }, delay);
  };
}
function test() {
  console.log("触发");
}

const defn = debounce(test);
</script>
<template>
  <div @click="defn" class="w-50px h-50px bg-red">触发</div>
  <div class="text-20px text-black">
    {{ arr }}
  </div>
</template>
