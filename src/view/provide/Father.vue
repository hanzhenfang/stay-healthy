<script lang="ts" setup>
  // 这是父亲组件
  import Children from "./Children.vue";
</script>
<template>
  <div class="w-[70%] h-[270px] bg-[pink]">
    <span class="text-[black] text-[20px]">爸爸组件</span>
    <span class="text-[black] text-[15px]"></span>
    <Children />
  </div>
</template>
