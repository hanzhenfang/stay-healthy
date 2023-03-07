<script lang="ts" setup>
// 这是儿子组件

import { inject } from "vue";

const suibian = inject("message", "假如爷爷没提供没有的话就用我");
const add = inject("messageAdd", () => {});
</script>
<template>
  <div class="w-[70%] h-[230px] bg-[white]">
    <span class="text-[black] text-[20px]">儿子组件</span>
    <span class="text-[black] text-[10px]">{{ suibian }}</span>
    <button @click="add">长大了，我自己+1</button>
  </div>
</template>
a