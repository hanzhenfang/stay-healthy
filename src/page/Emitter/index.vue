<script lang="ts" setup>
import Children from "./Child.vue";

function test() {
  console.log("触发 test 事件");
}
</script>

<template>
  <div class="w-100vw h-100vh bg-red">
    <h1>emiter</h1>
    <Children @test="test"></Children>
  </div>
</template>
