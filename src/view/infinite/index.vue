<script lang="ts" setup>
import { ref, onMounted } from "vue";
const arr = ref(Array(10));

const bottomBox = ref<HTMLDivElement>();

const observer = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    const radio = entries[0].intersectionRatio;
    if (radio === 1) {
      //当等于 1 的时候，发起请求
      console.log("交叉比例为1，该发起请求了");
      arr.value = Array(20);
    }
  },

  { threshold: [1] }
);

onMounted(() => {
  if (bottomBox.value) observer.observe(bottomBox.value);
});
</script>
<template>
  <div class="w-full h-full bg-blue flex justify-center">
    <div class="w-50% h-50% bg-red overflow-auto border-solid border-yellow">
      <div
        v-for="(item, index) in arr"
        class="w-full h-100px border-solid border-black"
      >
        <span>{{ index }}</span>
      </div>

      <!-- 触底元素 -->
      <div ref="bottomBox" class="w-full h-40px bg-black text-center">
        <span class="text-white text-15px">我也是有底线的</span>
      </div>
    </div>
  </div>
</template>
