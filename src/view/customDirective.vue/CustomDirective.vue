<script setup lang="ts">
const vFocus = {
  mounted: (el: HTMLInputElement, bind: any, vnode) => {
    console.log("vnode", vnode);
  },
};
const test = "很久";
</script>
<template>
  <input v-focus.foo="test" />
</template>
