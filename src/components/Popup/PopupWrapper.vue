<script lang="ts" setup>
  defineProps<{
    direction?: "top" | "bottom";
  }>();

  const emit = defineEmits<{
    (e: "close"): void;
  }>();
</script>
<template>
  <div class="wrapper" @click="emit('close')">
    <div
      class="w-full h-full flex"
      :class="direction === 'top' ? '' : 'flex-col-reverse'">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    position: absolute;
    top: 0px;
  }
</style>
