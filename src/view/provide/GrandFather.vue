<script lang="ts" setup>
  // 这是爷爷组件
  import { ref } from "vue";
  import { provide } from "vue";

  import Father from "./Father.vue";

  const count = ref<number>(0);
  function add() {
    count.value = count.value + 1;
  }

  provide("message", count);
  provide("messageAdd", add); //我把 add 也同时提供给儿子组件
</script>
<template>
  <div class="w-full h-[300px] bg-[black]">
    <span class="text-white text-[20px]">爷爷组件</span>
    <button @click="add">message+1</button>
    <Father />
  </div>
</template>
