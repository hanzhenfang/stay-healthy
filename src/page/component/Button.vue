<script lang="ts" setup>
import { useSlots } from "vue";

const slot = useSlots();
console.log("slot", slot);
</script>
<template>
  <div
    class="w-100px h-100px text-40px bg-blue/50 border border-10px border-blue text-red">
    <slot></slot>
  </div>
</template>
