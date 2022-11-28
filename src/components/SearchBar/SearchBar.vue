<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, type CSSProperties } from "vue";

import useSearch from "../../use/useSearch";

const {
  searchKeyword,
  hdlSearchBtn,
  closeSearchBar,
  searchModel,
  cleanSearchKeyword,
  searchHistroyLists,
} = useSearch;
const searchBarWrapper = ref<HTMLDivElement>();
const currentHoverItem = ref<any>();
const inputModal = ref<HTMLInputElement>();

const searchBarStyle = computed<CSSProperties>(() => {
  return {
    position: `absolute`,
    top: `120px`,
    left: `calc(50% - 310px)`,
  };
});

//tips: 搜索模式文字
const searchText = computed<string>(() => {
  return searchModel.value === "content" ? "按内容" : "按文件";
});

//tips: 搜索内容为空时的占位提示
const inputPlaceholder = computed<string>(() => {
  return searchModel.value === "content" ? "输入内容搜索" : "输入文件名搜索";
});

//tips: 改变搜索模式
function changeSearchModel() {
  searchModel.value = searchModel.value === "content" ? "filename" : "content";
}

//tips: 当鼠标进入底部选项的时候
function onMouseEnterEvent(item) {
  currentHoverItem.value = item;
}

//tips: 当鼠标离开底部选项的时候
function onMouseLeaveEvent() {
  currentHoverItem.value = "";
}

function isHover(index) {
  if (!currentHoverItem.value) return false;
  const _isHover = searchHistroyLists.value[index] === currentHoverItem.value;
  return _isHover;
}

function toSearch() {
  console.log("我去调用后端");
}

nextTick(() => {
  cleanSearchKeyword();
  inputModal.value?.focus();
});
</script>
<template>
  <div
    id="searchBarWrapper"
    ref="searchBarWrapper"
    class="w-[720px] cursor-pointer bg-[#FFFFFF] border-[2px] border-[red] rounded-[8px] shadow-[0_4px_16px_0px_rgba(187,192,198,0.2)] flex flex-col z-[99999]"
    :style="searchBarStyle"
  >
    <div
      class="basis-[64px] w-full px-[24px] text-[#A2A2A2] text-[16px] flex items-center justify-between"
    >
      <div class="flex mr-[12px] items-center justify-between">
        <span @click="changeSearchModel" class="mr-[12px]">{{
          searchText
        }}</span>

        <img src="../../assets/后退.svg" class="w-[10px] h-[5px]" />
        <!-- //tips: 界面上的分割线 -->
        <div class="h-[14px] border-r-[1px] border-[#D8D8D8]"></div>
      </div>
      <div class="grow flex items-center justify-between mr-[18px]">
        <input
          ref="inputModal"
          @change="toSearch"
          class="w-full border-none outline-none h-[30px] text-[14px] text-[#333333] align-middle font-semibold placeholder:text-[#D1D1D1] placeholder:text-[16px]"
          :placeholder="inputPlaceholder"
          v-model="searchKeyword"
        />
        <div v-show="!!searchKeyword" class="w-[30px]">
          <span @click="cleanSearchKeyword" class="text-[14px]">清空</span>
        </div>
      </div>

      <div
        @click="closeSearchBar"
        class="flex h-full items-center justify-between"
      >
        <!-- //tips: 界面上的分割线 -->
        <div class="mr-[18px] h-[14px] border-r-[1px] border-[#D8D8D8]"></div>
        <img
          class="color-black w-[12px] h-[12px]"
          src="../../assets/错号.svg"
        />
      </div>
    </div>

    <div class="w-full text-[16px] flex flex-col justify-center">
      <div class="">
        <!-- //如果用户处于输入中的话 -->

        <div v-if="!searchKeyword && searchHistroyLists.length > 0">
          <div
            class="flex px-[24px] border-t-[1px] border-[#F6F6F6] items-center justify-between h-[42px]"
          >
            <div>
              <span>历史记录</span>
            </div>
            <div class="h-full flex items-center">
              <img src="../../assets/错号.svg" class="w-[12px] h-[12px]" />
              <span>清空</span>
            </div>
          </div>
          <div
            v-for="(item, index) in searchHistroyLists"
            :key="item"
            class="h-[36px] px-[24px] w-full flex items-center justify-between"
            :class="isHover(index) ? `bg-[#F7F8F9]` : `static`"
            @mouseenter="onMouseEnterEvent(item)"
            @mouseleave="onMouseLeaveEvent"
          >
            <span class="text-[14px] font-medium">{{ item }}</span>
            <img
              class="color-black w-[10px] h-[10px]"
              src="../../assets/错号.svg"
            />
          </div>
        </div>
        <div
          v-if="!!searchKeyword"
          class="px-[24px] h-[48px] flex items-center bg-[#F6F6F6] rounded-[8px]"
          @click="hdlSearchBtn"
        >
          <img src="../../assets/放大镜搜索.svg" class="w-[12px] h-[12px]" />
          <span class="text-[14px] ml-[18px]"
            >查看全部“{{ searchKeyword }}”的搜索结果</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
