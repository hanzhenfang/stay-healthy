<script lang="ts" setup>
import { ref, onBeforeMount, onBeforeUpdate } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const count = ref(1);

async function jump() {
  count.value++;
  history.state.scroll = 10;
  const resp = router.replace({
    name: "test",
    params: {
      id: count.value
    }
  });
  console.log("t", resp);
  console.log("route.params", route.params);
}
</script>
<template>
  <div @click="jump" class="w-full h-full bg-red overflow-scroll">
    <div class="w-full h-[3000px]">
      <span class="text-40px text-black">{{ count }}</span>
    </div>
  </div>
</template>
