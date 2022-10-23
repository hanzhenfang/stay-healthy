<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

import { insertString } from "../../utils/stringInsert";
import { getNowDate, getDoubleSeconds } from "../../utils/useNowTime";

import type { CSSProperties } from "vue";

interface FooterCard {
  icon: string;
  text: string;
}

const footerCard = ref<Array<FooterCard>>([
  { icon: "", text: "编辑切换" },
  { icon: "", text: "申请场所码" },
  { icon: "", text: "核验行程卡" },
  { icon: "", text: "抗原自测" },
  { icon: "", text: "自主申报" },
  { icon: "", text: "常见问题" },
]);

const footerCardWrapper = ref<HTMLDivElement>();
const userName = ref<string>("韩振方");
const userUid = ref<string>("111111111111111111");
const timerID = ref<number>(-1);
const date = ref<string>("2022-10-22 21:04:41:22");
const second = ref<string>("20");

const footerCardStyle = computed<CSSProperties>(() => {
  return {
    display: `grid`,
    gridTemplateColumns: `repeat(3,106px)`,
    gridTemplateRows: `repeat(2,80px)`,
    gap: `15px 0px`,
  };
});

function starReplaceFactory(counts: number) {
  let _start: string = "";
  for (let i = 0; i < counts; i++) {
    _start += "*";
  }
  return _start;
}

function subName(name: string) {
  if (!name && name.length < 1) {
    alert("请输入正确的姓名");
  } else {
    const _expectEnd = name.substring(name.length - 1, 0);
    const _starCounts = starReplaceFactory(_expectEnd.length);
    userName.value = userName.value.replace(_expectEnd, _starCounts);
  }
}

function subUid(ID: string) {
  if (ID.length !== 18) {
    alert("身份证长度错误!");
    return;
  } else {
    const _expectEnd = ID.substring(ID.length - 4, 0);
    console.log("_expectEnd", _expectEnd);
    const _starCounts = starReplaceFactory(_expectEnd.length);
    const _flag = userUid.value.replace(_expectEnd, _starCounts);
    const newUid = insertString(_flag, 6, " ");
    userUid.value = newUid!;
  }
}

onMounted(() => {
  subName(userName.value);
  subUid(userUid.value);
  timerID.value = setInterval(() => {
    date.value = getNowDate();
    second.value = getDoubleSeconds(new Date().getSeconds());
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timerID.value);
});
</script>

<template>
  <div class="border-2 w-390px h-850px">
    <div class="h-20% pl-40px bg-#3981F6 flex justify-between pt-25px">
      <!-- 姓名展示 -->
      <div class="flex flex-col">
        <span class="text-#A4D1F9 self-start">姓名</span>
        <span class="text-#EEF9FF text-18px font-600">{{ userName }}</span>
      </div>
      <!-- 身份证展示 -->
      <div class="flex flex-col">
        <span class="text-#A4D1F9 self-start">身份证号</span>
        <span class="text-#EEF9FF font-600">{{ userUid }}</span>
      </div>
      <div id="shouldnotShow" class="null"></div>
    </div>
    <div class="h-70% w-full bg-#F5F5F8 relative">
      <!----------------------- 二维码部分 ------------------------------>
      <div
        class="w-312px h-300px bg-#FFFFFF flex flex-col border-white b-rd-10px border-0.2px absolute top-[-100px] left-[calc(50%-156px)]"
      >
        <div class="text-20px pt-20px h-[12%]">
          <span class="font-500">{{ date + ":" }}</span>
          <span class="font-800 text-#3D81FE text-22px">{{ second }}</span>
        </div>
        <div class="pt-10px h-[70%]">
          <img class="w-150px h-150px" src="../../assets/二维码.jpeg" />
        </div>
        <!------------------ 第一个卡片底部 ----------------->
        <div
          class="border-t-1px px-10px h-[18%] border-#F0F0F0 flex justify-between items-center"
        >
          <div class="flex items-center">
            <img class="w-20px h-20px" src="../../assets/二维码.jpeg" />
            <span class="pl-10px">出示我的的行程卡</span>
          </div>
          <div>
            <img
              class="w-18px h-15px transform-rotate-180"
              src="../../assets/后退.svg"
            />
          </div>
        </div>
      </div>

      <!------------------------ 核酸检测和疫苗接种部分 ------------------------->
      <div
        class="flex justify-between w-312px h-100px absolute top-[222px] left-[calc(50%-156px)]"
      >
        <div
          class="hesuanCard rd-10px border-1px text-white w-48% flex justify-center items-center"
        >
          <!--------------- 核酸检测的内容区域 ------------------------->
          <div class="flex flex-col">
            <div class="flex items-center justify-center pt-10px">
              <!-- XXX: 需要替换对号和向右的箭头 -->
              <img class="w-20px h-20px" src="../../assets/对勾.svg" />
              <span class="text-20px pl-5px">核酸检测</span>
              <img
                class="w-18px h-18px transform-rotate-180"
                src="../../assets/后退_白底.svg"
              />
            </div>
            <div class="flex pt-5px">
              <span class="block text-35px font-800">24</span>
              <span class="block">小时检测</span>
            </div>
            <div class="pt-2px">
              <span class="text-5px">{{ getNowDate(1) }}</span>
            </div>
          </div>
        </div>
        <!-------------------------- 疫苗接种区域 ---------------------------->
        <div
          class="rd-10px border-1px border-#C5C3C8 w-48% flex flex-col justify-center items-center"
        >
          <!-- 第一层 -->
          <div class="flex justify-center items-center pt-10px">
            <img class="w-20px h-20px" src="../../assets/对勾.svg" />
            <span class="text-18px">疫苗接种</span>
            <img
              class="w-18px h-18px transform-rotate-180"
              src="../../assets/后退.svg"
            />
          </div>
          <!-- 第二层 -->
          <div class="pt-5px">
            <span class="font-600 text-30px text-#717AA6">无</span>
          </div>
          <div class="pt-2px">
            <span>数据同步中</span>
          </div>
        </div>
      </div>
      <!-------------------------------- 页脚卡片部分-------------------------->
      <div
        ref="footerCardWrapper"
        class="w-320px h-190px rd-10px top-342px border-1 absolute left-[calc(50%-156px)]"
      >
        <div :style="footerCardStyle">
          <div v-for="item in footerCard">
            <div
              class="flex flex-col justify-center items-center h-full w-full"
            >
              <img class="w-20px h-20px" src="../../assets/二维码.jpeg" />
              <span>{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute w-full bottom-10px">
      <div class="flex flex-col">
        <span class="font-600 text-#A2A4A6">服务热线: 12345</span>
        <span class="text-#A2A4A6"
          >本服务由湖北省新冠肺炎疫情防控指挥部提供</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.hesuanCard {
  background: linear-gradient(to right bottom, #70b175, #92e999);
}
</style>
