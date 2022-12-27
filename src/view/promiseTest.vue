<script lang="ts" setup>
await new Promise<void>(async (res, rej) => {
  await new Promise(() => {
    throw "fuck";
  });
  console.log("我会执行么?");
  res();
})
  .then(() => {
    console.log("done.");
  })
  .catch((err) => {
    console.log(`error: ${err}`);
  });
</script>
<template></template>
