<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import MyPromise from "@/utils/promise";
import TestVue from "./view/Test/test.vue";
import Test1Vue from "./view/Test/test1.vue";
import Dialog from "./components/SearchBar/dialog/Dialog.vue";
import CustomDirective from "./view/customDirective.vue/CustomDirective.vue";
import { useBestLayout } from "./use/useBestGridLayout";

import { DialogCreator } from "./components/SearchBar/dialog/dialogCreator";

const dialog = new DialogCreator({
  title: "韩振方",
  content: "Vue 如何实现一个dialog",
  confirmBtn: () => {
    window.alert("哈哈");
  },
}); //生成一个 dialog 实例

function showDialog() {
  //dialog 出现
  dialog.present();
}

function closeDialog() {
  //dialog 消失
  dialog.disMiss();
}
</script>

<template>
  <div class="w-[390px] h-[844px]">
    <button @click="showDialog">出现</button>
    <button @click="closeDialog">消失</button>
  </div>
</template>

<style>
@keyframes searchInput {
  from {
    transform: translateY(50px);
  }
  to {
    transform: translateY(0px);
  }
}

.searchInput {
  animation: searchInput 1s;
}
</style>
