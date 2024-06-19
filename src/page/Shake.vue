<script lang="ts" setup>
import { ref, onMounted } from "vue";

const arr = ref([1, 2, 3]);

const wrapper = ref<HTMLDivElement>();

interface Info {
  element: null | HTMLDivElement;
  initIndex: number;
  currentIndex: number;
}

interface ElementInfo<T extends HTMLElement = HTMLDivElement> {
  element: null | T;
  ltp: {
    // left top w 点坐标值
    x: number;
    y: number;
  }; //right bottom pointer 点坐标值
  rbp: {
    x: number;
    y: number;
  }; //圆心坐标信息
  center: {
    x: number;
    y: number;
  };
  height: number;
  width: number;
}

function useDragSort(containerEl: HTMLDivElement) {
  const curClonedElInfo: Info = {
    element: null,
    initIndex: -1,
    currentIndex: -1,
  };

  const cloneElInfo: ElementInfo = {
    element: null,
    ltp: {
      x: 0,
      y: 0,
    },
    rbp: {
      x: 0,
      y: 0,
    },
    center: {
      x: 0,
      y: 0,
    },
    height: 0,
    width: 0,
  };

  //当前光标坐标信息
  const latestPointerInfo = {
    x: 0,
    y: 0,
  };

  const diff = {
    x: 0,
    y: 0,
  };

  let changedEl: ElementInfo | null = null;

  let listChildrenArr: HTMLCollection; //最初的元素列表
  let listItemRectArr: ElementInfo[] = []; //元素的位置坐标信息

  const isDraging = ref<boolean>(false);

  function onPointerDown(e: PointerEvent) {
    // 记录初始坐标信息
    console.log("鼠标按下");
    if (e.target === containerEl) {
      return;
    }

    if (isDraging.value) return;
    isDraging.value = true;
    e.preventDefault();

    latestPointerInfo.x = e.clientX;
    latestPointerInfo.y = e.clientY;

    curClonedElInfo.element = e.target as HTMLDivElement;
    const index = Array.prototype.indexOf.call(
      listChildrenArr,
      curClonedElInfo.element as any
    );
    curClonedElInfo.initIndex = index;
    curClonedElInfo.currentIndex = index;
    console.log("listItemRectArr[index]", listItemRectArr[index]);

    //取出被克隆元素的初始位置
    const currentClonedEl = listItemRectArr[index];
    cloneElInfo.ltp.x = currentClonedEl.ltp.x;
    cloneElInfo.ltp.y = currentClonedEl.ltp.y;
    cloneElInfo.rbp.x = currentClonedEl.rbp.x;
    cloneElInfo.rbp.y = currentClonedEl.rbp.y;
    cloneElInfo.center = currentClonedEl.center;

    console.log("cloneElInfo", cloneElInfo);
    cloneElInfo.element = curClonedElInfo.element.cloneNode(
      true
    ) as HTMLDivElement;
    document.body.appendChild(cloneElInfo.element);

    cloneElInfo.element.style.transition = "none";
    curClonedElInfo.element.classList.add("current-item");
    cloneElInfo.element.classList.add("clone-item");

    cloneElInfo.element.style.transform = `translate3d(${cloneElInfo.ltp.x}px,${cloneElInfo.ltp.y}px,0)`;
    cloneElInfo.element.addEventListener("pointermove", onPointerMove);
    cloneElInfo.element.addEventListener("pointerup", onPointerUp);
    cloneElInfo.element.setPointerCapture(e.pointerId); //转移 pointer 的
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDraging.value || !cloneElInfo.element) return;
    diff.x = e.clientX - latestPointerInfo.x;
    diff.y = e.clientY - latestPointerInfo.y;

    latestPointerInfo.x = e.clientX;
    latestPointerInfo.y = e.clientY;

    cloneElInfo.ltp.x += diff.x;
    cloneElInfo.ltp.y += diff.y;

    cloneElInfo.rbp.x += diff.x;
    cloneElInfo.rbp.y += diff.y;

    cloneElInfo.center.x += diff.x;
    cloneElInfo.center.y += diff.y;

    cloneElInfo.element.style.transform = `translate3d(${cloneElInfo.ltp.x}px,${cloneElInfo.ltp.y}px,0)`;
    requestIdleCallback(() => {
      const result = isIntersected();
      const threshold = 0; //超过一半以后的阀值
      console.log("result", result);
      if (!result.isIntersected) return;
      const el = result.el!;
      changedEl = el; //NOTE:保存被换位置的元素信息
      console.log("cloneElInfo.center", cloneElInfo.center);
      const isForward =
        cloneElInfo.ltp.x < el.center.x && cloneElInfo.center.x > el.center.x; // 准备向前移动
      const isBack =
        cloneElInfo.rbp.x > el.center.x && cloneElInfo.center.x < el.center.x; //准备向后移动
      const isXCenter = isForward || isBack;
      if (!isXCenter) return;

      if (isBack) {
        console.log("需要向后挪动");
      } else if (isForward) {
        const index = listItemRectArr.findIndex(
          (item) => item.element === el.element
        );
      }

      const ready =
        isXCenter &&
        Math.abs(el.center.y - cloneElInfo.center.y) < el.height / 2;
      if (ready) {
      }
    });
  }

  function onPointerUp(e: PointerEvent) {
    isDraging.value = false;
  }

  // 判断克隆元素是否与列表元素相交，返回相交的元素
  function isIntersected() {
    let notIntersected = true;
    let intersectedEl: ElementInfo | null = null;
    const result: {
      isIntersected: boolean;
      el: null | ElementInfo;
    } = {
      isIntersected: !notIntersected,
      el: notIntersected ? null : intersectedEl,
    };
    for (let i = 0; i < listItemRectArr.length; i++) {
      if (i === curClonedElInfo.currentIndex) continue;
      const item = listItemRectArr[i];
      notIntersected =
        cloneElInfo.rbp.x < item.ltp.x || //左侧
        cloneElInfo.ltp.x > item.rbp.x || //右侧
        cloneElInfo.ltp.y > item.rbp.y || //下侧
        cloneElInfo.rbp.y < item.ltp.y; //上侧
      //如果相交 需要判断是否超过中心点
      if (!notIntersected) {
        result.el = item;
        result.isIntersected = true;
        break;
      }
    }
    return result;
  }

  //  获取所有元素的坐标信息
  function getElListRect() {
    listChildrenArr = containerEl.children;
    const childrenEls = Array.from(containerEl.children) as HTMLDivElement[];
    for (const element of childrenEls) {
      const elInfo = getElementInfo<HTMLDivElement>(element);
      listItemRectArr.push(elInfo);
    }
  }

  //获取元素的左上角和右下角坐标信息
  function getElementInfo<T extends HTMLDivElement>(element: T): ElementInfo {
    const rectInfo = element.getBoundingClientRect();
    const { left, top, right, bottom, width, height } = rectInfo;
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
      center: { x: left + width / 2, y: top + height / 2 },
      height: height,
      width: width,
    };
  }

  function init() {
    if (!containerEl) return;
    getElListRect();
    containerEl.addEventListener("pointerdown", onPointerDown);
  }

  init();
}

onMounted(() => {
  useDragSort(wrapper.value!);
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

function refresh() {
  window.location.reload();
}
</script>

<template>
  <div class="w-full h-full flex">
    <div
      ref="wrapper"
      class="w-full h-full bg-#2ec1cc flex gap-5px flex-wrap select-none"
    >
      <div
        v-for="item in arr"
        :accesskey="item.toString()"
        class="w-50px h-50px bg-red border-3px border-black border-solid touch-none"
      >
        <span class="text-20px font-500 select-none">
          {{ item }}
        </span>
      </div>
    </div>

    <div @click="refresh" class="w-100px h-100px bg-red">
      <span class="text-30px text-black">刷新</span>
    </div>
  </div>
</template>

<style scoped>
.current-item {
  background-color: #2ec1cc;
}
.clone-item {
  position: fixed;
  opacity: 0.9;
  top: 0px;
  left: 0px;
  background-color: yellow;
  z-index: 999;
}
</style>
