<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  watchEffect,
  reactive,
  getCurrentInstance,
  getCurrentScope,
  onRenderTracked,
  onRenderTriggered,
  customRef
} from "vue";
import { popupCreator } from "@/components/Popup/usePopup";
import ContentP from "./component/Content.vue";
import "@/test/test";
import BBtn from "@/components/Button";
// import te, { Person } from "../test/test";
import SelecBar from "@/components/Select/index.vue";
import { eq, gtr } from "semver";

console.log("是否相等 eq", eq("1.1.8-3", "1.1.8-4"));
console.log("是否相等 gtr", gtr("1.1.8-3", "1.1.8-3"));

const mytest = customRef<number>((track, trigger) => {
  return {
    get: () => {
      track();
      return 1;
    },
    set: (value) => {
      if (value == 10) {
        trigger();
        console.log("value", value);
      } else {
        console.log("么反应");
      }
    }
  };
});

watchEffect(() => {
  console.log("我🚢了 mytet 的数组", mytest.value);
});

const b = ref(11);
const bb = computed(() => {
  b.value + 2;
});

onRenderTracked((e) => {
  console.log("exx", e);
});

onRenderTriggered((e) => {
  console.log("ebb", e);
});
console.log("b", b);
function add() {
  b.value++;
}

function mytestAdd() {
  mytest.value = 10;
  console.log("mytest.value", mytest.value);
}

const mock = ref({ obj: { c: 1 } });
let {
  value: {
    obj: { c }
  }
} = mock;

function chgMock() {
  c = 10;
  console.log("c", c);
}
</script>
<template>
  <div class="w-full h-full centered bg-blue relative flex flex-col centered">
    <BBtn />
    <div
      class="w-200px h-200px border-5px border-black border-solid text-center">
      <span @click="chgMock" class="text-30px leading-200px">演示</span>
      {{ mytest }}
      {{ obj }}
    </div>
    <div
      class="box"
      :style="{
        paddingLeft: '10px',
        padding: '5px'
      }"></div>
    <div class="parent w-300px h-300px border-1 border-blue" tabindex="1">
      parent
      <div class="child" tabindex="2">child</div>
    </div>

    <SelecBar />
  </div>
</template>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  border: 10px solid red;
}

.parent {
  outline: none;
}
.parent:focus-visible {
  background-color: red;
}
</style>
