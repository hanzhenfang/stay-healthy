<script setup lang="ts">
import { onMounted } from "vue";
import { useDelayLoad, DefaultLoading } from "@lazycatcloud/lzc-toolkit";

const { LoadingComp, load, loading, unload } = useDelayLoad({
  component: DefaultLoading,
  delay: 3000,
});

onMounted(() => {
  load();
  setTimeout(() => {
    // unload();
  }, 3000);
});
</script>

<template>
  <div class="w-100vw h-100vh">
    <span class="text-black">
      {{ loading }}
    </span>
    <LoadingComp v-if="loading" class="w-full h-200px" text="111" />
  </div>
</template>

<style scoped>
/* .containerEl {
  height: -webkit-fill-available;
  overflow: hidden;
  position: fixed; 
  height: 100vh;
  overflow: hidden;
} */
/* .box { */
/* overflow-y: auto; */
/* -webkit-overflow-scrolling: touch; */
/* } */
</style>
