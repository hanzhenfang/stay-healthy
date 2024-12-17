<script lang="ts" setup>
  function clickBtn() {
    console.log("testA");
  }
</script>
<template>
  <div class="w-100px h-100px bg-red centered">
    <button id="test1" @click="clickBtn">点击我A</button>
  </div>
</template>
