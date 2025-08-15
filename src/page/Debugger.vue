<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useSelectable } from "@lazycatcloud/lzc-toolkit";
import Progress from "./component/progress.vue";

const data = ref([
  {
    name: "韩",
    class: [
      {
        age: 10
      }
    ]
  },
  {
    name: "振",

    class: [
      {
        age: 10
      }
    ]
  },

  {
    name: "方",
    class: [
      {
        age: 10
      }
    ]
  }
]);

const flatMediaData = computed(() => {
  const result = [];
  data.value.forEach((item) => {
    const obj = { class: item.class };
    result.push(obj);
  });
  console.log("result", result);
  return result;
});

const { selected, unselectAll, selectedCount, selectAll, selectedIdSet } =
  useSelectable(flatMediaData, "name");

console.log("selectedIdSet", selectedIdSet);

function deleteBtn() {
  data.value.splice(0, 1);
}

const obj = ref({
  name: "韩振方",
  age: 10
});

function* Gen() {
  yield 1;
}

const pagination = Gen();

console.log("pagination", pagination);
console.log("第一页", pagination.next());
console.log("第二页", pagination.next());

window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  // e.returnValue = true;
});
</script>
<template>
  <div class="w-full h-full bg-blue flex flex-col items-center justify-center">
    <span class="text-20px">{{ obj }}</span>

    <Progress :percentage="90" />
    <button>age++</button>
    <div class="flex gap-4px">
      <span class="text-20px">选择项 {{ selected }}</span>

      <span class="text-20px">选择数 {{ selectedCount }}</span>
    </div>
    <div class="flex gap-10px">
      <div @click="deleteBtn" class="button">删除</div>
      <div @click="selectAll" class="button">全选</div>

      <div @click="unselectAll" class="button">取消全选</div>
    </div>
  </div>
</template>
<style scoped>
.button {
  width: 100px;
  line-height: 100px;
  background-color: #2ec1cc;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  text-align: center;
}
</style>
