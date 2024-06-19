<script lang="ts" setup>
import { onMounted } from "vue";

const obj: Record<"value", null | string> = { value: null };
let spanEl: any = null;
const proxy = new Proxy(obj, {
  get(target, property) {
    return target[property];
  },
  set(target, property, newValue) {
    if (!newValue) spanEl.innerText = "不能为空";
    else spanEl.innerText = "";
    target[property] = newValue;
    return true;
  },
});

onMounted(() => {
  const inputEl = document.getElementById("inEl");
  if (!inputEl) return;
  spanEl = document.getElementById("tips");
  inputEl.addEventListener("input", (e: Event) => {
    const userInput = (e.target as HTMLInputElement).value;
    console.log("userInput", userInput);
    proxy.value = userInput;
  });
});
</script>
<template>
  <div class="w-full h-full bg-#2ec1cc flex items-center">
    <div class="w-50% h-50% m-auto">
      <span id="tips"></span>
      <input id="inEl" />
    </div>
  </div>
</template>
