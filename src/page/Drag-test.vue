<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { DialogCreator } from "@/components/SearchBar/dialog/dialogCreator";

const initInfo = {
  x: 0,
  y: 0,
};

const diff = {
  x: 0,
  y: 0,
};

const dragEl = ref<HTMLDivElement>();
const deleteArea = ref<HTMLDivElement>();

let deleteInfo = {
  //删除元素的坐标信息
  ltp: {
    x: 0,
    y: 0,
  },
  rbp: {
    x: 0,
    y: 0,
  },
};

let dragInfo = {
  //拖拽元素的坐标信息
  ltp: {
    x: 0,
    y: 0,
  },
  rbp: {
    x: 0,
    y: 0,
  },
};

let test = 0;

function touchStart(e: TouchEvent) {
  if (!dragEl.value || !deleteArea.value) return;

  const { clientX, clientY } = e.touches[0];
  initInfo.x = clientX;
  initInfo.y = clientY;
}

const dialog = new DialogCreator({
  title: "删除应用",
  content: "确定要删除该应用吗?",
  confirmBtn: () => {},
});
function touchMove(e: TouchEvent) {
  const { clientX, clientY } = e.touches[0];
  diff.x = clientX - initInfo.x;
  diff.y = clientY - initInfo.y;

  let moveDragInfo = { ltp: { x: 0, y: 0 }, rbp: { x: 0, y: 0 } };

  moveDragInfo.ltp.x = dragInfo.ltp.x + diff.x;
  moveDragInfo.ltp.y = dragInfo.ltp.y + diff.y;

  moveDragInfo.rbp.x = dragInfo.rbp.x + diff.x;
  moveDragInfo.rbp.y = dragInfo.rbp.y + diff.y;

  const notIntersected =
    moveDragInfo.rbp.x < deleteInfo.ltp.x || //左侧
    moveDragInfo.ltp.x > deleteInfo.rbp.x || //右侧
    moveDragInfo.ltp.y > deleteInfo.rbp.y || //下侧
    moveDragInfo.rbp.y < deleteInfo.ltp.y; //上侧

  if (!notIntersected) {
    console.log("相交了,提示删除");
    if (!dialog.isShow) dialog.present();
  } else {
    console.log("无事发生");
  }

  const target = e.target as HTMLDivElement;
  target.style.transform = `translate(${diff.x}px,${diff.y}px)`;
}

function touchEnd(e: TouchEvent) {
  const target = e.target as HTMLDivElement;
  target.style.transform = `translate(0)`;
}

//获取元素的左上角和右下角坐标信息
function getElementInfo(element: HTMLDivElement) {
  const rectInfo = element.getBoundingClientRect();
  const { left, top, right, bottom } = rectInfo;
  return {
    element: element,
    ltp: {
      x: left,
      y: top,
    },
    rbp: {
      x: right,
      y: bottom,
    },
  };
}

onMounted(() => {
  dragInfo = getElementInfo(dragEl.value!);
  deleteInfo = getElementInfo(deleteArea.value!);
});
</script>

<template>
  <div class="w-full h-full bg-blue flex flex-col gap-230px">
    <div
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      class="w-100px h-100px mx-auto bg-black"
      ref="dragEl"
    ></div>

    <div ref="deleteArea" class="w-full leading-100px bg-red text-center">
      <span class="text-black text-20px">删除区域</span>
    </div>
  </div>
</template>
