<script setup lang="ts">
  import {
    ref,
    computed,
    watch,
    reactive,
    getCurrentInstance,
    getCurrentScope,
    onRenderTracked,
    onRenderTriggered
  } from "vue";
  import { popupCreator } from "@/components/Popup/usePopup";
  import ContentP from "./component/Content.vue";
  import "@/test/test";
  // import te, { Person } from "../test/test";
  import SelecBar from "@/components/Select/index.vue";

  const b = ref(11);
  const bb = computed(() => {
    b.value + 2;
  });

  onRenderTracked((e) => {
    console.log("exx", e);
  });

  onRenderTriggered((e) => {
    console.log("ebb", e);
  });
  console.log("b", b);
  function add() {
    b.value++;
  }
</script>
<template>
  <div class="w-full h-full centered bg-blue relative flex flex-col centered">
    <div
      class="w-200px h-200px border-5px border-black border-solid text-center">
      <span @click="add" class="text-30px leading-200px">DNS 演示</span>
    </div>
    <div
      class="box"
      :style="{
        paddingLeft: '10px',
        padding: '5px'
      }"></div>

    <SelecBar />
  </div>
</template>

<style scoped>
  .box {
    width: 100px;
    height: 100px;
    border: 10px solid red;
  }
</style>
