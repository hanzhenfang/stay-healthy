<script setup lang="ts">
import { ref, h, onMounted, computed, onBeforeMount } from "vue";

const box = ref<HTMLDivElement>();
// 1. 确定圆心的位置
const centerPointer = { x: 100, y: 100 };
const person = ref({ name: "1111", age: 1 });
const testPerson = computed(() => {
  console.log("wwww");
  return person.value.age;
});
// 2. 确定圆周运动的半径
const radius = 50;
// 3. div 运动时的角度
let angle = 0;

function run() {
  setInterval(() => {
    if (!box.value) return;
    angle += 1;
    const radian = (angle * Math.PI) / 180;
    const a = Math.sin(radian) * radius;
    const b = Math.cos(radian) * radius;
    const x = centerPointer.x + a;
    const y = centerPointer.y - b;

    box.value.style.left = x + "px";
    box.value.style.top = y + "px";
  }, 16);
}

onBeforeMount(() => {
  console.log("testPerson.value", testPerson.value);
});

onMounted(async () => {
  console.log("mounted");
  run();
});
</script>
<template>
  <div class="w-full h-full centered bg-blue relative flex flex-col centered">
    <div ref="box" class="absolute w-50px h-50px bg-red"></div>
  </div>
</template>

<style scoped></style>
