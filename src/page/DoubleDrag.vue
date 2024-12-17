<template>
  <div class="flex">
    <span>{{ data }}</span>
    <button @click="pause">停止</button>
  </div>
</template>

<script lang="ts" setup>
import { useTimeoutPoll } from "./test";

function fetch(): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(1);
      resolve(true);
    }, 5000);
  });
}

const { resume, pause, data } = useTimeoutPoll<boolean>(fetch);

resume();
</script>
