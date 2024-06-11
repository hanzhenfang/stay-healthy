<script lang="ts" setup>
import { sleep } from "@/utils";

function* test() {
  console.log("11");
  yield 1;
  return "over";
}

const make = test();
console.log("make", make);

// const next = make.next(2);
// console.log("next", next);
</script>
<template></template>
