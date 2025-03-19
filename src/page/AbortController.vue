<script lang="ts" setup>
const controller = new AbortController();
function test() {
  fetch("/", {});
}
</script>
<template>
  <div class="w-full h-full bg-red">
    <h1>测试 abort controller</h1>

    <button @click="test">发起请求</button>
    <button @click="controller.abort()">中断请求</button>
  </div>
</template>
