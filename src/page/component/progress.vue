<!-- CircleProgress.vue -->
<template>
  <div class="circle-progress" :style="containerStyle">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <circle
        :r="radius"
        cx="50"
        cy="50"
        fill="none"
        :stroke="backgroundColor"
        :stroke-width="strokeWidth"
        stroke-linecap="round" />
      <!-- 进度圆环 -->
      <circle
        :r="radius"
        cx="50"
        cy="50"
        fill="none"
        :stroke="color"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        stroke-linecap="round"
        transform="rotate(-90 50 50)" />
    </svg>
    <div class="progress-text" :style="textStyle">{{ percentage }}%</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

// 定义组件属性
interface Props {
  percentage: number; // 进度百分比
  size?: number; // 组件大小
  strokeWidth?: number; // 圆环宽度
  color?: string; // 进度条颜色
  backgroundColor?: string; // 背景圆环颜色
  textSize?: number; // 文字大小
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  strokeWidth: 8,
  color: "#1890ff",
  backgroundColor: "#f5f5f5",
  textSize: 20
});

// 计算属性
const radius = computed(() => 50 - props.strokeWidth / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);

const dashOffset = computed(() => {
  // 当进度为0时，完全隐藏进度条
  if (props.percentage === 0) {
    return circumference.value;
  }
  // 当进度为100%时，完全显示进度条
  if (props.percentage === 100) {
    return 0;
  }
  // 其他情况下的计算
  return circumference.value * (1 - props.percentage / 100);
});
// 样式计算
const containerStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  position: "relative" as const
}));

const textStyle = computed(() => ({
  fontSize: `${props.textSize}px`,
  color: "#333"
}));
</script>

<style scoped>
.circle-progress {
  display: inline-block;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

circle {
  transition: stroke-dashoffset 0.3s ease;
}
</style>
