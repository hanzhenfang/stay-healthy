<template>
  <div
    @click="cancelBtn"
    class="w-full h-full absolute z-[9999] bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
    <div
      @click.stop=""
      class="flex flex-col items-center pt-[22px] pb-[24px] px-[24px] w-[290px] h-[133px] rounded-[10px] bg-[#FEFFFF]">
      <div class="">
        <span class="text-[18px] text-[#333333] font-semibold">
          {{ title }}
        </span>
      </div>
      <div class="grow">
        <span class="text-[14px] text-[#333333]">{{ content }}</span>
      </div>
      <div class="flex w-full items-center justify-between text-[14px]">
        <div
          @click="cancelBtn"
          class="w-[110px] h-[40px] bg-[#F5F5F5] rounded-[20px] flex items-center justify-center">
          <span>取消</span>
        </div>
        <div
          @click="confirmBtn"
          class="w-[110px] h-[40px] bg-[#2ec1cc] rounded-[20px] flex items-center justify-center">
          <span class="text-[#FFFFFF]">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  interface DialogType {
    title: string;
    content: string;
    confirmBtn: () => void;
    closeBtn: () => void;
  }

  function test() {
    console.log("我是点击了 dialog 本身");
  }

  const props = defineProps<DialogType>();

  function cancelBtn() {
    console.log("我是遮罩绑定的方法，我错误的冒泡触发了");
    props.closeBtn();
  }

  function confirmBtn() {
    props.confirmBtn();
  }
</script>
