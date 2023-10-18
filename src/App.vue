<script setup lang="ts">
import { ref } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import JSON from "@/assets/shangcheng.json";

const count = ref(1);
const lottie = ref();

const obj = { name: "han", age: 19 };

function playAnimation() {
  lottie.value.play();
}

function stop() {
  lottie.value.stop();
}

function goto() {
  lottie.value.playSegments([0, 1]);
}
</script>

<template>
  <RouterView />
</template>
