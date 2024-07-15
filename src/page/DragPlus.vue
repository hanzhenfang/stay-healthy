<template>
  <div class="w-full h-full bg-#2ec1cc">
    <div class="w-full h-200px bg-blue overflow-scroll">
      <div ref="el" class="text-20px">
        <div v-for="item in list" :key="item.id">
          {{ item.name + item.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDraggable } from "vue-draggable-plus";

const el = ref<HTMLElement | null>(null);
let k = 0;
const list = ref([
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
  { name: "韩振方", id: ++k },
]);
const draggable = useDraggable(el, list, {
  animation: 150,
  onStart() {
    console.log("start");
  },
  onUpdate() {
    console.log("update");
    console.log("list.value", list.value);
  },
});
</script>
