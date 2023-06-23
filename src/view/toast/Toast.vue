<script lang="ts" setup>
import { ref, computed, nextTick } from "vue";
import type { CSSProperties, ComputedRef } from "vue";

type POSITION = "top" | "middle" | "bottom";

const props = defineProps<{
  message: string;
  position: POSITION;
}>();

/**
 * NOTE:
 * => 需要判断如何居中对齐
 */
const toastWrapper = ref<HTMLElement>();
//tips: 向左的偏移量,是wrapper宽度的一半
const LEFT_OFFSET = ref<number>();
//tips: 向上的偏移量,主要由用户传入的props决定
const TOP_OFFSET = ref<number>();
const selfPosition: ComputedRef<number> = computed(() => {
  switch (props.position) {
    case "top":
      return 10;
    case "middle":
      return 50;
    case "bottom":
      return 85;
  }
});

const toastWrapperStyle = computed<CSSProperties>(() => ({
  position: "absolute",
  borderRadius: "10px",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: "14px 19px",
  top: `calc(${selfPosition.value}% - ${TOP_OFFSET.value}px)`,
  left: `calc(50% - ${LEFT_OFFSET.value}px)`,
}));

const toastStyle = computed<CSSProperties>(() => ({
  width: "fit-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "14px",
}));

/**
 * NOTE: 动态计算出自身宽度来控制居中对齐
 */
nextTick(() => {
  LEFT_OFFSET.value = toastWrapper.value!.offsetWidth / 2;
  TOP_OFFSET.value = toastWrapper.value!.offsetHeight / 2;
});
</script>

<template>
  <div
    id="toastWrapper"
    ref="toastWrapper"
    class="toastWrapper"
    :style="[toastWrapperStyle, { zIndex: 9999 }]"
  >
    <div :style="toastStyle">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.animate-toastAnimation {
  animation: slide 0.3s linear;
}
</style>
