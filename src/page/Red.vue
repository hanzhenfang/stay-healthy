<script lang="ts" setup>
import { ref, h, Directive, onMounted, getCurrentInstance } from "vue";
import ReadChild from "./RedChild.vue";

const test = ref(1);
const dom = ref<HTMLDivElement>();

const vTest: Directive = {
  mounted: (el: HTMLDivElement, arg, value) => {
    console.log("el", (el.style.backgroundColor = "red"));
    console.log("arg", arg);
    console.log("value", value);
  },
};

const com = getCurrentInstance();

console.log("com", com);
</script>

<template>
  <div
    ref="1"
    class="w-100px h-100px bg-black text-20px"
    :id="test.toString()"
  ></div>
  <div v-if="test === 1">我出现</div>
  <div v-else>我不出现</div>
  <p class="rrr">我是父亲组件</p>
  <ReadChild />
</template>

<style scoped>
.rrr,
:deep(.ttt) {
  color: red;
  text-decoration: wavy;
}
:global(.hh) {
  color: yellow;
}
</style>
