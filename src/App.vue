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
    bg: "blue",
  },

  {
    number: 2,
    bg: "pink",
  },

  {
    number: 3,
    bg: "red",
  },
];
</script>

<template>
  <div
    class="w-100vw h-100vh text-14px text-black flex justify-center items-center"
  >
    <div class="w-300px h-300px overflow-auto flex snap-x">
      <div
        v-for="item in box"
        class="w-300px h-300px shrink-0 leading-300px text-center snap-start"
        :style="{ backgroundColor: item.bg }"
      >
        <span class="text-100px text-white">{{ item.number }}</span>
      </div>
    </div>
  </div>
</template>
