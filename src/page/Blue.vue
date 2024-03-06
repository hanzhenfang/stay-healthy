<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { popupCreator } from "@/components/Popup/usePopup";
import ContentP from "./component/Content.vue";
import "@/test/test";
import e, { Person } from "../test/zhuanfa";
// import te, { Person } from "../test/test";
e();
</script>
<template>
  <div class="w-full h-full centered bg-blue relative flex flex-col centered">
    <div
      class="w-200px h-200px border-5px border-black border-solid text-center"
    >
      <span class="text-30px leading-200px">DNS 演示</span>
    </div>
  </div>
</template>

<style scoped></style>
