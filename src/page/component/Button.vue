<script lang="ts" setup>
import { useSlots } from "vue";

const slot = useSlots();
console.log("slot", slot);
</script>
<template>
  <div
    class="w-100px h-100px text-40px bg-red border border-10px border-red text-red">
    <slot></slot>
  </div>
</template>
