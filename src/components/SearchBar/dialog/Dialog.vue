<script lang="ts" setup>
const content = "今天我们很高兴,今天我们很高兴,今天我们很高兴,今天我们很高兴,";

function highLightWord(text: string, keyword: string) {
  const _reg = new RegExp(keyword, "g");
  const newText = text.replace(_reg, `<span class='txt'>${keyword}</span>`);
  return newText;
}
</script>
<template>
  <div v-html="highLightWord(content, '今天')"></div>
</template>

<style>
.txt {
  color: yellow;
}
</style>
