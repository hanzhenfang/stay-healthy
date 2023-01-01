<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import MyPromise from "@/utils/promise";
import TestVue from "./view/Test/test.vue";
import Test1Vue from "./view/Test/test1.vue";
import Dialog from "./components/SearchBar/dialog/Dialog.vue";
import CustomDirective from "./view/customDirective.vue/CustomDirective.vue";
import { useBestLayout } from "./use/useBestGridLayout";
import { debounce } from "./utils/debounce";
import { throttle } from "./utils/throttle";

import { DialogCreator } from "./components/SearchBar/dialog/dialogCreator";

function testDebounce() {
  console.log("哈哈");
}
const test = throttle(testDebounce);
</script>

<template>
  <div class="w-[390px] h-[844px]">
    <button @click="test">消失</button>
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
