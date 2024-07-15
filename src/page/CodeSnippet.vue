<script lang="ts" setup>
import { ref } from "vue";

const testEl = ref<HTMLDivElement>();
const wrapper = ref<HTMLDivElement>();

function change(e: Event) {
  const inputEl = e.target as HTMLInputElement;
  console.log("inputEl.files", inputEl.files);
  const selectedFile = inputEl.files![0];
  const fileReader = new FileReader();

  fileReader.readAsArrayBuffer(selectedFile);
  fileReader.onload = (result) => {
    console.log("fileReader.result", fileReader.result);
  };
}
</script>
<template>
  <div ref="wrapper" class="w-full h-full bg-blue">
    <div v-for="item in 10" class="w-50px h-50px">{{ item }}</div>
    <div @click.stop="" class="w-100px h-100px bg-red">点击</div>

    <div class="fixed z-999 top-0px left-0px" ref="testEl">other</div>
    <input type="file" @change="change" accept=".png,.jpg" />
  </div>
</template>
