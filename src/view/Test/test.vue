<script lang="ts" setup>

setTimeout(() => {
  window.alert("我在饭做好了");
}, 3000);
</script>
<template>
  <div>我是页面，我需要等 alter 方法执行完才可以渲染</div>
</template>
