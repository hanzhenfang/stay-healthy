<script lang="ts" setup>
function clickBtn() {
  console.log("testB");
}
</script>
<template>
  <div class="w-100px h-100px bg-red centered">
    <div @click="clickBtn">点击我B</div>
  </div>
</template>
