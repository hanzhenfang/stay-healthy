<script lang="ts" setup>
  import { ref, watch } from "vue";

  const count = ref<Number>(1);

  watch(count, () => {});
</script>
<template>
  <div>哈哈</div>
</template>
