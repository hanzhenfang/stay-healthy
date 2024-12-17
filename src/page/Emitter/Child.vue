<script lang="ts" setup>
import { getCurrentInstance } from "vue";
const emits = defineEmits<{
  (e: "test"): void;
}>();

const cur = getCurrentInstance();
console.log("cur", cur);
</script>

<template>
  <div>
    <h1 @click="emits('test')">children 组件</h1>
  </div>
</template>
