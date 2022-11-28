<script setup lang="ts">
import { onMounted } from "vue";

import useSearch from "./use/useSearch";

const { openSearchBar, closeSearchBar } = useSearch;

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.metaKey && e.key === "k") {
      console.log("e.metaKey", e.metaKey);
      console.log("e.key", e.key);
      openSearchBar();
    }
  });
});
</script>

<template>
  <div class="h-[100vh] w-[100vw] bg-[#2ec1cc]"></div>
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
