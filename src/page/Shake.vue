<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { ammendName } from "./test";

const arr = ref(Array.from({ length: 12 }));
ammendName("超级无敌霸王龙");
const wrapper = ref<HTMLDivElement>();

interface Info {
  element: null | HTMLDivElement;
  initIndex: number;
  desIndex: number;
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

function useDragSort() {
  //被克隆的元素
  const curClonedElInfo: Info = {
    element: null,
    initIndex: -1,
    desIndex: -1,
  };

  //克隆的元素
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

  // 被相交的元素（也就是被交换位置的元素）
  let intersectedEl: ElementInfo | null = null;

  let listChildrenArr: HTMLCollection; //最初的元素列表
  let listItemRectArr: ElementInfo[] = []; //元素的位置坐标信息

  const isDraging = ref<boolean>(false);
  let areaThreshold = { ver: 0, hor: 0 };
  let containerEl: HTMLElement | null = null;

  function onPointerDown(e: PointerEvent) {
    console.log("e", e);
    // 记录初始坐标信息
    if (e.target === containerEl) return;
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
    curClonedElInfo.desIndex = index;

    //取出被克隆元素的初始位置
    const currentClonedEl = listItemRectArr[index];
    cloneElInfo.ltp.x = currentClonedEl.ltp.x;
    cloneElInfo.ltp.y = currentClonedEl.ltp.y;
    cloneElInfo.rbp.x = currentClonedEl.rbp.x;
    cloneElInfo.rbp.y = currentClonedEl.rbp.y;
    cloneElInfo.center = currentClonedEl.center;

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
    cloneElInfo.element.setPointerCapture(e.pointerId); //转移 pointer 的捕获目标为 cloneEl
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
    const result = isIntersected();
    if (!result.isIntersected) return;

    const el = result.el!;

    const isIntersect = result.isIntersected;
    const isPointerEnter = isPointerEnterElArea(el);
    if (!isIntersect || !isPointerEnter) return;

    // 找到当前与克隆元素相交的元素,准备改变 index
    const intersectedElIndex = listItemRectArr.findIndex(
      (item) => item.element === el.element
    );
    const isBack = curClonedElInfo.desIndex < intersectedElIndex; //向后移动
    const isForward = curClonedElInfo.desIndex > intersectedElIndex; //向前移动
    if (isBack) {
      for (let i = curClonedElInfo.desIndex; i < intersectedElIndex; i++) {
        if (i < curClonedElInfo.initIndex) {
          listItemRectArr[i].element!.style.transform =
            "translate3d(0px,0px,0px)";
        } else {
          const curr = listItemRectArr[i + 1];
          const next = listItemRectArr[i];
          const x = next.ltp.x - curr.ltp.x;
          const y = next.ltp.y - curr.ltp.y;
          curr.element!.style.transition = "300ms ease-out";
          curr.element!.style.transform = `translate3d(${x}px,${y}px,0)`;
        }
      }
      intersectedEl = listItemRectArr[intersectedElIndex + 1];
    } else if (isForward) {
      //在
      for (let i = intersectedElIndex; i < curClonedElInfo.desIndex; i++) {
        if (i >= curClonedElInfo.initIndex) {
          listItemRectArr[i + 1].element!.style.transform =
            "translate3d(0px,0px,0px)";
        } else {
          const curr = listItemRectArr[i];
          const next = listItemRectArr[i + 1];
          const x = next.ltp.x - curr.ltp.x;
          const y = next.ltp.y - curr.ltp.y;
          curr.element!.style.transition = "300ms ease-out";
          curr.element!.style.transform = `translate3d(${x}px,${y}px,0)`;
        }
      }

      intersectedEl = listItemRectArr[intersectedElIndex];
    }
    const _x =
      listItemRectArr[intersectedElIndex].ltp.x -
      listItemRectArr[curClonedElInfo.initIndex].ltp.x;
    const _y =
      listItemRectArr[intersectedElIndex].ltp.y -
      listItemRectArr[curClonedElInfo.initIndex].ltp.y;

    curClonedElInfo.element!.style.transition = "300ms ease-out";
    curClonedElInfo.element!.style.transform = `translate3d(${_x}px,${_y}px,0)`;
    curClonedElInfo.desIndex = intersectedElIndex;
  }

  function onPointerUp() {
    isDraging.value = false;
    if (!containerEl) return;
    curClonedElInfo.element?.classList.remove("current-item");
    cloneElInfo.element?.remove();

    for (let i = 0; i < listItemRectArr.length; i++) {
      const curEl = listItemRectArr[i].element;
      curEl!.style.transition = "none";
      curEl!.style.transform = "translate3d(0,0,0)";
    }
    if (intersectedEl !== null)
      //巧妙利用 insertBefore 传 null 会自动在末尾添加的特性来完成最后一项换位置的功能
      containerEl.insertBefore(
        curClonedElInfo.element!,
        intersectedEl === undefined ? null : intersectedEl.element
      );
    intersectedEl = null;
    getElListRect();
  }

  // 仅判断克隆元素是否与列表元素相交，返回相交的元素(不管指针是否进入相交元素内部)
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
      if (i === curClonedElInfo.desIndex) continue;
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

  //判断当前光标指针是否进入相交元素内部
  function isPointerEnterElArea(el: ElementInfo) {
    if (!el) return;
    const { x, y } = latestPointerInfo;
    const min_left = x > el.ltp.x + areaThreshold.ver;
    const min_right = x < el.rbp.x - areaThreshold.ver;
    const min_top = y > el.ltp.y + areaThreshold.hor;
    const min_bottom = y < el.rbp.y - areaThreshold.hor;
    return min_left && min_right && min_top && min_bottom;
  }

  //  获取所有元素的坐标信息
  function getElListRect() {
    if (!containerEl) return;
    listItemRectArr.length = 0;
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

  // 设置阈值，用户有可能不希望光标刚进入就交换位置
  function setAreaThreshold(threshold: typeof areaThreshold) {
    if (listItemRectArr.length === 0) return;
    const el = listItemRectArr[0];
    const max_vertical = el.height / 2;
    const max_horizontal = el.width / 2;
    if (threshold.hor > max_horizontal || threshold.ver > max_vertical) {
      throw new Error("请勿设置超过元素宽度(或高度)一半的数值");
    }
    areaThreshold = threshold;
  }

  function init(containerElement: HTMLElement) {
    if (!containerElement) return;
    containerEl = containerElement;
    getElListRect();
    containerEl.style.willChange = "transform";
    containerEl.addEventListener("pointerdown", onPointerDown, true);
  }
  return {
    init,
    containerEl,
    isDraging,
    isIntersected,
    setAreaThreshold,
    refreshListRect: getElListRect,
    draggingEl: curClonedElInfo,
    cloneEl: cloneElInfo,
  };
}

const { init, setAreaThreshold } = useDragSort();

onMounted(() => {
  if (!wrapper.value) return;
  init(wrapper.value);
  setAreaThreshold({ ver: 10, hor: 0 });
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

function refresh() {
  window.location.reload();
}

function testClick() {
  console.log("xx");
}
</script>

<template>
  <div class="w-full h-full flex">
    <div
      class="w-full h-full bg-#2ec1cc flex gap-105px flex-wrap items-center justify-center"
    >
      <div ref="wrapper" class="w-200px flex items-center flex-wrap gap-10px">
        <div
          v-for="(i, index) in arr"
          @click="testClick"
          @pointerdown="() => console.log('fuq ')"
          :accesskey="index.toString()"
          class="test w-50px h-50px bg-red border-3px border-black border-solid touch-none"
        >
          <span class="text-20px font-500 cursor-none pointer-events-none">
            {{ index }}
          </span>
        </div>
      </div>
    </div>

    <div @click="refresh" class="w-100px h-100px bg-red">
      <span class="text-30px text-black">刷新</span>
    </div>
  </div>
</template>

<style scoped>
.current-item {
  opacity: 0.5;
}
.clone-item {
  position: fixed;
  opacity: 0.9;
  top: 0px;
  left: 0px;
  z-index: 999;
}
</style>
