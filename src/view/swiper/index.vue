<script setup lang="ts">
  import { ref, computed } from "vue";
  import { AutoEllipsis } from "auto-ellipsis-text";
  import Auto from "@/view/Elipsis/EllpisisiXX.vue";
  import Resize from "@/view/resize/index.vue";
  import Infinite from "@/view/infinite/index.vue";
  // import { ToastCreator } from "@lazycatcloud/lzc-toolkit";

  const box = [
    {
      number: 1,
      bg: "blue"
    },

    {
      number: 2,
      bg: "pink"
    },

    {
      number: 3,
      bg: "red"
    }
  ];

  const containerEl = ref<HTMLDivElement>();

  function scrollEvent(e: UIEvent) {
    const containerEl = e.target as HTMLDivElement;
  }

  // 上一张
  function pre() {
    const el = containerEl.value;
    if (!el) return;

    const scrollLeft = el?.scrollLeft;

    if (scrollLeft > 0) {
      el.scrollLeft = scrollLeft - 300;
    }
  }

  function next() {
    const el = containerEl.value;
    if (!el) return;

    const scrollLeft = el?.scrollLeft;

    const max = (box.length - 1) * 300; //轮播图的数量 -1

    if (scrollLeft < max) {
      el.scrollLeft = scrollLeft + 300;
    }
  }
</script>

<template>
  <div
    class="w-100vw h-100vh text-14px text-black flex justify-center items-center">
    <div
      @click.stop="pre"
      class="w-60px h-60px rounded-full bg-black flex items-center justify-center">
      <span class="text-white">上一张</span>
    </div>

    <div
      ref="containerEl"
      @scroll="scrollEvent"
      class="w-300px h-300px overflow-auto flex snap-x snap-mandatory scroll-smooth">
      <div
        v-for="(item, index) in box"
        class="w-300px h-300px shrink-0 leading-300px text-center snap-center"
        :style="{ backgroundColor: item.bg }">
        <span class="text-100px text-white">{{ item.number }}</span>
      </div>
    </div>

    <div
      @click="next"
      class="w-60px h-60px rounded-full bg-black flex items-center justify-center">
      <span class="text-white">下一张</span>
    </div>
  </div>
</template>
