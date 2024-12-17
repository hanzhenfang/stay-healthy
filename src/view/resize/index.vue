<script lang="ts" setup>
  import { ref, reactive } from "vue";

  const isDragging = ref<boolean>(false);
  const initPointerInfo = reactive({
    clientX: 0
  });
  const left = ref<HTMLDivElement>();

  function onMouseDown(e: MouseEvent) {
    isDragging.value = true;
    initPointerInfo.clientX = e.clientX;
  }

  function onMouseMove(e: MouseEvent) {
    e.preventDefault();
    document.addEventListener("mousemove", (e: MouseEvent) => {
      if (!isDragging.value) return;
      const distance = e.clientX - e.clientY;
      left.value!.style.width = e.clientX + "px";
    });
  }

  function onMouseUp(e: MouseEvent) {
    console.log("抬起");
    isDragging.value = false;
  }
</script>
<template>
  <div class="w-full h-full flex" @mouseup="onMouseUp">
    <div ref="left" class="w-200px bg-red"></div>
    <div
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      class="w-10px bg-blue"></div>
    <div class="w-0px grow bg-yellow"></div>
  </div>
</template>
