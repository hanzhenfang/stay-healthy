<script lang="ts" setup>
import { ref, onMounted } from "vue";

const testbox = ref<HTMLDivElement>();

const arr = Array(10);
const con = ref<HTMLDivElement>();

function test() {
  con.value!.scroll(0, 100);
}
</script>

<template>
  <div
    ref="con"
    class="w-300px h-300px bg-blue p-30px ml-auto mt-10px touch-none overflow-hidden"
  >
    <div v-for="(item, index) in arr" class="w-full h-100px">
      {{ index }}
    </div>
  </div>

  <button @click="test">想在</button>
</template>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  font-size: 20px;
  white-space: nowrap;
  color: red;
  background: black;
  overflow: auto;
}
</style>
