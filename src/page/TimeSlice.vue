<script lang="ts" setup>
import { ref, toRaw, reactive, getCurrentInstance } from "vue";

import Button from "@/page/component/Button.vue";

const isShow = ref(false);

function banScroll(e: Event) {
  e.preventDefault();
  console.log("wheel 发生");
}

function openDialog() {
  isShow.value = true;
  const wrapper = document.getElementById("wrapper");
  wrapper.addEventListener("wheel", banScroll, {
    passive: false
  });

  wrapper.addEventListener("scroll", () => {
    console.log("滚动发生");
  });
}

function closeDialog() {
  isShow.value = false;
  const wrapper = document.getElementById("wrapper");
  wrapper.removeEventListener("wheel", banScroll);
}

const a = getCurrentInstance();

const obj = { name: "韩振方", age: 10 };
const p = reactive(obj);

const p_obj = Proxy.revocable(obj, {});
</script>
<template>
  <div
    @click="closeDialog"
    id="wrapper"
    class="w-full h-full overflow-scroll bg-blue relative border flex centered">
    <!-- 用背景颜色 50% 的透明度来模拟遮罩层 -->
    <div class="text-30px"></div>
    <Button>
      <div class="">百度u</div>
    </Button>

    <Button class="ml-20px m-30px">
      <div class="">百度m</div>
    </Button>

    <div
      v-show="isShow"
      class="absolute w-full h-full top-0 bg-black/50 flex justify-center">
      <div class="w-300px h-300px bg-white flex mt-100px">
        <span class="text-50px text-500 text-black">这是对话框</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
no-scroll {
  overflow: hidden;
}

can-scroll {
  overflow: scroll;
}
</style>
