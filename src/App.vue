<script setup lang="ts">
import Elipsis from "@/view/Elipsis/index.vue";
</script>

<template>
  <div class="w-100vw h-100vh">
    <div class="w-100% overflow-hidden">
      <div class="max-w-300px border-1px border-black">
        <Elipsis class="text-red text-20px" :start-elipsis-line="3">
          g
        </Elipsis>
      </div>
    </div>
  </div>
</template>
<style></style>
