<script setup lang="ts">
setTimeout(() => {
  console.log("1");
});

queueMicrotask(() => {
  setTimeout(() => {
    console.log("2");
  });
});

new Promise((resolve) => {
  resolve("3");
}).then((res) => {
  console.log(res);
});

console.log("4");
</script>
<template></template>
