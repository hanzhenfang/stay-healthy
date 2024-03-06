<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import JSON from "@/assets/shangcheng.json";

const count = ref(1);
const lottie = ref();

const obj: any = { name: "han", age: 19, test: 11, calss: 15 };
const { calss, ...residue } = obj;

function test() {
  console.log("residue", residue);
}

test();
function playAnimation() {
  lottie.value.play();
}

function stop() {
  lottie.value.stop();
}

function goto() {
  lottie.value.playSegments([0, 1]);
}

onMounted(() => {});
</script>

<template>
  <RouterView />
</template>
