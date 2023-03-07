<script lang="ts" setup>
import { watch, computed, ref } from "vue";
import { storeToRefs } from "pinia";

import PreNotSupport from "./PreNotSupport.vue";

import { useWebdavStore } from "@/shared/store/webdav";

import type { FileStat } from "@lazycatcloud/webdav";

const props = defineProps<{
  fileStat: FileStat;
  showOtherAppLists: () => void;
}>();

const webDav = useWebdavStore();

const isSupport = ref<boolean>(true);
const imgWrapper = ref<HTMLDivElement>();
const imgElement = ref<HTMLImageElement>();
const { client } = storeToRefs(webDav);

const src = computed<string>(() => {
  const file = props.fileStat;
  if (!file) return "";
  const link = client.value?.getDownloadLink(file.filename);
  return link ?? "";
});

function autoImgSize(el: HTMLImageElement) {
  const parentNode = el.parentNode as HTMLDivElement;
  const { clientHeight: parentHeight, clientWidth: parentWidth } = parentNode;
  const { width, height } = el;
  const wRatio = parentWidth / width;
  const hRatio = parentHeight / height;
  const fitRatio = hRatio < wRatio ? hRatio : wRatio;
  const newWidth = Math.round(width * fitRatio);
  const newHeight = Math.round(height * fitRatio);
  console.log("newWidth", newWidth);
  console.log("newHeight", newHeight);
  el.style.width = newWidth + "px";
  el.style.height = newHeight + "px";
}

const observer = new ResizeObserver(() => autoImgSize(imgElement.value!));
const vAuto = {
  mounted: (el: HTMLImageElement) => {
    el.onload = (e) => autoImgSize(e.target as HTMLImageElement);
    observer.observe(imgWrapper.value!);
  },
  beforeUnmount: () => {
    observer.disconnect();
  },
};

function onLoadErr() {
  isSupport.value = false;
}

watch(src, () => {
  isSupport.value = true;
});
</script>
<template>
  <div
    ref="imgWrapper"
    class="h-full overflow-scroll pl-[40px] w-full flex justify-center items-center"
  >
    <div
      v-if="!!src && isSupport"
      class="w-[calc(100%-40px)] h-full flex justify-center items-center"
    >
      <img
        ref="imgElement"
        v-auto
        class="object-contain"
        :src="src"
        :onerror="onLoadErr"
      />
    </div>
    <PreNotSupport
      v-else
      :file-stat="props.fileStat"
      :show-other-app-lists="showOtherAppLists"
    />
    <!-- !!important: 由于我们图片展示其实是背景图，但是无法捕获加载错误.
       所以需要添加一个额外的 <img/> 标签去捕获错误
       下面的 <img/> 标签仅仅用来检测错误而已 -->
  </div>
</template>
