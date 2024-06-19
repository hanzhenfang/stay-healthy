<script lang="ts" setup>
import { ref } from "vue";

import Content from "../Context.vue";
const count = ref(100);
</script>
<template>
  <Content v-model="count" />
</template>
