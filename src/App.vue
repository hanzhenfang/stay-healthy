<script setup lang="ts">
import Home from "../src/view/Home/index.vue";

import useSearch from "./use/useSearch";

import SearchBar from "./components/SearchBar/SearchBar.vue";
const { openSearchBar } = useSearch;
</script>

<template>
  <div class="h-[100vh] w-[100vw] bg-[#2ec1cc]">
    <!-- <Home /> -->
    <button @click="openSearchBar">搜索</button>
  </div>
</template>

<style>
@keyframes searchInput {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0px);
  }
}

.searchInput {
  animation: searchInput 0.1s;
}
</style>
