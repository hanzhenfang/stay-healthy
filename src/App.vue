<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import MyPromise from "@/utils/promise";
import TestVue from "./view/Test/test.vue";
import Test1Vue from "./view/Test/test1.vue";

import { useBestLayout } from "./use/useBestGridLayout";

import hanBaby from "./assets/海绵宝宝.jpeg";
import type { CSSProperties } from "vue";

const wrapper = ref<HTMLDivElement>();
const { bestRowCounts, bestWidth } = useBestLayout(wrapper, 300, 20);

const wrapperStyle = computed<CSSProperties>(() => {
  return {
    display: `grid`,
    gridTemplateColumns: `repeat(${bestRowCounts.value},${bestWidth.value}px`,
    gap: `20px 20px`,
  };
});
</script>

<template>
  <div ref="wrapper" class="h-[100vh] w-[100vw] bg-[#2ec1cc]">
    <!-- <TestVue /> //promise -->
    <Test1Vue />
  </div>
</template>

<style>
@keyframes searchInput {
  from {
    transform: translateY(50px);
  }
  to {
    transform: translateY(0px);
  }
}

.searchInput {
  animation: searchInput 1s;
}
</style>
