<script lang="ts" setup>
const instructionContent = [
  "因为淋过雨，所以想为后来者打一把伞。",
  "如果你觉得本文帮助到了你，不妨点一个赞来激励作者写出更好的内容",
  "赠人玫瑰，手有余香🌹",
  "---韩振方---",
];
</script>
<template>
  <div class="w-screen h-230px bg-white">
    <div class="w-full h-full flex flex-col p-18px items-center">
      <span class="text-16px text-#262626 font-500 mb-22px">使用说明</span>
      <div class="flex flex-col gap-10px">
        <div v-for="(item, index) in instructionContent" class="flex px-21px">
          <span
            class="text-12px"
            :class="
              index === instructionContent.length - 1
                ? 'text-#EF9D47'
                : 'text-#999999'
            "
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
